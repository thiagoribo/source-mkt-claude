# Backup — Seções de Preço (Ocultas)

Seções de preço removidas do site em **março/2026** por decisão estratégica.
As funções ainda existem nos arquivos originais (comentadas), e cópias completas estão aqui para fácil restauração.

---

## Como restaurar uma seção

1. Abra o arquivo da página correspondente
2. Descomente a linha `{/* <NomeDoComponente /> */}` no render principal
3. Pronto — a seção volta a aparecer no site
4. Rode `npm run build` para confirmar sem erros

---

## Mapa de seções ocultas

| Arquivo de backup | Componente | Arquivo da página | Preço |
|---|---|---|---|
| `investimento-gestao-redes-sociais.tsx` | `Investimento()` | `src/pages/GestaoRedesSociais.tsx` | R$1.597/mês |
| `investimento-consultoria-estrategica.tsx` | `Investimento()` | `src/pages/ConsultoriaEstrategica.tsx` | R$35k–R$140k (3 tiers) |
| `investimento-branding-empresarial.tsx` | `InvestimentoBranding()` | `src/pages/BrandingEmpresarial.tsx` | R$25.000 |
| `investimento-branding-pessoal.tsx` | `InvestimentoPessoal()` | `src/pages/BrandingPessoal.tsx` | R$18.000 |
| `investimento-identidade-visual.tsx` | `Investimento()` | `src/pages/IdentidadeVisual.tsx` | R$8.000 |
| `investimento-naming.tsx` | `Investimento()` | `src/pages/Naming.tsx` | R$5.000 |
| `preco-homepage.md` | Inline JSX (não é componente) | `src/pages/Index.tsx` | Faturamento mínimo + preços dos cards |
