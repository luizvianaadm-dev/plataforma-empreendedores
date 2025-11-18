export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">Plataforma Empreendedores</span>
        </div>
        <nav className="flex gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
          <a href="/planeje" className="text-gray-600 hover:text-gray-900 font-medium">Planeje</a>
          <a href="/cadastro-cliente" className="text-gray-600 hover:text-gray-900 font-medium">Cadastrar Cliente</a>
          <a href="/formalizacao" className="text-gray-600 hover:text-gray-900 font-medium">Formalize-se</a>
          <a href="/presenca-digital" className="text-gray-600 hover:text-gray-900 font-medium">Presenca Digital</a>
          <a href="/gestao-operacional" className="text-gray-600 hover:text-gray-900 font-medium">Gestao Operacional</a>
          <a href="/crescimento-expansao" className="text-gray-600 hover:text-gray-900 font-medium">Crescimento & Expansao</a>
        </nav>
                    <a href="/signup" className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ml-4">Criar Conta</a>
      </div>
    </header>
  );
}
