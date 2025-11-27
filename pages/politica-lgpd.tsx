'use client';
import { useState } from 'react';

export default function PoliticaLGPD() {
  const [accepted, setAccepted] = useState(false);
  const [companyListingAuthorized, setCompanyListingAuthorized] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Politica de Privacidade e LGPD</h1>
            <p className="text-gray-600">Plataforma Empreendedores - Ultima atualizacao: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. COLETA DE DADOS PESSOAIS</h2>
                <p>A Plataforma Empreendedores coleta dados para criar sua conta:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Identificacao:</strong> Nome, CPF, Email, Telefone</li>
                  <li><strong>Autenticacao:</strong> Senha criptografada</li>
                  <li><strong>Empresariais:</strong> Informacoes sobre seu negocio</li>
                  <li><strong>Tecnicos:</strong> IP, logs de acesso, dados de cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. BASE LEGAL E FINALIDADE</h2>
                <p>Utilizamos seus dados para:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Criar e manter sua conta</li>
                  <li>Permitir acesso aos servicos</li>
                  <li>Processar sua jornada com IA</li>
                  <li>Enviar comunicacoes sobre sua conta</li>
                  <li>Gerar relatorios e documentos</li>
                  <li>Cumprir obrigacoes legais</li>
                  <li>Melhorar a Plataforma</li>
                  <li>Prevenir fraudes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. SEGURANCA E PROTECAO</h2>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Senhas criptografadas com bcrypt</li>
                  <li>Transmissao via HTTPS/TLS</li>
                  <li>Dados sensiveis criptografados</li>
                  <li>Backup automatizado</li>
                  <li>Conformidade com LGPD e GDPR</li>
                  <li>Isolamento de dados por usuario</li>
                  <li>Logs de auditoria completos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. SEUS DIREITOS LGPD</h2>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Acessar:</strong> Solicitar copia de seus dados</li>
                  <li><strong>Corrigir:</strong> Atualizar dados incorretos</li>
                  <li><strong>Deletar:</strong> Direito ao esquecimento</li>
                  <li><strong>Portabilidade:</strong> Receber dados em formato estruturado</li>
                  <li><strong>Revogar:</strong> A qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. COMPARTILHAMENTO DE DADOS</h2>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Processadores:</strong> Supabase, Vercel, Perplexity com DPA</li>
                  <li><strong>Orgaos Publicos:</strong> Quando obrigado por lei</li>
                  <li><strong>Parceiros:</strong> Com seu consentimento explicito</li>
                  <li><strong>NAO VENDEMOS</strong> dados para terceiros</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. RETENCAO DE DADOS</h2>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Durante uso: dados ativos</li>
                  <li>Apos exclusao: deletados em 30 dias</li>
                  <li>Registros legais: mantidos por 2 anos</li>
                  <li>Dados anonimizados: mantidos para analise</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. LISTAGEM DE EMPRESAS NO DIRETORIO</h2>
                <p>A Plataforma oferece opcao de listar sua empresa em Empresas Cadastradas para aumentar visibilidade.</p>
                <p className="mt-3"><strong>Dados compartilhados:</strong> Nome da empresa + Website (somente se autorizado)</p>
                <p className="mt-3"><strong>IMPORTANTE:</strong> Voce controla essa visibilidade via checkbox. Se nao autorizar, sua empresa NAO aparecera no diretorio publico, mas sua conta funcionara normalmente.</p>
                <p className="mt-3"><strong>Revogacao:</strong> Pode revogar essa autorizacao a qualquer momento nas configuracoes.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. CONTATO - DPO</h2>
                <div className="bg-blue-50 p-4 rounded-lg mt-3 space-y-2">
                  <p><strong>Email:</strong> privacidade@plataforma-empreendedores.com</p>
                  <p><strong>Telefone:</strong> (71) 99401-0014</p>
                  <p><strong>Endereco:</strong> Guarulhos, SP, Brasil - AV. EMILIO RIBAS, 1056, SALA 902, CEP 07.020-010</p>
                  <p><strong>Resposta:</strong> Ate 15 dias uteis</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. VAZAMENTO DE DADOS</h2>
                <p>Em caso de vazamento, notificaremos em ate 72 horas conforme LGPD com detalhes do incidente e medidas de remediacao.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. ALTERACOES NESTA POLITICA</h2>
                <p>Podemos atualizar esta politica. Notificaremos mudancas significativas via email com 30 dias de antecedencia.</p>
              </section>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-indigo-600 rounded"
                />
                <span className="text-gray-800">
                  Li, compreendi e <strong>concordo</strong> com a Politica de Privacidade e LGPD
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-4">* Voce deve aceitar esta politica para criar sua conta e utilizar a plataforma.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={companyListingAuthorized}
                  onChange={(e) => setCompanyListingAuthorized(e.target.checked)}
                  className="mt-1 w-5 h-5 text-green-600 rounded"
                />
                <span className="text-gray-800">
                  Autorizo minha empresa a aparecer no diretorio <strong>Empresas Cadastradas</strong> com nome e website
                </span>
              </label>
              <p className="text-sm text-gray-600 mt-4">Opcional: Sua empresa sera exibida publicamente. Voce pode revogar na secao de privacidade.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-6">
        <p className="text-lg font-semibold text-gray-900 mb-4">INFORMACOES DA EMPRESA</p>
        <div className="space-y-2 mb-6 text-gray-700">
          <p><strong>Empresa:</strong> VORCON CONSULTORES ASSOCIADOS LTDA</p>
          <p><strong>CNPJ:</strong> 52.806.620/0001-16</p>
          <p><strong>Socio Unico:</strong> Luiz Carlos Lopes Viana</p>
          <p><strong>Endereco:</strong> Av. Emilio Ribas, 1056, Sala 902, CEP 07.020-010, Guarulhos, SP</p>
        </div>
        <div className="bg-green-50 border-2 border-green-300 p-6 rounded-lg mt-6">
          <p className="text-sm text-gray-700 mb-4">
            <strong>Confirmar Aceite:</strong> Ao clicar em 'Aceitar e Gerar Documento', voce confirma que leu e concorda com toda a Politica de Privacidade e LGPD.
          </p>
        </div>
      </div>
    
    
      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
        >
          ← Voltar
        </button>
        <button
          onClick={() => window.location.href = '/signup'}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          ✓ Aceitar e Continuar
        </button>
      </div></>
  );
}
