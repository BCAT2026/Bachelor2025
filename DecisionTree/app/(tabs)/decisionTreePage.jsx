import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Step from '../../components/Questions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Feedback from '../../components/Feedback';                  
import decisionTreeDataNO from '../data/decisionTreeDataNO';
import decisionTreeDataEN from '../data/decisionTreeDataEN';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import TransitionMessage from '../../components/TransitionMessage';
import Header from '../../components/Header';
import { DECISION_TREE_PROGRESS_KEY } from '@/constants/storageKeys';



const DecisionTreePage = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { reset } = useLocalSearchParams()
  const [currentId, setCurrentId] = useState('q1')
  const [feedbackOption, setFeedbackOption] = useState(null)
  const [answers, setAnswers] = useState({})
  const [history, setHistory] = useState([])
  const [hasLoadedSavedState, setHasLoadedSavedState] = useState(false)

  const decisionTreeData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN
  const currentNode = decisionTreeData.find((node) => node.id === currentId)

  const stepTitles = {
    1: {
      no: 'Forberedende steg for vurdering av BC',
      en: 'Preparatory steps for consideration for BC assessment'
    },
    2: {
      no: 'Oppstart av vurdering av BC',
      en: 'Initiation for BC assessment',
    },
    3: {
      no: 'Valg av metode',
      en: 'Method Choice',
    },
    4: {
      no: 'Datainnsamling',
      en: 'Data collection',
    },
    5: {
      no: 'Tolkning av data',
      en: 'Data interpretation',
    },
    6: {
      no: 'Rapportering av data',
      en: 'Data Reporting',
    },
    7: {
      no: 'Formidling og kommunikasjon av data',
      en: 'Data dissemination and communication',
    },
    8: {
      no: 'Monitoring',
      en: 'Monitoring',
    },
  }

  const resetDecisionTreeProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY)
    } catch {
      // Appen skal fortsatt kunne nullstilles selv om lokal lagring feiler.
    }

    setCurrentId('q1')
    setFeedbackOption(null)
    setAnswers({})
    setHistory([])
  }, [])

  useEffect(() => {
    let isActive = true

    const loadSavedProgress = async () => {
      if (reset === 'true') {
        try {
          await AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY)
        } catch {
          // Fortsett med å nullstille visningen selv om lagringen ikke kan slettes.
        }
        if (!isActive) return
        setCurrentId('q1')
        setFeedbackOption(null)
        setAnswers({})
        setHistory([])
        setHasLoadedSavedState(true)
        router.setParams({ reset: undefined })
        return
      }

      try {
        const savedProgress = await AsyncStorage.getItem(DECISION_TREE_PROGRESS_KEY)
        if (!savedProgress || !isActive) {
          return
        }

        const parsedProgress = JSON.parse(savedProgress)
        const savedNodeExists = decisionTreeData.some((node) => node.id === parsedProgress.currentId)

        if (!savedNodeExists) {
          await AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY)
          if (!isActive) return
          setCurrentId('q1')
          setFeedbackOption(null)
          setAnswers({})
          setHistory([])
          return
        }

        if (typeof parsedProgress.currentId === 'string') {
          setCurrentId(parsedProgress.currentId)
        }
        if (parsedProgress.feedbackOption) {
          setFeedbackOption(parsedProgress.feedbackOption)
        }
        if (parsedProgress.answers && typeof parsedProgress.answers === 'object') {
          setAnswers(parsedProgress.answers)
        }
        if (Array.isArray(parsedProgress.history)) {
          setHistory(parsedProgress.history)
        }
      } catch {
        try {
          await AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY)
        } catch {
          // Ignorer sekundær feil ved opprydding.
        }
      } finally {
        if (isActive) {
          setHasLoadedSavedState(true)
        }
      }
    }

    loadSavedProgress()

    return () => {
      isActive = false
    }
  }, [reset, router]);

  useEffect(() => {
    if (!hasLoadedSavedState) return

    const saveProgress = async () => {
      const hasProgress =
        currentId !== 'q1' ||
        feedbackOption !== null ||
        Object.keys(answers).length > 0 ||
        history.length > 0

      if (!hasProgress) {
        try {
          await AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY)
        } catch {
          // Appen kan fortsette selv om lokal lagring midlertidig feiler.
        }
        return
      }

      try {
        await AsyncStorage.setItem(
          DECISION_TREE_PROGRESS_KEY,
          JSON.stringify({
            currentId,
            feedbackOption,
            answers,
            history,
            updatedAt: new Date().toISOString(),
          })
        )
      } catch {
        // Ikke avbryt flyten dersom fremdrift ikke kan lagres.
      }
    }

    saveProgress()
  }, [currentId, feedbackOption, answers, history, hasLoadedSavedState])

  const normalizeAnswer = (value) => {
    if (value === 'Ja' || value === 'Yes') return 'yes'
    if (value === 'Nei' || value === 'No') return 'no'
    return value
  }

  const answerMatchesCondition = (savedAnswer, expectedAnswer) =>
    savedAnswer === expectedAnswer || normalizeAnswer(savedAnswer) === normalizeAnswer(expectedAnswer)

  const getNextVisibleNode = (fromIndex = -1, answerSet = answers) => {
    for (let i = fromIndex + 1; i < decisionTreeData.length; i++) {
      const node = decisionTreeData[i]
      if (!node.visibleIf) return node.id
      const condition = node.visibleIf
      if (answerMatchesCondition(answerSet[condition.previousQuestion], condition.expectedAnswer)) {
        return node.id
      }
    }
    return 'q1';
  }

  const handleAnswer = (answer) => {
    const selectedOption = currentNode.options[answer ? 0 : 1];
    const updatedAnswers = { ...answers, [currentNode.id]: selectedOption.label };
    setAnswers(updatedAnswers);
  
    if (selectedOption.feedbackType) {
      if (selectedOption.next) {
        const nextNode = decisionTreeData.find((n) => n.id === selectedOption.next);
        if (nextNode?.isTransition) {
          setCurrentId(nextNode.id);
          return;
        }
      }
  
      setHistory((prev) => [...prev, currentId]);
      setFeedbackOption({
        feedbackType: selectedOption.feedbackType,
        feedbackMessage: selectedOption.feedbackMessage,
        next: selectedOption.next ?? null,
        fromNode: currentNode.id,
      });
    } else if (selectedOption.next) {
      setHistory((prev) => [...prev, currentId]);
      setCurrentId(selectedOption.next);
    } else {
      const currentIndex = decisionTreeData.findIndex((n) => n.id === currentNode.id);
      const nextVisible = getNextVisibleNode(currentIndex, updatedAnswers);
      setHistory((prev) => [...prev, currentId]);
      setCurrentId(nextVisible);
    }
  };
  

  const handleGoBack = () => {
    if (history.length > 0) {
      const newHistory = [...history]
      const previousId = newHistory.pop()
      setHistory(newHistory)
      setCurrentId(previousId)
      setFeedbackOption(null)
    } else {
      router.back()
    }
  }

  if (feedbackOption) {
    const currentData = i18n.language === 'no' ? decisionTreeDataNO : decisionTreeDataEN
    const currentNodeData = currentData.find((node) => node.id === feedbackOption.fromNode)
    const matchedOption = currentNodeData?.options.find((o) => o.feedbackType === feedbackOption.feedbackType)
    const message = matchedOption?.feedbackMessage

    const handleNext = () => {
      const fallbackNext = matchedOption?.next ?? null
    
      if (fallbackNext) {
        setCurrentId(fallbackNext)
      } else {
        const nodeIndex = decisionTreeData.findIndex(n => n.id === feedbackOption.fromNode)
        const nextNode = decisionTreeData[nodeIndex + 1]
        setCurrentId(nextNode?.id ?? 'q1')
      }
    
      setFeedbackOption(null)
    }
    

    return (
      <Feedback
        feedbackType={feedbackOption.feedbackType}
        message={message}
        onNext={handleNext}
        onExit={resetDecisionTreeProgress}
      />
    )
  }


  //progress
  const extractNumber = (id) => {
    const match = typeof id === 'string' ? id.match(/\d+/) : null;
    return match ? parseInt(match[0], 10) : 0;
  };

  const referenceId = currentNode?.isTransition
  ? history[history.length - 1] // forrige spørsmål
  : currentId;

  const currentIndex = extractNumber(referenceId || 'q1');
  const overallProgress = currentNode?.id === 'complete'
    ? 100
    : currentNode?.id === 'q37'
      ? Math.round((36 / 37) * 100)
      : Math.round((currentIndex / 37) * 100);


  if (!hasLoadedSavedState || !currentNode) return null

  if (currentNode?.isTransition) {
    const isComplete = currentNode.id === 'complete'
    const handleTransitionNext = () => {
      if (isComplete) {
        AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY).catch(() => {})
        setCurrentId('q1')
        setFeedbackOption(null)
        setAnswers({})
        setHistory([])
        return
      }

      setCurrentId(currentNode.next)
    }

    return (
      <ParallaxScrollView>
        <TransitionMessage
          message={currentNode.message}
          onNext={handleTransitionNext}
          progress={overallProgress} 
          buttonText={isComplete ? t('START_OVER') : undefined}
        />
      </ParallaxScrollView>
    )
  }
  
  
  const stepNumber = currentNode.step || 1
  const lang = i18n.language === 'no' ? 'no' : 'en'
  const stepTitle = stepTitles[stepNumber]?.[lang] ?? ''


  return (
    <ParallaxScrollView>
      <Header onBackPress={handleGoBack} />

 
      <Step
        stepNumber={stepNumber}
        totalSteps={8}
        stepTitle={stepTitle}
        question={currentNode.question}
        onAnswer={handleAnswer}
        progress={overallProgress}
      />
      

    </ParallaxScrollView>
  );
};

export default DecisionTreePage;

