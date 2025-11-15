import Link from 'next/link';
import { useState } from 'react';

interface Cliente {
  id: string;
  nome: string;
  cnpj_cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  segmento: string;
  status: 'lead' | 'cliente';
}

export default function CadastroCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState<Omit<Cliente, 'id'>>({
    nome: '',
    cnpj_cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    segmento: '',
    status: 'lead',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome eh obrigatorio';
    if (!formData.cnpj_cpf.trim()) newErrors.cnpj_cpf = 'CNPJ/CPF eh obrigatorio';
    if (!formData.email.includes('@')) newErrors.email = 'Email invalido';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const novoCliente: Cliente = {
      id: Date.now().toString(),
      ...formData,
    };
    setClientes((prev) => [novoCliente, ...prev]);
    setFormData({
      nome: '',
      cnpj_cpf: '',
      email: '',
      telefone: '',
      endereco: '',
      segmento: '',
      status: 'lead',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Cadastro Manual de Cliente</h1>
          <p className="text-gray-600 mt-2">Registre novos clientes para iniciar o fluxo de atendimento</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none ${
                      errors.nome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nome do cliente ou empresa"
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">CNPJ/CPF *</label>
                  <input
                    type="text"
                    name="cnpj_cpf"
                    value={formData.cnpj_cpf}
                    onChange={handleChange}
                    className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none ${
                      errors.cnpj_cpf ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="000.000.000-00"
                  />
                  {errors.cnpj_cpf && <p className="text-red-500 text-sm mt-1">{errors.cnpj_cpf}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email@exemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder="(71) 98888-8888"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Endereco</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder="Rua, numero, bairro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Segmento</label>
                  <select
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  >
                    <option value="">Selecione um segmento</option>
                    <option value="comercio">Comercio</option>
                    <option value="servicos">Servicos</option>
                    <option value="industria">Industria</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="saude">Saude</option>
                    <option value="educacao">Educacao</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  >
                    <option value="lead">Lead</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700"
                >
                  Salvar Cliente
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Clientes Cadastrados</h2>
            {clientes.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum cliente cadastrado ainda</p>
            ) : (
              <ul className="space-y-3">
                {clientes.slice(0, 5).map((cliente) => (
                  <li key={cliente.id} className="text-sm border-l-2 border-blue-500 pl-3">
                    <p className="font-medium text-gray-900">{cliente.nome}</p>
                    <p className="text-gray-600 text-xs">{cliente.email}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                      cliente.status === 'cliente' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cliente.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {clientes.length > 0 && (
              <p className="text-gray-600 text-xs mt-4">Total: {clientes.length} cliente(s)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
