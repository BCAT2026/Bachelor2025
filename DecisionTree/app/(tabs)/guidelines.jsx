import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

const GuidelinesScreen = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedTitleKey, setSelectedTitleKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { width, height, scale, isSmallPhone } = useResponsiveLayout();

  const guidelines = numbers.map((number) => ({
    number,
    titleKey: `G${number}`,
    textKey: `G${number}_TEXT`,
  }));

  const handleNumberPress = (number) => {
    setSelectedNumber(number);
    setSelectedKey(`G${number}_TEXT`);
    setSelectedTitleKey(`G${number}`);
    setModalVisible(true);
  };

  const outerRadius = Math.min(
    Math.max(width * (isSmallPhone ? 0.36 : 0.38), 116),
    Math.min(168, height * 0.2)
  );
  const innerRadius = outerRadius * 0.64;
  const centerX = outerRadius + 10;
  const centerY = outerRadius + 10;
  const numberSize = Math.min(Math.max(outerRadius * 0.28, 34), 44);

  const lightGreen = [167, 200, 176];
  const darkGreen = [26, 49, 38];

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{t('GUIDELINES_TITLE')}</ThemedText>

        <View style={styles.guidelineTable}>
          {Array.from({ length: 4 }, (_, i) => (
            <View key={i} style={styles.guidelineRow}>
              {[guidelines[i], guidelines[i + 4]].map((guideline, j) => {
                const index = i + j * 4;
                const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / (guidelines.length - 1)));
                const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / (guidelines.length - 1)));
                const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / (guidelines.length - 1)));
                const fillColor = `rgb(${r}, ${g}, ${b})`;

                return (
                  <TouchableOpacity
                    key={guideline.number}
                    style={styles.guidelineCell}
                    onPress={() => handleNumberPress(guideline.number)}
                    accessibilityRole="button"
                  >
                    <View style={[
                      styles.guidelineNumberCircle,
                      { backgroundColor: 'white', borderColor: fillColor, borderWidth: 5 }
                    ]}>
                      <ThemedText style={styles.guidelineNumberText}>{guideline.number}</ThemedText>
                    </View>
                    <ThemedText style={styles.guidelineTitle}>{t(guideline.titleKey)}</ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <ThemedText style={styles.subtitle}>{t('GUIDELINE_CLICK')}</ThemedText>

        <View style={styles.circleContainer}>
          <Svg width={(outerRadius * 2) + 20} height={(outerRadius * 2) + 20}>
            {numbers.map((_, index) => {
              const startAngle = ((index - 0.5) / numbers.length) * Math.PI * 2 - Math.PI / 2;
              const endAngle = ((index + 0.5) / numbers.length) * Math.PI * 2 - Math.PI / 2;

              const x1 = centerX + outerRadius * Math.cos(startAngle);
              const y1 = centerY + outerRadius * Math.sin(startAngle);
              const x2 = centerX + innerRadius * Math.cos(startAngle);
              const y2 = centerY + innerRadius * Math.sin(startAngle);
              const x3 = centerX + innerRadius * Math.cos(endAngle);
              const y3 = centerY + innerRadius * Math.sin(endAngle);
              const x4 = centerX + outerRadius * Math.cos(endAngle);
              const y4 = centerY + outerRadius * Math.sin(endAngle);

              const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / (numbers.length - 1)));
              const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / (numbers.length - 1)));
              const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / (numbers.length - 1)));
              const fillColor = `rgb(${r}, ${g}, ${b})`;

              return (
                <Path
                  key={`segment-${index}`}
                  d={`M${x2},${y2} L${x1},${y1} A${outerRadius},${outerRadius} 0 0,1 ${x4},${y4} L${x3},${y3} A${innerRadius},${innerRadius} 0 0,0 ${x2},${y2} Z`}
                  fill={fillColor}
                  stroke="white"
                  strokeWidth={2}
                />
              );
            })}
            <Circle cx={centerX} cy={centerY} r={innerRadius} fill="white" />
          </Svg>

          {numbers.map((number, index) => {
            const angle = (((index) / numbers.length) * Math.PI * 2) - Math.PI / 2;
            const distance = (innerRadius + outerRadius) / 2;
            const x = centerX + distance * Math.cos(angle);
            const y = centerY + distance * Math.sin(angle);

            return (
              <TouchableOpacity
                key={`number-${index}`}
                style={[styles.numberCircle, {
                  position: 'absolute',
                  left: x - (numberSize / 2),
                  top: y - (numberSize / 2),
                  width: numberSize,
                  height: numberSize,
                  borderRadius: numberSize / 2,
                }]}
                onPress={() => handleNumberPress(number)}
              >
                <ThemedText style={styles.numberText}>{number}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText style={[styles.modalTitle, { fontSize: scale(18, 16, 21) }]}>
                {selectedNumber}. {selectedTitleKey ? t(selectedTitleKey) : ''}
              </ThemedText>
              <ThemedText style={[styles.modalBody, { fontSize: scale(16, 14, 18) }]}>
                {selectedKey ? t(selectedKey) : ''}
              </ThemedText>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <ThemedText style={styles.closeButtonText}>{t('CLOSE')}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  title: {
    color: '#2E443E',
    marginTop: 0,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 19,
    lineHeight: 25,
  },
  subtitle: {
    paddingTop: 16,
    paddingBottom: 0,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
  },
  guidelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minHeight: 54,
  },
  guidelineCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    gap: 8,
  },
  guidelineNumberCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  guidelineNumberText: {
    color: '#345641',
    fontWeight: 'bold',
    fontSize: 16,
  },
  guidelineTitle: {
    color: '#2E443E',
    fontSize: 13,
    lineHeight: 18,
    flexShrink: 1,
  },
  guidelineTable: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 16,
    marginBottom: 24,
  },
  numberCircle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      },
    }),
    zIndex: 10,
  },
  numberText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2E443E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 24,
    borderRadius: 15,
    width: '88%',
    maxWidth: 560,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2E443E',
    marginBottom: 15,
  },
  modalBody: {
    fontSize: 16,
    color: '#2E443E',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2E443E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default GuidelinesScreen;


