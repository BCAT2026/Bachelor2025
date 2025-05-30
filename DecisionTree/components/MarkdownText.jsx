import React from 'react';
import Markdown from 'react-native-markdown-display';
import { useRouter } from 'expo-router';

export default function MarkdownText({ text }) {
  const router = useRouter();

  return (
    <Markdown
      onLinkPress={(url) => {
        if (url.startsWith('pdf:')) {
          const fileName = url.replace('pdf:', '');
          router.push(`/pdfView?file=${fileName}`);
          return false;
        }
        return true;
      }}
      style={{
        body: { fontSize: 16, textAlign: 'center' },
        link: { color: '#345641', textDecorationLine: 'underline' },
      }}
    >
      {text}
    </Markdown>
  );
}
