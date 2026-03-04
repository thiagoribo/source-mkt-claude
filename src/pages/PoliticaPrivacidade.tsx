import { Link } from "react-router-dom";
import RevealSection from "@/components/shared/RevealSection";

export default function PoliticaPrivacidade() {
  return (
    <main className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="space-y-4 mb-12">
            <Link
              to="/"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
            >
              ← Início
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
              Política de Privacidade
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
              Última atualização: março de 2026
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="prose prose-neutral max-w-none space-y-8 text-foreground/80 leading-relaxed">

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Quem somos</h2>
              <p>
                A <strong>SM Agency</strong> (CNPJ: 49.800.040/0001-07) é responsável pelo
                tratamento dos seus dados pessoais coletados neste site. Em caso de dúvidas,
                entre em contato pelo e-mail{" "}
                <a
                  href="mailto:contato@sourcemkt.com.br"
                  className="text-primary underline underline-offset-4"
                >
                  contato@sourcemkt.com.br
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Dados coletados</h2>
              <p>Coletamos apenas os dados que você fornece voluntariamente por meio dos formulários deste site:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de WhatsApp</li>
                <li>Informações sobre seu projeto ou negócio (campo de mensagem)</li>
              </ul>
              <p>
                Não coletamos dados de pagamento, documentos pessoais ou informações sensíveis.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Finalidade do tratamento</h2>
              <p>Seus dados são usados exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Responder à sua solicitação de diagnóstico ou proposta</li>
                <li>Entrar em contato via WhatsApp ou e-mail para seguimento comercial</li>
                <li>Identificar o serviço de interesse para personalizar o atendimento</li>
              </ul>
              <p>Não utilizamos seus dados para fins de marketing não solicitado.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Compartilhamento de dados</h2>
              <p>
                Seus dados não são vendidos nem compartilhados com terceiros para fins
                comerciais. Utilizamos a plataforma <strong>Supabase</strong> para armazenamento
                seguro dos dados de formulário, com servidores localizados nos EUA e sujeitos
                às políticas de privacidade do provedor.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Seus direitos (LGPD)</h2>
              <p>
                Nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem
                direito a:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar os dados que temos sobre você</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, envie um e-mail para{" "}
                <a
                  href="mailto:contato@sourcemkt.com.br"
                  className="text-primary underline underline-offset-4"
                >
                  contato@sourcemkt.com.br
                </a>{" "}
                com o assunto "LGPD".
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
              <p>
                Este site pode utilizar cookies técnicos e de análise (Google Tag Manager /
                Analytics) para medir o desempenho das páginas. Nenhum cookie é usado para
                rastreamento publicitário individualizado.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Retenção de dados</h2>
              <p>
                Mantemos seus dados enquanto houver interesse legítimo de negócio ou até
                que você solicite a exclusão. Após o encerramento do relacionamento comercial,
                os dados são deletados ou anonimizados em até 90 dias.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Contato</h2>
              <p>
                Dúvidas sobre esta política? Fale conosco:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li>
                  <strong>E-mail:</strong>{" "}
                  <a
                    href="mailto:contato@sourcemkt.com.br"
                    className="text-primary underline underline-offset-4"
                  >
                    contato@sourcemkt.com.br
                  </a>
                </li>
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/5511937292921"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    (11) 93729-2921
                  </a>
                </li>
              </ul>
            </section>

          </div>
        </RevealSection>
      </div>
    </main>
  );
}
