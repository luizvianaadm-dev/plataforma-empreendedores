'use client';

import { useState } from 'react';

export default function PoliticaLGPD() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Política de Privacidade e LGPD
          </h1>
          <p className="text-gray-600">
            Plataforma Empreendedores - Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            {/* Seção 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. COLETA DE DADOS</h2>
              <p>
                A Plataforma Empreendedores coleta os seguintes dados pessoais para criar sua conta e possibilitar o acesso aos serviços:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Dados de Identificação:</strong> Nome completo, CPF, Email e Telefone</li>
                <li><strong>Dados de Autenticação:</strong> Senha criptografada</li>
                <li><strong>Dados Empresariais:</strong> Informações sobre seu negócio coletadas durante a jornada</li>
                <li><strong>Dados Técnicos:</strong> Endereço IP, user agent do navegador, logs de acesso</li>
              </ul>
            </section>

            {/* Seção 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. FINALIDADE DA COLETA</h2>
              <p>Coletamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Criar e manter sua conta na plataforma</li>
                <li>Permitir acesso aos serviços de planejamento, formalização e gestão empresarial</li>
                <li>Processar sua jornada de empreendedor com auxílio de IA</li>
                <li>Enviar comunicações sobre sua conta e serviços</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Melhorar nossos serviços (análises agrupadas e anonimizadas)</li>
              </ul>
            </section>

            {/* Seção 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. SEGURANÇA DOS DADOS</h2>
              <p>
                Seus dados são armazenados no Supabase com as seguintes medidas de segurança:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Senhas são criptografadas com bcrypt (não temos acesso)</li>
                <li>Transmissão de dados via HTTPS (criptografia em trânsito)</li>
                <li>Backup automatizado dos dados</li>
                <li>Controle de acesso baseado em permissões</li>
                <li>Conformidade com LGPD e padrões internacionais</li>
              </ul>
            </section>

            {/* Seção 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. SEUS DIREITOS</h2>
              <p>De acordo com a LGPD, você tem o direito de:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Acessar:</strong> Solicitar cópia de todos os seus dados</li>
                <li><strong>Corrigir:</strong> Atualizar dados incompletos ou incorretos</li>
                <li><strong>Deletar:</strong> Solicitar exclusão de seus dados (direito ao esquecimento)</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato portável</li>
                <li><strong>Revogar consentimento:</strong> A qualquer momento</li>
              </ul>
            </section>

            {/* Seção 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. COMPARTILHAMENTO DE DADOS</h2>
              <p>
                Seus dados podem ser compartilhados apenas com:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Prestadores de Serviços:</strong> Supabase (banco de dados), IA para análises</li>
                <li><strong>Órgãos Públicos:</strong> Quando obrigado por lei (Receita Federal, Justiça)</li>
                <li><strong>Parceiros:</strong> SEBRAE e outras instituições quando você consentir explicitamente</li>
                <li>Não vendemos seus dados para terceiros</li>
              </ul>
            </section>

            {/* Seção 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. RETENÇÃO DE DADOS</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Enquanto usa a plataforma:</strong> Mantemos todos os seus dados</li>
                <li><strong>Após exclusão da conta:</strong> Deletamos dados pessoais em 30 dias</li>
                <li><strong>Registros legais:</strong> Mantemos logs de auditoria por 2 anos (obrigação legal)</li>
              </ul>
            </section>

            {/* Seção 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. CONTATO - DPO (Data Protection Officer)</h2>
              <p>Para exercer seus direitos ou relatar préõcupações sobre privacidade:</p>
              <div className="bg-blue-50 p-4 rounded-lg mt-3 space-y-2">
                <p><strong>Email:</strong> privacidade@plataforma-empreendedores.com</p>
                <p><strong>Telefone:</strong> (71) 3000-0000</p>
                <p><strong>Endereço:</strong> Salvador, BA, Brasil</p>
              </div>
            </section>

            {/* Seção 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. NOTIFICAÇÃO DE VAZAMENTO</h2>
              <p>
                Em caso de vazamento de dados, notificaremos todos os afetados em até 72 horas, conforme exigido pela LGPD.
              </p>
            </section>
          </div>
        </div>

        {/* Caixa de Aceite */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-800">
              Li, compreendi e <strong>concordo</strong> com a Política de Privacidade e LGPD
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-4">
            * Você deve aceitar esta política para criar sua conta e utilizar a plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}
