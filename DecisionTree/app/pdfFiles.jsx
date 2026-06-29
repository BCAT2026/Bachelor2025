const pdfBaseUrl =
  'https://raw.githubusercontent.com/BCAT2026/Bachelor2025/main/DecisionTree/assets/PDF';

const pdfFiles = {
  'ADE_en.pdf': {
    asset: require('../assets/PDF/ADE_en.pdf'),
    fallbackUri: `${pdfBaseUrl}/ADE_en.pdf`,
  },
  'BAS-2_en.pdf': {
    asset: require('../assets/PDF/BAS-2_en.pdf'),
    fallbackUri: `${pdfBaseUrl}/BAS-2_en.pdf`,
  },
  'BAS-2_no.pdf': {
    asset: require('../assets/PDF/BAS-2_no.pdf'),
    fallbackUri: `${pdfBaseUrl}/BAS-2_no.pdf`,
  },
  'dxa.pdf': {
    asset: require('../assets/PDF/dxa.pdf'),
    fallbackUri: `${pdfBaseUrl}/dxa.pdf`,
  },
  'ede-q_EN.pdf': {
    asset: require('../assets/PDF/ede-q_EN.pdf'),
    fallbackUri: `${pdfBaseUrl}/ede-q_EN.pdf`,
  },
  'ede-q_NO.pdf': {
    asset: require('../assets/PDF/ede-q_NO.pdf'),
    fallbackUri: `${pdfBaseUrl}/ede-q_NO.pdf`,
  },
  'metodetabell.pdf': {
    asset: require('../assets/PDF/metodetabell.pdf'),
    fallbackUri: `${pdfBaseUrl}/metodetabell.pdf`,
  },
};

export default pdfFiles;
