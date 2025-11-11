export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">🚀</span>
          <h1 className="text-2xl font-bold text-gray-900">Plataforma Empreendedores</h1>
        </div>
        <nav className="flex gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
          <a href="/formalizacao" className="text-gray-600 hover:text-gray-900 font-medium">Formalização</a>
          <a href="/presenca-digital" className="text-gray-600 hover:text-gray-900 font-medium">Presença Digital</a>
        </nav>
      </div>
    </header>
  )
}
