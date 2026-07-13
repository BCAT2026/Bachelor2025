import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useState } from 'react';
import { openExternalLink } from '@/utils/openExternalLink';

export default function More() {
  const { t } = useTranslation();
  const { scale } = useResponsiveLayout();
  const [selectedSection, setSelectedSection] = useState(null);

  const infoItems = [
    { number: 1, titleKey: 'MORE_1', section: 'about' },
    { number: 2, titleKey: 'MORE_2', section: 'help' },
    { number: 3, titleKey: 'MORE_3', section: 'privacy' },
    { number: 4, titleKey: 'MORE_4', section: 'contact' },
  ];

  const openArticle = () => {
    openExternalLink(t('ABOUT_APP_ARTICLE_URL'), t('LINK_OPEN_ERROR'));
  };

  const openPrivacyPolicy = () => {
    openExternalLink(t('PRIVACY_POLICY_URL'), t('LINK_OPEN_ERROR'));
  };

  const openContactEmail = () => {
    openExternalLink(`mailto:${t('CONTACT_EMAIL')}`, t('EMAIL_OPEN_ERROR'));
  };

  if (selectedSection === 'about') {
    return (
      <ParallaxScrollView>
        <Header onBackPress={() => setSelectedSection(null)} />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={[styles.title, { fontSize: scale(24, 20, 28) }]}>
            {t('ABOUT_APP_PAGE_TITLE')}
          </ThemedText>
        </ThemedView>

        <View style={styles.detailContainer}>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('ABOUT_APP_PAGE_TEXT')}
          </ThemedText>

          <TouchableOpacity
            style={styles.linkCard}
            onPress={openArticle}
            accessibilityRole="link"
            activeOpacity={0.75}
          >
            <ThemedText style={[styles.linkLabel, { fontSize: scale(13, 12, 15) }]}>
              {t('ABOUT_APP_ARTICLE_LINK_LABEL')}
            </ThemedText>
            <ThemedText style={[styles.articleTitle, { fontSize: scale(15, 13, 17), lineHeight: scale(22, 20, 25) }]}>
              {t('ABOUT_APP_ARTICLE_TITLE')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    );
  }

  if (selectedSection === 'help') {
    return (
      <ParallaxScrollView>
        <Header onBackPress={() => setSelectedSection(null)} />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={[styles.title, { fontSize: scale(24, 20, 28) }]}>
            {t('HELP_PAGE_TITLE')}
          </ThemedText>
        </ThemedView>

        <View style={styles.detailContainer}>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('HELP_PAGE_INTRO')}
          </ThemedText>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('HELP_PAGE_ANSWERS')}
          </ThemedText>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('HELP_PAGE_SYMBOLS')}
          </ThemedText>

          <View style={styles.helpList}>
            <View style={styles.helpCard}>
              <View style={[styles.helpDot, styles.greenDot]} />
              <ThemedText style={[styles.helpItem, { fontSize: scale(16, 14, 18), lineHeight: scale(24, 22, 27) }]}>
                <ThemedText style={styles.greenLabel}>{t('HELP_GREEN_LABEL')}</ThemedText>
                {t('HELP_GREEN_TEXT')}
              </ThemedText>
            </View>
            <View style={styles.helpCard}>
              <View style={[styles.helpDot, styles.yellowDot]} />
              <ThemedText style={[styles.helpItem, { fontSize: scale(16, 14, 18), lineHeight: scale(24, 22, 27) }]}>
                <ThemedText style={styles.yellowLabel}>{t('HELP_YELLOW_LABEL')}</ThemedText>
                {t('HELP_YELLOW_TEXT')}
              </ThemedText>
            </View>
            <View style={styles.helpCard}>
              <View style={[styles.helpDot, styles.redDot]} />
              <ThemedText style={[styles.helpItem, { fontSize: scale(16, 14, 18), lineHeight: scale(24, 22, 27) }]}>
                <ThemedText style={styles.redLabel}>{t('HELP_RED_LABEL')}</ThemedText>
                {t('HELP_RED_TEXT')}
              </ThemedText>
            </View>
          </View>

          <ThemedText style={[styles.detailText, styles.lastDetailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('HELP_PAGE_GUIDELINES')}
          </ThemedText>
        </View>
      </ParallaxScrollView>
    );
  }

  if (selectedSection === 'privacy') {
    return (
      <ParallaxScrollView>
        <Header onBackPress={() => setSelectedSection(null)} />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={[styles.title, { fontSize: scale(24, 20, 28) }]}>
            {t('PRIVACY_PAGE_TITLE')}
          </ThemedText>
        </ThemedView>

        <View style={styles.detailContainer}>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('PRIVACY_PAGE_INTRO')}
          </ThemedText>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('PRIVACY_PAGE_NO_DATA')}
          </ThemedText>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('PRIVACY_PAGE_LOCAL_STORAGE')}
          </ThemedText>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('PRIVACY_PAGE_EXTERNAL_LINKS')}
          </ThemedText>
          <ThemedText style={[styles.detailText, styles.lastDetailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('PRIVACY_PAGE_UPDATES')}
          </ThemedText>

          <TouchableOpacity
            style={styles.policyButton}
            onPress={openPrivacyPolicy}
            accessibilityRole="link"
            activeOpacity={0.75}
          >
            <ThemedText style={[styles.policyLink, { fontSize: scale(16, 14, 18), lineHeight: scale(24, 22, 27) }]}>
              {t('PRIVACY_POLICY_LINK_TEXT')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    );
  }

  if (selectedSection === 'contact') {
    return (
      <ParallaxScrollView>
        <Header onBackPress={() => setSelectedSection(null)} />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={[styles.title, { fontSize: scale(24, 20, 28) }]}>
            {t('CONTACT_PAGE_TITLE')}
          </ThemedText>
        </ThemedView>

        <View style={styles.detailContainer}>
          <ThemedText style={[styles.detailText, { fontSize: scale(16, 14, 18), lineHeight: scale(25, 23, 28) }]}>
            {t('CONTACT_PAGE_TEXT')}
          </ThemedText>

          <View style={styles.contactBlock}>
            <ThemedText style={[styles.contactLabel, { fontSize: scale(15, 13, 17) }]}>
              {t('CONTACT_EMAIL_LABEL')}
            </ThemedText>
            <TouchableOpacity onPress={openContactEmail} accessibilityRole="link" activeOpacity={0.7}>
              <ThemedText style={[styles.contactLink, { fontSize: scale(16, 14, 18), lineHeight: scale(24, 22, 27) }]}>
                {t('CONTACT_EMAIL')}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView>
      <Header />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={[styles.title, { fontSize: scale(24, 20, 28) }]}>{t('MORE_INFO')}</ThemedText>
      </ThemedView>

      <View style={styles.tableContainer}>
        {infoItems.map((item) => (
          <TouchableOpacity
            key={item.number}
            style={styles.row}
            onPress={item.section ? () => setSelectedSection(item.section) : undefined}
            activeOpacity={item.section ? 0.7 : 1}
            accessibilityRole={item.section ? 'button' : undefined}
          >
            <View style={styles.numberCircle}>
              <ThemedText style={styles.numberText}>{item.number}</ThemedText>
            </View>
            <ThemedText style={[styles.rowText, { fontSize: scale(16, 14, 18), lineHeight: scale(23, 21, 26) }]}>
              {t(item.titleKey)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  tableContainer: {
    width: '100%',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D3DED8',
    borderRadius: 8,
    backgroundColor: '#F8FBF8',
  },
  numberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#345641',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowText: {
    color: '#2E443E',
    fontFamily: 'Poppins_600SemiBold',
    flexShrink: 1,
  },
  detailContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3DED8',
    borderRadius: 8,
    backgroundColor: '#F8FBF8',
    paddingVertical: 22,
    paddingHorizontal: 18,
  },
  detailText: {
    color: '#2E443E',
    textAlign: 'left',
    marginBottom: 18,
  },
  linkCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C5D4CB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  linkLabel: {
    color: '#587064',
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 18,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  articleTitle: {
    color: '#2E443E',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  contactBlock: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C5D4CB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  contactLabel: {
    color: '#2E443E',
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 22,
    marginBottom: 4,
    textAlign: 'left',
  },
  contactLink: {
    color: '#2E443E',
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 24,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  policyLink: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 24,
    textAlign: 'center',
  },
  policyButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#345641',
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  lastDetailText: {
    marginBottom: 0,
  },
  helpList: {
    width: '100%',
    marginBottom: 18,
    gap: 10,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    borderWidth: 1,
    borderColor: '#C5D4CB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  helpDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    marginRight: 10,
  },
  greenDot: {
    backgroundColor: '#345641',
  },
  yellowDot: {
    backgroundColor: '#C79016',
  },
  redDot: {
    backgroundColor: '#AF0012',
  },
  helpItem: {
    color: '#2E443E',
    flex: 1,
    lineHeight: 24,
    textAlign: 'left',
  },
  greenLabel: {
    color: '#345641',
    fontFamily: 'Poppins_600SemiBold',
  },
  yellowLabel: {
    color: '#9A6A00',
    fontFamily: 'Poppins_600SemiBold',
  },
  redLabel: {
    color: '#AF0012',
    fontFamily: 'Poppins_600SemiBold',
  },
});



