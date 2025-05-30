import React from 'react';
import Markdown from 'react-native-markdown-display';
import { useRouter } from 'expo-router';
import { Linking, StyleSheet } from 'react-native';

export default function MarkdownRenderer({ text }) {
  const router = useRouter();

  const handleLinkPress = (url) => {
    if (url.startsWith('pdf:')) {
      const filename = url.replace('pdf:', '');
      router.push({ pathname: '/pdfView', params: { filename } });
    } else {
      Linking.openURL(url); // fallback for http links
    }
  };

  return (
    <Markdown
      style={markdownStyles}
      onLinkPress={handleLinkPress}
    >
      {text}
    </Markdown>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    color: '#2E443E',
  },
  link: {
    color: '#345641',
    textDecorationLine: 'underline',
  },
});
