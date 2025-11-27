export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre</h3>
            <p className="text-gray-400">
              Plataforma completa para transformar ideias em negócios de sucesso
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/formalizacao" className="hover:text-white">Formalização</a></li>
              <li><a href="/presenca-digital" className="hover:text-white">Presença Digital</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
<p className="text-gray-400">            Email: contato@plataforma-empreendedores.com</p>
<p className="text-gray-400">              Telefone: +55 71 99401-0014</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Plataforma Empreendedores. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
