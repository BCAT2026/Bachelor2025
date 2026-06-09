const decisionTreeDataNO = [
  {
    id: 'q1',
    step: 1,
    question: 'Er utøveren over 18 år?',
    options: [
      { label: 'Ja', next: 'q3' },
      { label: 'Nei', next: 'q2' },
    ],
  },
  {
    id: 'q2',
    step: 1,
    question: 'Finnes det medisinske årsaker eller andre unntakstilfeller som gir grunnlag for å vurdere BC?',
    visibleIf: {
      previousQuestion: 'q1',
      expectedAnswer: 'Nei',
    },
    options: [
      { label: 'Ja', next: 'q3' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å måle kroppssammensetning (BC) hos utøvere under 18 år, med mindre det foreligger medisinske årsaker eller andre unntakstilfeller.\n \nTidlig igangsettelse med veiing og måling av kroppssammensetning kan øke risikoen for at utøveren blir overopptatt av disse forholdene, noe som igjen kan føre til kroppsmisnøye og et forstyrret forhold til mat og kropp.\n \nYngre utøvere vil ha større utbytte av å fokusere på grunnleggende elementer innen trening, ernæring og restitusjon for å forbedre idrettsspesifikk teknikk, fysisk kapasitet og mental robusthet, og dermed øke prestasjonsevnen på en trygg og bærekraftig måte.',
      },
    ],
  },
  {
    id: 'q3',
    step: 1,
    question: 'Konkurrerer utøveren på nasjonalt nivå eller høyere?',
    options: [
      { label: 'Ja', next: 'q4' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å måle BC hos utøvere som konkurrerer under nasjonalt nivå.\n \nUtøvere under nasjonalt nivå har mindre sannsynlighet for å ha nødvendig støtteapparat tilgjengelig, og vil ha større utbytte av å fokusere på grunnleggende elementer innen trening, ernæring og restitusjon for å forbedre idrettsspesifikk teknikk, fysisk kapasitet og mental robusthet, og dermed øke prestasjonsevnen.',
      },
    ],
  },
  {
    id: 'q4',
    step: 1,
    question:
      'Er det bekymringer knyttet til spiseatferd eller negativt kroppsbilde? Det kan være nyttig å benytte validerte ressurser: [EDE-Q](pdf:ede-q_NO.pdf), [ADE](pdf:ADE_en.pdf) eller [BAS-2](pdf:BAS-2_no.pdf).',
    options: [
      { label: 'Ja', next: 'q5' },
      { label: 'Nei', next: 'q6' },
    ],
  },
  {
    id: 'q5',
    step: 1,
    question: 'Foreligger det medisinske årsaker for vurdering av BC, OG finnes det et medisinsk støtteapparat som kan følge opp utøveren?',
    visibleIf: {
      previousQuestion: 'q4',
      expectedAnswer: 'Ja',
    },
    options: [
      { label: 'Ja', next: 'q6' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage: 'Det anbefales ikke å måle BC.',
      },
    ],
  },
  {
    id: 'q6',
    step: 1,
    question: 'Har utøveren tilstrekkelig tilgang til medlemmer av et helsefaglig og prestasjonsrettet team?\n \nMinimum: Kvalifisert ernæringsfysiolog, utdannet trener, psykolog og idrettslege.',
    options: [
      { label: 'Ja', next: 'q8' },
      { label: 'Nei', next: 'q7' },
    ],
  },
  {
    id: 'q7',
    step: 1,
    question: 'Kan du bidra til at utøveren får tilgang til én eller flere av disse fagpersonene?',
    visibleIf: {
      previousQuestion: 'q6',
      expectedAnswer: 'Nei',
    },
    options: [
      {
        label: 'Ja',
        feedbackType: 'yellow',
        feedbackMessage:
          'Selv om det er ønskelig å ha et støtteapparat på plass, anerkjenner vi at dette ikke er tilfelle overalt, og anser det derfor som tilstrekkelig at utøveren har tilgang til støtte fra hver av de nevnte fagpersonene.\n \nDu/dere oppfordres likevel til å bidra til at utøveren får tilgang til støtte eller tjenester fra disse fagpersonene.',
        next: 'q8',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Dersom utøveren ikke har tilgang til støtte eller tjenester fra fagpersonene nevnt ovenfor, anbefales det ikke å gjennomføre vurdering eller endring av BC.',
      },
    ],
  },
  {
    id: 'q8',
    step: 1,
    question: 'Finnes det et godt og tilstrekkelig grunnlag og behov for å gjennomføre en vurdering av BC, uten at det medfører skade for utøveren?',
    options: [
      { label: 'Ja', next: 'q9' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Det er ikke behov for vurdering av BC. Forsterk budskapet om ernæring – prioriter energitilførsel og restitusjon med fokus på helse.',
      },
    ],
  },
  {
    id: 'q9',
    step: 1,
    question: 'Har du vurdert om utøveren er tilstrekkelig forberedt og egnet for å gjennomføre en BC-vurdering?',
    options: [
      { label: 'Ja', next: 'q10' },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Vurder om utøveren er tilstrekkelig forberedt og egnet for å gjennomføre en BC-vurdering, og gå tilbake til dette spørsmålet, eller ikke gjennomfør noen måling av BC.',
      },
    ],
  },
  {
    id: 'q10',
    step: 1,
    question: 'Er det bekymringer knyttet til spiseatferd, tidligere spiseforstyrrelser, eller negativt kroppsbilde?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å måle BC. Det bør kun vurderes dersom det foreligger medisinske grunner. Bekymringene bør tas opp med relevant støtteapparat, og utøveren bør henvises til riktig støtte.',
      },
      {
        label: 'Nei',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't1',
      },
    ],
  },
  {
    id: 't1',
    isTransition: true,
    message: 'Steg 1 er fullført!\n \nDu kan nå gå videre til steg 2.',
    next: 'q11',
  },

  {
    id: 'q11',
    step: 2,
    question: 'Er prosessen rundt vurdering av BC tydelig formidlet til utøveren?',
    options: [
      {
        label: 'Ja',
        next: 'q12',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'BC-vurdering skal ikke gjennomføres før prosessen er tydelig forklart for utøveren. Dette sikrer at utøveren møter riktig forberedt med hensyn til blant annet hvile og matinntak før måling, men også at utøveren er fullt informert om målingen som gjøres og hva slags innsikt dette gir i kroppens helsetilstand.',
      },
    ],
  },
  {
    id: 'q12',
    step: 2,
    question: 'Er vurderingen planlagt å gjennomføres sammen med, eller i nær tilknytning til, andre relevante vurderinger?',
    options: [
      {
        label: 'Ja',
        next: 'q14',
      },
      {
        label: 'Nei',
        next: 'q13',
      },
    ],
  },
  {
    id: 'q13',
    step: 2,
    question: 'Er dette den eneste vurderingen du gjennomfører?',
    visibleIf: {
      previousQuestion: 'q12',
      expectedAnswer: 'Nei',
    },
    options: [
      {
        label: 'Ja',
        feedbackType: 'red',
        feedbackMessage:
          'Det anbefales ikke å gjennomføre BC-vurdering isolert, da det ikke finnes kontekst for å forstå og tolke resultatene.',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Det anbefales at andre relevante vurderinger gjennomføres samtidig for å gi kontekst til BC-resultatene. Eventuelt kan nærmeste vurderingstidspunkt benyttes som referanse, dersom det er hensiktsmessig.',
        next: 'q14',
      },
    ],
  },
  {
    id: 'q14',
    step: 2,
    question:
      'Har utøveren og støtteapparatet fått opplæring i BC, ernæring, trening og hvordan disse forholdene henger sammen?',
    options: [
      {
        label: 'Ja',
        next: 'q15',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Det anbefales å gi opplæring i BC, ernæring, trening og hvordan disse forholdene henger sammen for å utvikle forståelse for BC og sikre hensiktsmessig forståelse av denne målingen. Dette bør skje før vurderingene gjennomføres.',
        next: 'q15',
      },
    ],
  },
  {
    id: 'q15',
    step: 2,
    question:
      'Har utøveren valgfrihet til enhver tid når det gjelder om vurderingen skal gjennomføres, uten konsekvenser?',
    options: [
      {
        label: 'Ja',
        next: 'q16',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Utøvere skal alltid ha valgfrihet. Dersom det ikke er tilfellet, skal vurderingen ikke gjennomføres.\n\nEksempler på manglende valgfrihet kan være at utøveren blir tatt ut av laget, ikke får delta i kommende konkurranser, eller opplever negativ oppmerksomhet eller neglisjering fra trenere.',
      },
    ],
  },
  {
    id: 'q16',
    step: 2,
    question: 'Har du innhentet og dokumentert eksplisitt skriftlig samtykke fra utøveren?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't2',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Uten eksplisitt dokumentert samtykke fra utøveren skal vurderingen ikke gjennomføres.',
      },
    ],
  },
  {
    id: 't2',
    isTransition: true,
    message: 'Steg 2 er fullført!\n \nDu kan nå gå videre til steg 3.',
    next: 'q17',
  },

  {
    id: 'q17',
    step: 3,
    question:
      'Er den mest egnede metoden valgt? [Se metodetabell for oversikt](pdf:metodetabell.pdf). Som hovedregel anbefales DXA eller måling med kaliperklype/hudfoldtykkelse for utøvere.',
    options: [
      {
        label: 'Ja',
        next: 'q19',
      },
      {
        label: 'Nei',
        next: 'q18',
      },
    ],
  },
  {
    id: 'q18',
    step: 3,
    question:
      'Er det tilgjengelig utstyr for en mer egnet metode? [Se metodetabell for oversikt](pdf:metodetabell.pdf).',
    visibleIf: {
      previousQuestion: 'q17',
      expectedAnswer: 'Nei',
    },
    options: [
      {
        label: 'Ja',
        feedbackType: 'red',
        feedbackMessage:
          'Vurdering av BC bør ikke gjennomføres med denne metoden dersom en mer egnet metode er tilgjengelig.',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Gå videre med forsiktighet. Sørg for at nødvendige tiltak er på plass, og at resultatene vurderes i lys av metodens begrensninger. Forsøk å skaffe tilgang til bedre metode for fremtidige målinger.\n\n[Se metodetabell for oversikt](pdf:metodetabell.pdf). Dette innebærer blant annet standardisering av forberedelser, kalibrering av utstyr, samt tydelige prosedyrer for måling og analyse.',
        next: 'q19',
      },
    ],
  },
  {
    id: 'q19',
    step: 3,
    question:
      'Er personen som skal gjennomføre målingen tilstrekkelig trent, informert og kvalifisert for den valgte metoden, og har vedkommende nødvendige ferdigheter for å håndtere psykologiske hensyn knyttet til BC?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't3',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Uten opplæring eller nødvendige ferdigheter skal BC-målinger ikke gjennomføres.',
      },
    ],
  },
  {
    id: 't3',
    isTransition: true,
    message: 'Steg 3 er fullført!\n \nDu kan nå gå videre til steg 4.',
    next: 'q20',
  },

  {
    id: 'q20',
    step: 4,
    question: 'Har utøveren fått informasjon om prosedyrene for valgt metode og mulighet til å stille spørsmål før vurderingen?',
    options: [
      {
        label: 'Ja',
        next: 'q21',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gå videre med vurderingen før utøveren har blitt informert og har hatt mulighet til å stille spørsmål.',
      },
    ],
  },
  {
    id: 'q21',
    step: 4,
    question: 'Følger du en standardisert protokoll?',
    options: [
      {
        label: 'Ja',
        next: 'q22',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gjennomfør vurderingen med mindre du følger en etablert standardisert protokoll.\n\nVed DXA anbefaler vi følgende prosedyrer: [DXA](pdf:dxa.pdf). Se spesielt tabell 3 og 4.',
      },
    ],
  },
  {
    id: 'q22',
    step: 4,
    question: 'Har utøveren fått mulighet til å ha med en ledsager etter eget ønske under vurderingen?',
    options: [
      {
        label: 'Ja',
        next: 'q23',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gjennomfør vurderingen uten at dette tilbudet er gitt.',
      },
    ],
  },
  {
    id: 'q23',
    step: 4,
    question: 'Vil vurderingen foregå i et privat rom med kontrollert tilgang?',
    options: [
      {
        label: 'Ja',
        next: 'q24',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gjennomfør vurderingen med mindre dere kan flytte dere til et privat rom med kontrollert tilgang.',
      },
    ],
  },
  {
    id: 'q24',
    step: 4,
    question: 'Kjenner du til målingens presisjonsfeil?',
    options: [
      {
        label: 'Ja',
        next: 'q25',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Gå videre med varsomhet. Finn ut av presisjonsfeilen så snart som mulig for å tolke resultatene korrekt. [Se metodetabell](pdf:metodetabell.pdf).',
        next: 'q25',
      },
    ],
  },
  {
    id: 'q25',
    step: 4,
    question: 'Føler du at det er satt av tilstrekkelig tid til vurdering av analyseresultatene?',
    options: [
      {
        label: 'Ja',
        next: 'q26',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Gå videre med varsomhet. Sørg for at det er tilstrekkelig tid til å gjennomføre vurderingen i henhold til protokollen, samt til eventuelle samtaler i etterkant.',
        next: 'q26',
      },
    ],
  },
  {
    id: 'q26',
    step: 4,
    question: 'Finnes det rutiner for å sikre at data behandles og lagres konfidensielt som medisinske opplysninger?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't4',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gjennomfør vurderingen dersom du ikke kan sikre at dataene behandles konfidensielt som medisinske opplysninger.',
      },
    ],
  },
  {
    id: 't4',
    isTransition: true,
    message: 'Steg 4 er fullført!\n \nDu kan nå gå videre til steg 5.',
    next: 'q27',
  },
  
  {
    id: 'q27',
    step: 5,
    question: 'Har utøveren blitt informert om at resultatene ikke vil bli diskutert under datainnsamlingen, men at det kreves tid for å tolke dataene på en hensiktsmessig måte?',
    options: [
      {
        label: 'Ja',
        next: 'q28',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Gå videre med varsomhet. Informer utøveren om at det kreves tid for å tolke dataene, og avtal tidspunkt for oppfølging.',
        next: 'q28',
      },
    ],
  },
  {
    id: 'q28',
    step: 5,
    question:
      'Før resultatene kommuniseres; vil resultatene bli tolket og analysert sammen med andre relevante målinger og presisjonsfeil, innenfor støtteapparatet for helse og prestasjon?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't5',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gjennomfør vurderingen dersom denne graden av tolkning og analyse ikke er mulig.',
      },
    ],
  },
  {
    id: 't5',
    isTransition: true,
    message: 'Steg 5 er fullført!\n \nDu kan nå gå videre til steg 6.',
    next: 'q29',
  },
  
  {
    id: 'q29',
    step: 6,
    question:
      'Er dataene presentert i et forståelig format, som inkluderer presisjonsfeil og tidligere individuelle resultater (dersom tilgjengelig)?',
    options: [
      {
        label: 'Ja',
        next: 'q30',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke rapporter dataene før resultatene er tilgjengelige i et forståelig format som inkluderer både presisjonsfeil og tidligere individuelle resultater.',
      },
    ],
  },
  {
    id: 'q30',
    step: 6,
    question: 'Er normative referanseverdier brukt?',
    options: [
      {
        label: 'Nei',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't6',
      },
      {
        label: 'Ja',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke rapporter dataene før normative eller referanseverdier er fjernet.\n\nBortsett fra beinmasse (Z-score og T-score) er det lite grunnlag for å si at det finnes universale optimale mål på fettmasse og muskelmasse for enkeltindivider.',
      },
    ],
  },
  {
    id: 't6',
    isTransition: true,
    message: 'Steg 6 er fullført!\n \nDu kan nå gå videre til steg 7.',
    next: 'q31',
  },

  {
    id: 'q31',
    step: 7,
    question: 'Har utøveren kontroll over hvem som får tilgang til data fra BC-vurderingen?',
    options: [
      {
        label: 'Ja',
        next: 'q32',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gå videre med vurderingen dersom utøveren ikke har kontroll over hvem som har tilgang til dataene.',
      },
    ],
  },
  {
    id: 'q32',
    step: 7,
    question: 'Blir resultatene delt direkte med utøveren og diskutert med riktig person i et privat rom?',
    options: [
      {
        label: 'Ja',
        next: 'q33',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Gå videre med varsomhet. Resultatene bør deles direkte med utøveren og diskuteres i et privat rom med noen som har fått samtykke til å se resultatet – vanligvis et medlem av støtteapparatet.',
        next: 'q33',
      },
    ],
  },
  {
    id: 'q33',
    step: 7,
    question: 'Er det planlagt en samtale med utøveren og relevante medlemmer av støtteapparatet for å bli enige om videre tiltak?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'green',
        feedbackMessage: 'Gå videre til neste steg.',
        next: 't7',
      },
      {
        label: 'Nei',
        feedbackType: 'yellow',
        feedbackMessage:
          'Gå videre med varsomhet. Utøveren bør ha tilstrekkelig innflytelse på de neste stegene og ha tilpasset støtte.',
        next: 't7',
      },
    ],
  },
  {
    id: 't7',
    isTransition: true,
    message: 'Steg 7 er fullført!\n \nDu kan nå gå videre til steg 8.',
    next: 'q34',
  },
  
  {
    id: 'q34',
    step: 8,
    question: 'Finnes det en tydelig og avtalt plan for oppfølging av BC som er tilpasset den intervensjonen man har blitt enige om?',
    options: [
      {
        label: 'Ja',
        next: 'q35',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gå videre. En plan for oppfølging må være på plass før fremtidige vurderinger, og den må være tilpasset den intervensjonen man har blitt enige om.',
      },
    ],
  },
  {
    id: 'q35',
    step: 8,
    question: 'Overstiger det foreslåtte antallet vurderinger 4–6 ganger per år?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gå videre med et høyere antall vurderinger, med mindre det finnes spesifikke grunner. Reduser antallet vurderinger og tilpass det forventet respons.',
      },
      {
        label: 'Nei',
        next: 'q36',
      },
    ],
  },
  {
    id: 'q36',
    step: 8,
    question: 'Har utøveren støtte fra relevante medlemmer av støtteapparatet for helse og prestasjon?',
    options: [
      {
        label: 'Ja',
        next: 'q37',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gå videre med videre oppfølging. Utøvere bør ikke gjennomføre BC-vurderinger uten tilstrekkelig støtte fra kvalifiserte fagpersoner.',
      },
    ],
  },
  {
    id: 'q37',
    step: 8,
    question: 'Blir det vurdert at utøveren er tilstrekkelig forberedt og egnet for å gjennomføre en BC-vurdering, før hver nye vurdering?',
    options: [
      {
        label: 'Ja',
        feedbackType: 'green',
        feedbackMessage: 'Du har fullført prosessen. Alle nødvendige steg er på plass.',
        next: 'complete',
      },
      {
        label: 'Nei',
        feedbackType: 'red',
        feedbackMessage:
          'Ikke gå videre før du har vurdert om utøveren er egnet og klar for vurderingen.\n\nGå tilbake til begynnelsen av prosessen for hver nye vurdering.',
      },
    ],
  },
  {
    id: 'complete',
    isTransition: true,
    message: 'Steg 8 er fullført!\n \nFlott, det virker som at dere er godt forberedt for måling av utøver, og at dere har gode sikkerhetsprosedyrer på plass for forberedelse og eventuell oppfølging. Det ligger nå til rette for at dere kan gjennomføre utøvermålingen på en anbefalt måte.',
  }
];

export default decisionTreeDataNO;


  
