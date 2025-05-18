// Dados mockados para o sistema de gestão de condomínio

export const mockData = {
  // Usuários do sistema
  usuarios: [
    {
      id: "1",
      nome: "João Silva",
      email: "sindico@exemplo.com",
      senha: "123456",
      perfil: "sindico",
      apartamento: null,
      telefone: "(11) 98765-4321",
      createdAt: "2023-01-01T00:00:00Z",
    },
    {
      id: "2",
      nome: "Maria Souza",
      email: "maria@exemplo.com",
      senha: "123456",
      perfil: "morador",
      apartamento: "101",
      telefone: "(11) 91234-5678",
      createdAt: "2023-01-02T00:00:00Z",
    },
    {
      id: "3",
      nome: "Pedro Santos",
      email: "pedro@exemplo.com",
      senha: "123456",
      perfil: "morador",
      apartamento: "102",
      telefone: "(11) 92345-6789",
      createdAt: "2023-01-03T00:00:00Z",
    },
  ],

  // Chamados/tickets
  chamados: [
    {
      id: "1",
      titulo: "Vazamento no banheiro",
      descricao: "Há um vazamento no banheiro do apartamento 101 que está afetando o apartamento de baixo.",
      status: "aberto",
      prioridade: "alta",
      categoria: "hidraulica",
      solicitante: "2",
      responsavel: "1",
      createdAt: "2023-05-10T14:30:00Z",
      updatedAt: "2023-05-10T14:30:00Z",
      comentarios: [
        {
          id: "1",
          chamadoId: "1",
          usuarioId: "1",
          texto: "Vou verificar o problema hoje à tarde.",
          createdAt: "2023-05-10T15:00:00Z",
        },
        {
          id: "2",
          chamadoId: "1",
          usuarioId: "2",
          texto: "Obrigado pela atenção.",
          createdAt: "2023-05-10T15:05:00Z",
        },
      ],
    },
    {
      id: "2",
      titulo: "Lâmpada queimada no corredor",
      descricao: "A lâmpada do corredor do 10º andar está queimada.",
      status: "em_andamento",
      prioridade: "media",
      categoria: "eletrica",
      solicitante: "3",
      responsavel: "1",
      createdAt: "2023-05-11T09:15:00Z",
      updatedAt: "2023-05-11T10:30:00Z",
      comentarios: [
        {
          id: "3",
          chamadoId: "2",
          usuarioId: "1",
          texto: "Já solicitei a compra de novas lâmpadas.",
          createdAt: "2023-05-11T10:30:00Z",
        },
      ],
    },
    {
      id: "3",
      titulo: "Barulho excessivo no apartamento 103",
      descricao: "O morador do apartamento 103 está fazendo muito barulho após as 22h.",
      status: "fechado",
      prioridade: "baixa",
      categoria: "convivencia",
      solicitante: "2",
      responsavel: "1",
      createdAt: "2023-05-05T23:10:00Z",
      updatedAt: "2023-05-07T14:20:00Z",
      comentarios: [
        {
          id: "4",
          chamadoId: "3",
          usuarioId: "1",
          texto: "Conversei com o morador e ele se comprometeu a reduzir o barulho.",
          createdAt: "2023-05-06T10:00:00Z",
        },
        {
          id: "5",
          chamadoId: "3",
          usuarioId: "2",
          texto: "O problema foi resolvido. Obrigado!",
          createdAt: "2023-05-07T14:20:00Z",
        },
      ],
    },
  ],

  // Gastos do condomínio
  gastos: [
    {
      id: "1",
      descricao: "Manutenção do elevador",
      valor: 1500.0,
      data: "2023-04-15T00:00:00Z",
      categoria: "manutencao",
      comprovante: "/placeholder-pcrgg.png",
      responsavel: "1",
      createdAt: "2023-04-15T14:30:00Z",
      updatedAt: "2023-04-15T14:30:00Z",
    },
    {
      id: "2",
      descricao: "Conta de água - Abril/2023",
      valor: 2300.5,
      data: "2023-04-20T00:00:00Z",
      categoria: "contas",
      comprovante: "/placeholder-pzonp.png",
      responsavel: "1",
      createdAt: "2023-04-20T10:15:00Z",
      updatedAt: "2023-04-20T10:15:00Z",
    },
    {
      id: "3",
      descricao: "Conta de luz - Abril/2023",
      valor: 1800.75,
      data: "2023-04-22T00:00:00Z",
      categoria: "contas",
      comprovante: "/placeholder-4mlwd.png",
      responsavel: "1",
      createdAt: "2023-04-22T11:30:00Z",
      updatedAt: "2023-04-22T11:30:00Z",
    },
    {
      id: "4",
      descricao: "Serviço de limpeza - Abril/2023",
      valor: 3500.0,
      data: "2023-04-30T00:00:00Z",
      categoria: "servicos",
      comprovante: "/placeholder-wznij.png",
      responsavel: "1",
      createdAt: "2023-04-30T16:45:00Z",
      updatedAt: "2023-04-30T16:45:00Z",
    },
  ],

  // Moradores do condomínio
  moradores: [
    {
      id: "2",
      nome: "Maria Souza",
      email: "maria@exemplo.com",
      apartamento: "101",
      telefone: "(11) 91234-5678",
      createdAt: "2023-01-02T00:00:00Z",
    },
    {
      id: "3",
      nome: "Pedro Santos",
      email: "pedro@exemplo.com",
      apartamento: "102",
      telefone: "(11) 92345-6789",
      createdAt: "2023-01-03T00:00:00Z",
    },
    {
      id: "4",
      nome: "Ana Oliveira",
      email: "ana@exemplo.com",
      apartamento: "103",
      telefone: "(11) 93456-7890",
      createdAt: "2023-01-04T00:00:00Z",
    },
    {
      id: "5",
      nome: "Carlos Pereira",
      email: "carlos@exemplo.com",
      apartamento: "201",
      telefone: "(11) 94567-8901",
      createdAt: "2023-01-05T00:00:00Z",
    },
    {
      id: "6",
      nome: "Fernanda Lima",
      email: "fernanda@exemplo.com",
      apartamento: "202",
      telefone: "(11) 95678-9012",
      createdAt: "2023-01-06T00:00:00Z",
    },
  ],

  // Dados para o dashboard
  dashboard: {
    chamados: {
      total: 3,
      abertos: 1,
      emAndamento: 1,
      fechados: 1,
      porCategoria: {
        hidraulica: 1,
        eletrica: 1,
        convivencia: 1,
      },
      recentes: [
        {
          id: "1",
          titulo: "Vazamento no banheiro",
          status: "aberto",
          createdAt: "2023-05-10T14:30:00Z",
        },
        {
          id: "2",
          titulo: "Lâmpada queimada no corredor",
          status: "em_andamento",
          createdAt: "2023-05-11T09:15:00Z",
        },
      ],
    },
    gastos: {
      total: 9100.25,
      porCategoria: {
        manutencao: 1500.0,
        contas: 4100.25,
        servicos: 3500.0,
      },
      recentes: [
        {
          id: "4",
          descricao: "Serviço de limpeza - Abril/2023",
          valor: 3500.0,
          data: "2023-04-30T00:00:00Z",
        },
        {
          id: "3",
          descricao: "Conta de luz - Abril/2023",
          valor: 1800.75,
          data: "2023-04-22T00:00:00Z",
        },
      ],
    },
    moradores: {
      total: 5,
    },
  },
}

// Export the mock users data
export const mockUsers = mockData.usuarios

// Export the mock chamados data
export const mockChamadosData = mockData.chamados

// Export the mock gastos recentes data
export const mockGastosRecentes = mockData.dashboard.gastos.recentes

// Export the mock chamados recentes data
export const mockChamadosRecentes = mockData.dashboard.chamados.recentes
