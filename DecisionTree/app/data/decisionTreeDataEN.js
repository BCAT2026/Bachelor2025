const decisionTreeDataEN = [
    {
      id: 'q1',
      step: 1,
      question: 'Is the athlete over 18 years old?',
      options: [
        { label: 'Yes', next: 'q3' },
        { label: 'No', next: 'q2' },
      ],
    },
    {
      id: 'q2',
      step: 1,
      question: 'Is the BC assessment indicated for medical purposes or other exceptional circumstances?',
      visibleIf: {
        previousQuestion: 'q1',
        expectedAnswer: 'No',
      },
      options: [
        { label: 'Yes', next: 'q3' },
        {
          label: 'No',
          feedbackType: 'red',
          feedbackMessage:
            'It is not recommended to measure BC of athletes under the age of 18 years old unless indicated for medical purposes or other exceptional circumstances.\n \nEarly initiation of body composition measurements can increase the risk of athletes becoming overly focused on these aspects, which in turn may lead to body dissatisfaction and a disordered relationship with food and body image.\n \nYoung athletes will benefit much more from focusing on the fundamental elements of training, nutrition and recovery to improve their sport specific technique, physical capacity and mental robustness, hence increase their performance abilities.',
        },
      ],
    },
    {
      id: 'q3',
      step: 1,
      question: 'Is the athlete competing at Tier 3 or above?',
      options: [
        { label: 'Yes', next: 'q4' },
        {
          label: 'No',
          feedbackType: 'red',
          feedbackMessage:
            'It is not recommended to measure BC of athletes competing below Tier 3.\n \nThese athletes are less likely to have the appropriate support in place and will benefit from focusing on the fundamental elements of training, nutrition and recovery to improve their sport specific technique, physical capacity and mental robustness, hence increase their performance abilities.',
        },
      ],
    },
    {
      id: 'q4',
      step: 1,
      question: 'Are there concerns around eating behaviours or physique/body image anxiety? If there is uncertainty about whether concerns are present, an assessment should be made using one of the following resources: [EDE-Q](pdf:ede-q_EN.pdf), [ADE](pdf:ADE_en.pdf) or [BAS-2](pdf:BAS-2_en.pdf).',
      options: [
        { label: 'Yes', next: 'q5' },
        { label: 'No', next: 'q6' },
      ],
    },
    {
      id: 'q5',
      step: 1,
      question: 'Is there medical purposes for the BC assessment, AND a medical support team to follow up?',
      visibleIf: {
        previousQuestion: 'q4',
        expectedAnswer: 'Yes',
      },
      options: [
        { label: 'Yes', next: 'q6' },
        {
          label: 'No',
          feedbackType: 'red',
          feedbackMessage: 'It is not recommended to measure BC, as athletes with such health challenges require supervision by medical professionals.',
        },
      ],
    },
    {
      id: 'q6',
      step: 1,
      question: 'Does the athlete have appropriate access to members of an athlete health and performance team?\n \nMinimum: Experienced sports dietitian/nutritionist, sports physiologist/strength coach, psychologist and sports medicine physician.',
      options: [
        { label: 'Yes', next: 'q8' },
        { label: 'No', next: 'q7' },
      ],
    },
    {
      id: 'q7',
      step: 1,
      question: 'Are you able to provide them support in accessing any or most of these individuals?',
      visibleIf: {
        previousQuestion: 'q6',
        expectedAnswer: 'No',
      },
      options: [
        {
          label: 'Yes',
          feedbackType: 'yellow',
          feedbackMessage:
            'While it is preferrable to have an athlete health and performance team in place, we recognise this is not widespread and therefore find it sufficient for the athlete to be able to access support from each of these team members listed.\n \nHowever, you are encouraged to help facilitate the athlete’s access to support or services from these professionals.',
          next: 'q8',
        },
        {
          label: 'No',
          feedbackType: 'red',
          feedbackMessage:
            'If athletes cannot access the support or services of the professionals above, BC assessment or manipulation is not recommended.',
        },
      ],
    },
    {
      id: 'q8',
      step: 1,
      question: 'Is there a sound and supported rationale for assessment/manipulation of BC, without causing harm to the athlete?',
      options: [
        {
          label: 'Yes',
          feedbackType: 'green',
          feedbackMessage: 'Proceed to the next step.',
          next: 't1',
        },
        {
          label: 'No',
          feedbackType: 'red',
          feedbackMessage:
            'There is no need for the BC assessment, reinforce nutrition messaging – prioritise fuelling and recovery while maintaining health.',
        },
      ],
    },
    {
      id: 't1',
      isTransition: true,
      message: 'Step 1 is complete!\n \nYou may now proceed to Step 2.',
      next: 'q9',
    },

    {
        id: 'q9',
        step: 2,
        question: 'Has the athlete been clearly informed about the measurement process and given the opportunity to ask questions?',
        options: [
          {
            label: 'Yes',
            next: 'q10',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'BC assessment should not be conducted until the process has been clearly outlined to the athlete. This ensures that the athlete is properly prepared — regarding rest, food intake, and other relevant factors — and is fully informed about the nature of the assessment and the type of insights it provides into their health status.',
          },
        ],
      },
      {
        id: 'q10',
        step: 2,
        question: 'Is the BC assessment scheduled alongside or in close proximity to other relevant health and/or performance assessments?',
        options: [
          {
            label: 'Yes',
            next: 'q12',
          },
          {
            label: 'No',
            next: 'q11',
          },
        ],
      },
      {
        id: 'q11',
        step: 2,
        question: 'Is this the only assessment you do?',
        visibleIf: {
          previousQuestion: 'q10',
          expectedAnswer: 'No',
        },
        options: [
          {
            label: 'Yes',
            feedbackType: 'red',
            feedbackMessage:
              'It is not recommended to conduct the BC assessment as there is no context for the results.',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'It is recommended that other relevant assessments are conducted at the same time to give context to the BC measurements. However, you could use the closest timepoint for context if appropriate.',
            next: 'q12',
          },
        ],
      },
      {
        id: 'q12',
        step: 2,
        question:
          'Does the athlete and their support team receive education on BC, nutrition, training and the interactions among these areas?',
        options: [
          {
            label: 'Yes',
            next: 'q13',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Education in these areas is recommended to develop understanding of the role of BC and to facilitate appropriate use of this metric. This should be delivered prior to BC assessments being made.',
            next: 'q13',
          },
        ],
      },
      {
        id: 'q13',
        step: 2,
        question:
          'Does the athlete retain the choice, at all times, of whether the BC assessment is conducted with no repercussions?\n \nExamples of a lack of choice may include the athlete being removed from the team, being excluded from upcoming competitions, or experiencing negative attention or neglect from coaches.',
        options: [
          {
            label: 'Yes',
            next: 'q14',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Athletes should always retain the choice of whether the BC assessment is conducted. If they do not have a choice, the assessment should not be conducted.',
          },
        ],
      },
      {
        id: 'q14',
        step: 2,
        question: 'Have you obtained and documented explicit written consent from the athlete?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'green',
            feedbackMessage: 'Proceed to the next step.',
            next: 't2',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Without explicit consent from the athlete which is documented, the BC assessment should not be conducted.',
          },
        ],
      },
      {
        id: 't2',
        isTransition: true,
        message: 'Step 2 is complete!\n \nYou may now proceed to Step 3.',
        next: 'q15',
      },

      {
        id: 'q15',
        step: 3,
        question:
          'Has the most appropriate method been chosen? As a general rule DXA or skinfold measures are recommended for athletes. [See table for an overview](pdf:metodetabell.pdf)',
        options: [
          {
            label: 'Yes',
            next: 'q17',
          },
          {
            label: 'No',
            next: 'q16',
          },
        ],
      },
      {
        id: 'q16',
        step: 3,
        question: 'Is there equipment for a more appropriate method available? [See table for an overview](pdf:metodetabell.pdf)',
        visibleIf: {
          previousQuestion: 'q15',
          expectedAnswer: 'No',
        },
        options: [
          {
            label: 'Yes',
            feedbackType: 'red',
            feedbackMessage:
              'BC measurements should not be taken using this method if there is something more appropriate available.',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Proceed with caution and ensure that all control measures are taken and results are considered in context with the method limitations. Seek access to more appropriate methods moving forward.\n\nThis includes standardizing preparations, calibrating equipment, and establishing clear procedures for measurement and analysis. [See table for an overview](pdf:metodetabell.pdf)',
            next: 'q17',
          },
        ],
      },
      {
        id: 'q17',
        step: 3,
        question:
          'Is the person taking the measurement suitably trained for the specific method chosen and do you have the required professional skills to navigate psychological sensitivities around BC?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'green',
            feedbackMessage: 'Proceed to the next step.',
            next: 't3',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Without training or these professional skills, BC measurements should not be taken.',
          },
        ],
      },
      {
        id: 't3',
        isTransition: true,
        message: 'Step 3 is complete!\n \nYou may now proceed to Step 4.',
        next: 'q18',
      },

      {
        id: 'q18',
        step: 4,
        question:
          'Are you following a standardised protocol?',
        options: [
          {
            label: 'Yes',
            next: 'q19',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed with the measurement unless you are following a standardised protocol which is in place.\n\nFor DXA we recommend the following procedures: [DXA](pdf:dxa.pdf). See table 3 and 4 specifically.',
          },
        ],
      },
      {
        id: 'q19',
        step: 4,
        question: 'Has the athlete been given the option to have a chaperone of their choice with them during the assessment?',
        options: [
          {
            label: 'Yes',
            next: 'q20',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'The measurement can be carried out if the athlete still wishes to proceed. Next time, the option to bring a support person should be clearly communicated in advance.',
            next: 'q20',
          },
        ],
      },
      {
        id: 'q20',
        step: 4,
        question: 'Will the assessment be conducted in a private space with controlled access?',
        options: [
          {
            label: 'Yes',
            next: 'q21',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed with the assessment unless you can move to a private space with controlled access.',
          },
        ],
      },
      {
        id: 'q21',
        step: 4,
        question: 'Do you know the precision error of measurement?',
        options: [
          {
            label: 'Yes',
            next: 'q22',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Proceed with caution and find this precision error as soon as possible in order to interpret results appropriately. [Methods table](pdf:metodetabell.pdf)',
            next: 'q22',
          },
        ],
      },
      {
        id: 'q22',
        step: 4,
        question: 'Do you feel sufficient time has been scheduled for the assessment?',
        options: [
          {
            label: 'Yes',
            next: 'q23',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Proceed with caution and ensure that there is enough time for the assessment to be carried out according to the protocol, and that there is time for any discussions that arise. Avoid commenting on or disclosing the results while performing the measurement.',
            next: 'q23',
          },
        ],
      },
      {
        id: 'q23',
        step: 4,
        question: 'Are there processes in place to ensure data is treated, handled and stored confidentially as medical data?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'green',
            feedbackMessage: 'Proceed to the next step.',
            next: 't4',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not conduct the assessment if you are unable to keep the data secure and handle it as confidential medical data.',
          },
        ],
      },
      {
        id: 't4',
        isTransition: true,
        message: 'Step 4 is complete!\n \nYou may now proceed to Step 5.',
        next: 'q25',
      },
       
      {
        id: 'q24',
        step: 5,
        question:
          'Has the athlete been made aware that results will not be discussed during data collection, but that time is required to interpret the data appropriately?',
        options: [
          {
            label: 'Yes',
            next: 'q25',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Proceed with caution. Communicate to the athlete that time is needed to interpret the data and arrange a time for follow-up. Avoid commenting on or disclosing the results while performing the measurement.',
            next: 'q25',
          },
        ],
      },
      {
        id: 'q25',
        step: 5,
        question:
          'Before the results are communicated, will they be interpreted and analyzed alongside other relevant measurements and precision data, by the members of the support teamm whom the athlete has authorized to access the results?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'green',
            feedbackMessage: 'Proceed to the next step.',
            next: 't5',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Without this assessment, the data may be misinterpreted, potentially leading to negative consequenses for the athlete.\n \nEnsure that the selected members of the support team, who have been granted access with the athlete`s consent, are involved in the process.',
          },
        ],
      },
      {
        id: 't5',
        isTransition: true,
        message: 'Step 5 is complete!\n \nYou may now proceed to Step 6.',
        next: 'q26',
      },
      
      {
        id: 'q26',
        step: 6,
        question:
          'Are the data presented in an accessible format that integrates precision error data alongside previous individual results (if available)?',
        options: [
          {
            label: 'Yes',
            next: 'q27',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not report the data until the results are in an accessible format that integrates precision error data and individual results.',
          },
        ],
      },
      {
        id: 'q27',
        step: 6,
        question: 'Are normative reference values applied to other BC-parameters beyond bone mass?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'red',
            feedbackMessage:
              'Do not report the data until normative or reference values are removed.\n\nOther than bone mass (Z-score and T-score), there is little evidence to support the existence of universal optimal targets for fat mass and muscle mass in individuals.',
          },
           {
            label: 'No',
            feedbackType: 'green',
            feedbackMessage: 'Proceed to the next step.',
            next: 't6',
          },
        ],
      },
      {
        id: 't6',
        isTransition: true,
        message: 'Step 6 is complete!\n \nYou may now proceed to Step 7.',
        next: 'q28',
      },
      
      {
        id: 'q28',
        step: 7,
        question:
          'Do athletes have control of who can access their BC assessment data?',
        options: [
          {
            label: 'Yes',
            next: 'q29',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed with assessment unless athletes have control of who has data access.',
          },
        ],
      },
      {
        id: 'q29',
        step: 7,
        question:
          'Are results shared directly with the athlete and discussed with the most appropriate person in a private setting?',
        options: [
          {
            label: 'Yes',
            next: 'q30',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Proceed with caution. Results should be shared directly with the athlete and in a private space with someone who has consent to see the results – usually a member of the health and performance team.',
            next: 'q30',
          },
        ],
      },
      {
        id: 'q30',
        step: 7,
        question:
          'Is a discussion to agree next steps planned with the athlete and relevant members of the athlete health and performance team?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'green',
            feedbackMessage: 'Proceed to the next step.',
            next: 't7',
          },
          {
            label: 'No',
            feedbackType: 'yellow',
            feedbackMessage:
              'Proceed with caution. The athlete should have sufficient input to the next steps and adequate support.',
            next: 't7',
          },
        ],
      },
      {
        id: 't7',
        isTransition: true,
        message: 'Step 7 is complete!\n \nYou may now proceed to Step 8.',
        next: 'q31',
      },
      
      {
        id: 'q31',
        step: 8,
        question:
          'Is there a clear and agreed timeline for BC monitoring that is aligned with the agreed intervention?',
        options: [
          {
            label: 'Yes',
            next: 'q32',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed. A timeline for monitoring must be agreed before any future assessments take place, and it must align with the agreed intervention.',
          },
        ],
      },
      {
        id: 'q32',
        step: 8,
        question: 'Does the proposed number of assessments exceed 4–6 times per year?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed with a higher number of assessments, unless there is specific reasoning. Reduce the number of assessments and align with the expected response.',
          },
          {
            label: 'No',
            next: 'q33',
          },
        ],
      },
      {
        id: 'q33',
        step: 8,
        question: 'Does the athlete have support from relevant members of the athlete health and performance team?',
        options: [
          {
            label: 'Yes',
            next: 'q34',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed with additional monitoring. Athletes should not have BC assessments completed if they do not have adequate support from trained and suitable personnel.',
          },
        ],
      },
      {
        id: 'q34',
        step: 8,
        question: 'Is athlete readiness re-checked prior to each subsequent assessment?',
        options: [
          {
            label: 'Yes',
            feedbackType: 'green',
            feedbackMessage: 'You have completed the process. All steps are in place.',
            next: 'complete',
          },
          {
            label: 'No',
            feedbackType: 'red',
            feedbackMessage:
              'Do not proceed with any assessment until readiness has been checked.\n\nPlease return to the beginning of this process for each new assessment.',
          },
        ],
      },
      {
        id: 'complete',
        isTransition: true,
        message: 'All steps are complete!\n\nGreat, it seems that you are well prepared for conducting athlete assessments, with solid safety procedures in place for both preparation and potential follow-up.\n \nYou are now well positioned to carry out the assessments in a recommended and professional manner.',
      }
  ];
  
  export default decisionTreeDataEN;
  
