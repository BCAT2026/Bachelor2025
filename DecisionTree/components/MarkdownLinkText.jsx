import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { openExternalLink } from '@/utils/openExternalLink';
import { useTranslation } from 'react-i18next';

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

export default function MarkdownLinkText({
  text = '',
  style,
  linkStyle,
  linkErrorMessage,
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const parts = [];
  let lastIndex = 0;
  let match;

  linkPattern.lastIndex = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) });
    }

    parts.push({ text: match[1], target: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) });
  }

  const openTarget = async (target) => {
    if (target.startsWith('pdf:')) {
      router.push({
        pathname: '/pdfView',
        params: { filename: target.replace('pdf:', '') },
      });
      return;
    }

    await openExternalLink(target, linkErrorMessage ?? t('LINK_OPEN_ERROR'));
  };

  return (
    <Text style={[styles.text, style]}>
      {parts.map((part, index) => {
        if (part.target) {
          return (
            <Text
              key={`${part.target}-${index}`}
              accessibilityRole="link"
              onPress={() => openTarget(part.target)}
              style={[styles.link, linkStyle]}
            >
              {part.text}
            </Text>
          );
        }

        return <Text key={`${part.text}-${index}`}>{part.text}</Text>;
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#345641',
    fontFamily: 'Poppins_400Regular',
  },
  link: {
    color: '#345641',
    fontFamily: 'Poppins_600SemiBold',
    textDecorationLine: 'underline',
  },
});
