export interface CaseResult {
  metric: string;
  label: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseLinks {
  instagram?: string;
  linkedin?: string;
  site?: string;
  drive?: string;
}

export interface CaseData {
  id: string;
  category: string;
  client: string;
  tagline: string;
  headline: string;
  storytelling: string[];
  results: CaseResult[];
  quote?: CaseQuote;
  links: CaseLinks;
}

export const casesData: CaseData[] = [
  {
    id: "like-brand",
    category: "Branding Empresarial",
    client: "LIKE. Brand",
    tagline: "420% de crescimento em 6 meses. E uma loja física no horizonte.",
    headline: "Às vezes, crescer exige a coragem de abandonar o que não serve mais.",
    storytelling: [
      "A LIKE. chegou à Source com um dilema que muitos empresários enfrentam em silêncio: o negócio funcionava, mas não crescia do jeito que deveria. A marca tinha energia, mas comunicava algo que não representava mais onde a fundadora queria estar.",
      "O nome, inclusive, era parte do problema — carregava uma percepção de infantilidade incompatível com o posicionamento premium que Marina queria construir.",
      "A Source entrou com estratégia e coragem para fazer escolhas difíceis juntas.",
      "A primeira decisão foi encerrar o atacado — um canal que consumia energia e diluía o posicionamento. A segunda foi elevar a marca para o território premium, com consistência em todos os pontos de contato. Construímos uma nova identidade de marca, começando pelo nome: um reposicionamento que comunicasse maturidade, estilo e valor percebido.",
      "Junto com a nova marca, estruturamos processos, liderança e modelo de vendas — para que o crescimento tivesse base para se sustentar.",
      "Em 6 meses de projeto, o faturamento cresceu 420%. E o maior símbolo dessa transformação está chegando: a abertura da primeira loja física B2C da LIKE. — resultado concreto de uma marca que finalmente se encontrou.",
    ],
    results: [
      { metric: "420%", label: "de crescimento em faturamento" },
      { metric: "6 meses", label: "de projeto para transformar o negócio" },
      { metric: "1ª loja", label: "física B2C em processo de abertura" },
    ],
    quote: {
      text: "A Source nos ajudou a tomar decisões estratégicas com segurança. Encerramos o atacado, elevamos o posicionamento para premium e criamos uma marca consistente — começando pelo nome, que deixou de comunicar infantilidade. O resultado foi um novo padrão de liderança, processos e vendas, culminando na abertura da nossa loja física.",
      author: "Marina Rosso",
      role: "Fundadora, LIKE. Brand",
    },
    links: {
      instagram: "https://www.instagram.com/likebrand.oficial/",
      drive: "https://drive.google.com/drive/folders/1td6Z5UQf8y_jjKFRFt62RfTO6-H2LONj?usp=sharing",
    },
  },
  {
    id: "clinica-petra",
    category: "Branding Empresarial",
    client: "Clínica Petra",
    tagline: "Uma clínica que nasceu pronta para ser referência.",
    headline: "Não basta ser boa. É preciso nascer bem posicionada.",
    storytelling: [
      "A Clínica Petra ainda não existia quando chegou até a Source. Era uma ideia — sólida, ambiciosa, com sócias especialistas em urologia e dermatologia. Mas uma ideia sem nome, sem identidade e sem estratégia de como se apresentar ao mundo.",
      "A Source trabalhou desde o início.",
      "Começamos pelo naming: criar um nome que carregasse a essência da clínica — sofisticado, memorável, que comunicasse integração e padrão elevado sem precisar explicar. Petra nasceu desse processo.",
      "Em seguida, construímos a identidade visual completa — uma marca que refletia a seriedade clínica e a experiência premium que os sócios queriam entregar. Depois veio o posicionamento: definimos o território da Clínica Petra no mercado, como ela se comunica, o que a diferencia e quem é o seu paciente ideal.",
      "Mas a Source foi além da marca. Estruturamos o marketing e o atendimento com scripts comerciais alinhados à visão dos sócios — para que a excelência da clínica fosse percebida desde o primeiro contato.",
      "A Clínica Petra não precisou descobrir seu caminho depois de abrir. Ela nasceu com estratégia.",
    ],
    results: [
      { metric: "Naming", label: "criado do zero" },
      { metric: "Identidade", label: "visual completa desenvolvida" },
      { metric: "Scripts", label: "comerciais alinhados aos sócios" },
    ],
    quote: {
      text: "A SM traduziu exatamente o que a Clínica Petra é: uma clínica integrada com padrão alto, unindo urologia e dermatologia. Criou o naming, identidade visual e posicionamento, e estruturou marketing e atendimento com scripts comerciais alinhados aos sócios. A clínica nasceu pronta para ser referência.",
      author: "Dra. Ana Paula Naspolini",
      role: "Fundadora, Clínica Petra",
    },
    links: {
      instagram: "https://www.instagram.com/clinica.petra/",
    },
  },
  {
    id: "start-imobiliario",
    category: "Projeto estratégico realizado",
    client: "Start Imobiliário",
    tagline: "De operação desordenada a uma empresa com caminho claro para escalar.",
    headline: "Quando crescer sem estrutura é mais perigoso do que não crescer.",
    storytelling: [
      "A Start Imobiliário tinha o que muitas empresas do setor invejam: mercado aquecido, produto forte e equipe com energia. Mas o crescimento estava travado — não por falta de oportunidade, mas por falta de estrutura para aproveitá-las.",
      "A Source realizou uma Consultoria 360° completa. Começamos pela auditoria: analisamos cada camada da operação — cultura interna, posicionamento de marca, gestão comercial, processos e comunicação. O diagnóstico foi preciso. A Start precisava de fundação antes de acelerar.",
      "A partir daí, trabalhamos a reestruturação em três frentes. Na cultura, alinhamos os valores e a identidade da empresa com o time e a liderança. No posicionamento, definimos com clareza quem é a Start, para quem ela fala e como se diferencia em um mercado competitivo como o de Porto Belo e Itapema. Na gestão comercial, construímos um modelo funcional — com processos, papéis definidos e direção clara de implementação.",
      "O resultado não é um número. É algo mais valioso: a Start saiu da consultoria sabendo exatamente o que fazer, como fazer e em qual ordem. Com base sólida para escalar e performance para sustentar o crescimento.",
    ],
    results: [
      { metric: "360°", label: "auditoria completa da operação" },
      { metric: "1 modelo", label: "comercial estruturado do zero" },
      { metric: "Clareza", label: "de rota para escala e performance" },
    ],
    links: {
      instagram: "https://www.instagram.com/startimobiliario/",
      site: "https://www.startimobiliario.com",
    },
  },
];

export function getCaseById(id: string): CaseData | undefined {
  return casesData.find((c) => c.id === id);
}
