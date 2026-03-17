/**
 * Adiciona <p></p> entre todos os blocos de conteúdo nos HTML dos posts.
 * Regra padrão: toda transição entre blocos (p, h2, h3, ul, ol, blockquote)
 * deve ter um parágrafo vazio para melhor legibilidade.
 */
import { readFileSync, writeFileSync } from 'fs';

function addSpacing(html) {
  // Insere <p></p> entre qualquer par de elementos bloco adjacentes
  return html.replace(
    /<\/(p|h[1-6]|ul|ol|blockquote)>(\s+)<(p|h[1-6]|ul|ol|blockquote)/g,
    (_, closing, space, opening) => `</${closing}>\n\n<p></p>\n\n<${opening}`
  );
}

const files = [
  'content/blog/post-01-identidade-visual-vs-branding.html',
  'content/blog/post-02-diagnostico-marketing-360.html',
  'content/blog/post-03-gestao-redes-sociais-pequenas-empresas-2026.html',
];

for (const file of files) {
  const before = readFileSync(file, 'utf8');
  const after = addSpacing(before);
  const added = (after.match(/<p><\/p>/g) || []).length;
  writeFileSync(file, after);
  console.log(`✓ ${file}  (+${added} separadores)`);
}
