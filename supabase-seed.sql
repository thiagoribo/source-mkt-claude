-- SM Agency - Seed Data
-- Execute este SQL no SQL Editor do Supabase DEPOIS de executar supabase-setup.sql
-- Este arquivo insere os dados existentes do site no banco de dados

-- =====================
-- TEAM MEMBERS (Equipe)
-- =====================

INSERT INTO team_members (name, role, bio, image_url, is_founder, display_order, is_active) VALUES
-- Fundadores
(
  'Ana Santos',
  'Co-fundadora e Diretora de Branding',
  'Ana Santos é co-fundadora e Diretora de Branding da SM Agency, onde lidera todos os projetos de posicionamento estratégico e construção de marca. Com mais de 15 anos de experiência em branding para empresas de diversos setores, Ana desenvolveu uma abordagem única que combina rigor analítico com sensibilidade para traduzir essência de negócio em territórios de comunicação memoráveis.',
  NULL,
  true,
  1,
  true
),
(
  'Thiago Bianchi',
  'Co-fundador e Diretor de Performance',
  'Thiago Bianchi é co-fundador e Diretor de Performance da SM Agency, onde lidera a dimensão de crescimento, conversão e resultados mensuráveis. Com background em estratégias de crescimento e marketing de performance, Thiago desenvolveu expertise em conectar estratégia de marca com resultados tangíveis de negócio.',
  NULL,
  true,
  2,
  true
),
-- Equipe
(
  'Ana Castro',
  'Designer Sênior',
  NULL,
  NULL,
  false,
  3,
  true
),
(
  'Caio Castro',
  'Designer Sênior',
  NULL,
  NULL,
  false,
  4,
  true
),
(
  'Gabriela Montezi',
  'Estrategista de Redes Sociais',
  NULL,
  NULL,
  false,
  5,
  true
),
(
  'Grazielli Santos',
  'Adm & Financeiro',
  NULL,
  NULL,
  false,
  6,
  true
),
(
  'Lohana Vitória',
  'Designer Sênior',
  NULL,
  NULL,
  false,
  7,
  true
);


-- =====================
-- TESTIMONIALS (Depoimentos)
-- =====================

-- Branding Empresarial (6 depoimentos)
INSERT INTO testimonials (name, role, company, quote, result, image_url, service_slugs, is_featured, display_order, is_active) VALUES
(
  'Beatriz Garcia',
  'Advogada',
  NULL,
  'O resultado superou todas as expectativas e combinou perfeitamente com minha identidade. Agora sinto que posso dominar o mundo!',
  'Time cresceu 200%',
  NULL,
  ARRAY['branding-empresarial', 'identidade-visual'],
  true,
  1,
  true
),
(
  'Daiane Furlanetto',
  'Advogada e Sócia de Escritório',
  NULL,
  'Extremamente competente. Recebi um tratamento único que acertou desde o tom de voz até a identidade visual. Recomendo com total confiança.',
  'Posicionamento estratégico consistente',
  NULL,
  ARRAY['branding-empresarial'],
  false,
  2,
  true
),
(
  'Jaqueline Vieira',
  'Proprietária de Franquia',
  NULL,
  'A SM. Agency acerta em cheio onde grandes players do mercado erram. Pontualidade e cumprimento do calendário são diferenciais reais.',
  'Marca pessoal insubstituível',
  NULL,
  ARRAY['branding-empresarial'],
  false,
  3,
  true
),
(
  'Renata Imaoka',
  'CEO',
  'HM Tour & ELO8 Assessoria',
  'Cliente há 4 anos. Me emocionei com a leitura perfeita da minha identidade transformada em marca. Ana enxerga além da superfície.',
  'Negócio expandido',
  NULL,
  ARRAY['branding-empresarial'],
  true,
  4,
  true
),
(
  'Marina Rosso',
  'Proprietária',
  'Loja Like. Brand',
  'O reposicionamento da empresa hoje colhe resultados positivos e consistentes.',
  'Reposicionamento bem-sucedido',
  NULL,
  ARRAY['branding-empresarial'],
  false,
  5,
  true
),
(
  'Luma Schmitti',
  'Professora e Mestre em Língua Portuguesa',
  NULL,
  'Fiquei impressionada com o detalhamento do projeto. Aprendi que construir uma marca exige base, não apenas logo e posts.',
  'Projeto Passei e Ponto criado',
  NULL,
  ARRAY['branding-empresarial'],
  false,
  6,
  true
),

-- Branding Pessoal (7 depoimentos)
(
  'Sabrina Keller',
  'Mentora de Mulheres e Palestrante',
  NULL,
  'Atribuo minha posição atual ao apoio na gestão de redes sociais e orientação de posicionamento. Recebo mensagens diárias de interessadas.',
  '+150% faturamento',
  NULL,
  ARRAY['branding-pessoal', 'gestao-redes-sociais'],
  true,
  7,
  true
),
(
  'Giulia Closs',
  'Arquiteta',
  NULL,
  'O processo superou as expectativas. A equipe capturou a essência da minha marca desde o início.',
  'R$ 20.000 no 1º mês',
  NULL,
  ARRAY['branding-pessoal'],
  true,
  8,
  true
),
(
  'Andressa Fraga',
  'Advogada e Mestre em Neurociência',
  NULL,
  'Ana possui maestria em traduzir desejos que o cliente não consegue expressar com exatidão. O processo é uma escuta profunda que transforma histórias de vida em marcas estratégicas.',
  '3 empresas + Podcast Neuro4you',
  NULL,
  ARRAY['branding-pessoal'],
  false,
  9,
  true
),
(
  'Dra. Ana Príscia',
  'Médica Alergista e Imunologista',
  NULL,
  'Ana deu rumo ao meu navio. Antes eu tinha força mas remava em círculos. O processo trouxe equilíbrio e direcionamento através de questionamentos e estratégias sólidas.',
  'Parcerias e projetos de destaque',
  NULL,
  ARRAY['branding-pessoal'],
  false,
  10,
  true
),
(
  'Indy Zimmer',
  'Mentora de Mentalidade',
  NULL,
  'A equipe captou exatamente quem eu sou e superou as expectativas em 1 milhão de vezes. Descobri meu propósito e mudei completamente a visão do negócio.',
  'Propósito descoberto',
  NULL,
  ARRAY['branding-pessoal'],
  false,
  11,
  true
),
(
  'Thatiane Nascimento',
  'Assessora Administrativa & Financeira',
  NULL,
  'A mentoria trouxe confiança e a sensação de merecimento. Investir em imagem e comunicação foi uma das minhas melhores decisões.',
  'Trabalha com grandes nomes do mercado digital',
  NULL,
  ARRAY['branding-pessoal'],
  false,
  12,
  true
),
(
  'Stephany Tizziani',
  'Mentora de Nail Designers',
  NULL,
  'Melhor investimento da minha carreira. A agência me deu um norte e evitou muitos tropeços.',
  'Aumento na procura pela mentoria',
  NULL,
  ARRAY['branding-pessoal'],
  false,
  13,
  true
),

-- Identidade Visual (4 depoimentos - alguns já existem acima, adicionando os únicos)
(
  'Guilherme Moeller',
  'Treinador e Palestrante',
  'Furu',
  'Atendimento com muita atenção e soluções que atenderam perfeitamente os sócios.',
  'Soluções adequadas para todos',
  NULL,
  ARRAY['identidade-visual'],
  false,
  14,
  true
),
(
  'Jéssica Frasson',
  'Fisioterapeuta',
  NULL,
  'Agenda sempre lotada e aumento significativo no ticket dos meus serviços.',
  'Espaço próprio inaugurado',
  NULL,
  ARRAY['identidade-visual'],
  false,
  15,
  true
),
(
  'Dra. Milena Pandolfi',
  'Médica Alergista e Imunologista',
  NULL,
  'Uma palavra resume o trabalho: clareza e direcionamento.',
  'Agenda de pacientes preenchida',
  NULL,
  ARRAY['identidade-visual'],
  false,
  16,
  true
),

-- Gestão de Redes Sociais (4 depoimentos - alguns já existem acima, adicionando os únicos)
(
  'Monalisa Oliveira',
  'Advogada (Portugal)',
  NULL,
  'Trabalho incrível, personalizado e de altíssima qualidade.',
  'Materiais de conteúdo de excelência',
  NULL,
  ARRAY['gestao-redes-sociais'],
  false,
  17,
  true
),
(
  'Rebecca Santos',
  'Advogada Tributária',
  NULL,
  'Um trabalho incrível, personalizado e de alta qualidade.',
  'Conteúdo estratégico personalizado',
  NULL,
  ARRAY['gestao-redes-sociais'],
  false,
  18,
  true
),
(
  'Glayce Kerolin',
  'Mentora e Psicanalista',
  NULL,
  'Destaco o empenho da equipe em entregar soluções com profissionalismo.',
  'Soluções entregues com excelência',
  NULL,
  ARRAY['gestao-redes-sociais'],
  false,
  19,
  true
);


-- =====================
-- CASES (Portfólio)
-- =====================

INSERT INTO cases (name, category, challenge, result, image_url, display_order, is_active) VALUES
(
  'Tech Solutions',
  'Consultoria Estratégica',
  'Competia por preço em mercado saturado',
  '3× ticket médio em 6 meses',
  NULL,
  1,
  true
),
(
  'Consultoria Premium',
  'Branding Empresarial',
  'Dificuldade em entrar no segmento premium',
  'Entrada bem-sucedida no segmento premium',
  NULL,
  2,
  true
),
(
  'E-commerce Moda',
  'Consultoria Estratégica',
  'Margens baixas e competição por preço',
  '+180% margem líquida',
  NULL,
  3,
  true
),
(
  'Thatiane Oliveira',
  'Branding Pessoal',
  'Falta de posicionamento claro no mercado',
  'Autoridade construída',
  NULL,
  4,
  true
),
(
  'Grupo RA',
  'Branding Empresarial',
  'Marca desatualizada e sem diferenciação',
  'Reposicionamento completo',
  NULL,
  5,
  true
),
(
  'StartupX',
  'Consultoria Estratégica',
  'Produto validado mas sem clareza de posicionamento',
  'Entrada no mercado premium',
  NULL,
  6,
  true
);


-- =====================
-- VERIFICAÇÃO
-- =====================

-- Verifique se os dados foram inseridos corretamente:
-- SELECT COUNT(*) as total_team FROM team_members;
-- SELECT COUNT(*) as total_testimonials FROM testimonials;
-- SELECT COUNT(*) as total_cases FROM cases;
