/**
 * Prerender script — gera HTML estático por rota após vite build
 *
 * Por que isso importa:
 *   Bots do WhatsApp, LinkedIn e Facebook fazem GET simples sem executar JS.
 *   O rewrite do Vercel retorna index.html (homepage) para TODAS as rotas.
 *   Este script cria dist/[rota]/index.html com as OG tags corretas de cada página,
 *   que o Vercel serve diretamente (arquivos estáticos têm prioridade sobre rewrites).
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "../dist");

const routes = [
  {
    path: "branding-empresarial",
    title: "Branding Empresarial Estratégico | SM Agency",
    description:
      "Transforme sua empresa em uma marca reconhecida. Posicionamento, proposta de valor, tom de voz e manual de marca completo para empresas que querem dominar seu mercado.",
    ogDescription:
      "Transforme sua empresa em uma marca reconhecida. Posicionamento, proposta de valor, tom de voz e manual de marca completo.",
    url: "https://sourcemkt.com.br/branding-empresarial",
  },
  {
    path: "branding-pessoal",
    title: "Branding Pessoal para Líderes e Especialistas | SM Agency",
    description:
      "Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes que querem ser reconhecidos pelo que representam.",
    ogDescription:
      "Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes.",
    url: "https://sourcemkt.com.br/branding-pessoal",
  },
  {
    path: "identidade-visual",
    title: "Identidade Visual Profissional para Empresas | SM Agency",
    description:
      "Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico alinhado ao posicionamento do seu negócio.",
    ogDescription:
      "Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico.",
    url: "https://sourcemkt.com.br/identidade-visual",
  },
  {
    path: "gestao-redes-sociais",
    title: "Gestão de Redes Sociais Estratégica | SM Agency",
    description:
      "Gestão profissional de redes sociais com calendário editorial, criação de conteúdo, gestão de comunidade e relatórios de performance mensais.",
    ogDescription:
      "Gestão profissional de redes sociais com calendário editorial, criação de conteúdo e relatórios de performance mensais.",
    url: "https://sourcemkt.com.br/gestao-redes-sociais",
  },
  {
    path: "naming",
    title: "Naming Estratégico para Marcas e Produtos | SM Agency",
    description:
      "Criação de nomes estratégicos para marcas e produtos. Análise fonética, semântica, verificação de domínios disponíveis e pesquisa no INPI. Nomes construídos para durar.",
    ogDescription:
      "Criação de nomes estratégicos para marcas e produtos com verificação de domínios e pesquisa no INPI.",
    url: "https://sourcemkt.com.br/naming",
  },
  {
    path: "consultoria-estrategica",
    title: "Consultoria de Marketing Estratégico | SM Agency",
    description:
      "Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas. Identifique os gargalos que impedem seu crescimento.",
    ogDescription:
      "Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas.",
    url: "https://sourcemkt.com.br/consultoria-estrategica",
  },
  {
    path: "quem-somos",
    title: "Quem Somos | SM Agency — Agência de Branding e Marketing",
    description:
      "Conheça a SM Agency: nossa história, valores e os profissionais por trás de marcas que se tornaram referência de mercado. Branding e consultoria estratégica.",
    ogDescription:
      "Conheça a SM Agency: nossa história, valores e os profissionais por trás de marcas que se tornaram referência de mercado.",
    url: "https://sourcemkt.com.br/quem-somos",
  },
];

function escapeHtmlAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function injectMeta(html, route) {
  const title = escapeHtmlAttr(route.title);
  const desc = escapeHtmlAttr(route.description);
  const ogDesc = escapeHtmlAttr(route.ogDescription);
  const url = route.url;

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${desc}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${ogDesc}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`
    );
}

const template = await readFile(join(DIST, "index.html"), "utf8");
let generated = 0;

for (const route of routes) {
  const html = injectMeta(template, route);
  const dir = join(DIST, route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html, "utf8");
  console.log(`✓ dist/${route.path}/index.html — "${route.title}"`);
  generated++;
}

console.log(`\nPrerender: ${generated} rotas geradas.`);
