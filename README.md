# Documentação Técnica: Frontend do Sistema CondoIA

## Índice

1. [Visão Geral do Frontend do CondoIA](#1-visão-geral-do-frontend-do-condoia)
2. [Tecnologias Utilizadas no Frontend do CondoIA](#2-tecnologias-utilizadas-no-frontend-do-condoia)
3. [Configuração e Execução do Frontend do CondoIA](#3-configuração-e-execução-do-frontend-do-condoia)
4. [Arquitetura e Estrutura de Pastas do Frontend do CondoIA](#4-arquitetura-e-estrutura-de-pastas-do-frontend-do-condoia)
5. [Entidades e Relacionamentos de Dados no Frontend do CondoIA](#5-entidades-e-relacionamentos-de-dados-no-frontend-do-condoia)
6. [Rotas e Navegação no Frontend do CondoIA](#6-rotas-e-navegação-no-frontend-do-condoia)
7. [Interação com a Interface do Usuário do CondoIA](#7-interação-com-a-interface-do-usuário-do-condoia)
8. [Comunicação com o Backend (APIs do CondoIA)](#8-comunicação-com-o-backend-apis-do-condoia)
9. [Considerações de Estado Global no Frontend do CondoIA](#9-considerações-de-estado-global-no-frontend-do-condoia)
10. [Testes do Frontend do CondoIA](#10-testes-do-frontend-do-condoia)

## 1. Visão Geral do Frontend do CondoIA

### Propósito
O CondoIA é um sistema de gestão de condomínios desenvolvido para facilitar a administração e comunicação entre moradores, síndicos e administradores de condomínios. O frontend do CondoIA serve como a interface principal através da qual os usuários interagem com o sistema, oferecendo uma experiência intuitiva e responsiva para todas as operações relacionadas à gestão condominial.

### Versão Atual
Versão: 1.0.0

### Principais Funcionalidades

O frontend do CondoIA oferece as seguintes funcionalidades principais:

- **Painel de Controle (Dashboard)**: Visão geral das informações mais relevantes, incluindo chamados recentes, gastos e indicadores de desempenho.
- **Gestão de Chamados**: Sistema completo para registro, acompanhamento e resolução de chamados técnicos e ocorrências no condomínio.
- **Controle de Gastos**: Ferramentas para registro, categorização e análise de despesas do condomínio.
- **Gestão de Moradores**: Cadastro e administração de informações dos residentes.
- **Sistema de Reservas**: Agendamento e gerenciamento de reservas para áreas comuns.
- **Comunicados e Avisos**: Publicação e distribuição de comunicados importantes para os moradores.
- **Relatórios**: Geração de relatórios personalizados sobre diversos aspectos da gestão condominial.
- **Configurações do Sistema**: Personalização de parâmetros e preferências do sistema.
- **Perfil de Usuário**: Gerenciamento de informações pessoais e preferências de conta.

O sistema foi projetado com foco na usabilidade, acessibilidade e responsividade, garantindo uma experiência consistente em diferentes dispositivos, desde desktops até smartphones.

## 2. Tecnologias Utilizadas no Frontend do CondoIA

### Linguagens de Programação

- **TypeScript** (v5.x)
  - Linguagem principal do projeto, oferecendo tipagem estática para JavaScript
  - Utilizada em todos os componentes, serviços e utilitários do sistema
  - [Documentação oficial](https://www.typescriptlang.org/docs/)

### Framework Principal

- **Next.js** (v14.0.3)
  - Framework React com renderização do lado do servidor (SSR) e geração estática (SSG)
  - Utilizado para estruturar a aplicação, gerenciar rotas e otimizar o carregamento
  - Implementa o App Router para navegação entre páginas
  - [Documentação oficial](https://nextjs.org/docs)

### Bibliotecas de UI e Estilização

- **React** (v18.2.0)
  - Biblioteca para construção de interfaces de usuário
  - Base para todos os componentes do frontend
  - [Documentação oficial](https://reactjs.org/docs/getting-started.html)

- **Tailwind CSS** (v3.3.0)
  - Framework CSS utilitário para estilização rápida e consistente
  - Utilizado em toda a interface do usuário
  - [Documentação oficial](https://tailwindcss.com/docs)

- **Radix UI** (várias versões)
  - Biblioteca de componentes primitivos acessíveis e sem estilo
  - Utilizada como base para componentes complexos como modais, dropdowns e tooltips
  - [Documentação oficial](https://www.radix-ui.com/docs/primitives/overview/introduction)

- **Lucide React** (v0.292.0)
  - Biblioteca de ícones SVG para React
  - Utilizada para todos os ícones do sistema
  - [Documentação oficial](https://lucide.dev/docs/lucide-react)

- **class-variance-authority** (v0.7.0)
  - Biblioteca para criar variantes de componentes com classes condicionais
  - Utilizada para criar componentes com diferentes estados e aparências
  - [Documentação oficial](https://cva.style/docs)

- **clsx** (v2.0.0) e **tailwind-merge** (v2.0.0)
  - Utilitários para manipulação de classes CSS
  - Utilizados para combinar classes condicionalmente
  - [Documentação clsx](https://github.com/lukeed/clsx)
  - [Documentação tailwind-merge](https://github.com/dcastil/tailwind-merge)

### Gerenciamento de Estado e Dados

- **React Context API**
  - API nativa do React para gerenciamento de estado global
  - Utilizada para gerenciar estados como autenticação, tema e notificações
  - Implementada em contextos como `AuthContext`, `SidebarContext` e `NotificationContext`

- **React Hook Form** (v7.48.2)
  - Biblioteca para gerenciamento de formulários em React
  - Utilizada em todos os formulários do sistema para validação e manipulação de dados
  - [Documentação oficial](https://react-hook-form.com/get-started)

- **Zod** (v3.22.4)
  - Biblioteca de validação de esquemas TypeScript
  - Utilizada para validação de dados de formulários e respostas de API
  - [Documentação oficial](https://github.com/colinhacks/zod)

- **TanStack React Query** (v4.36.1)
  - Biblioteca para gerenciamento de estado do servidor, caching e sincronização
  - Utilizada para buscar, armazenar em cache e atualizar dados do servidor
  - [Documentação oficial](https://tanstack.com/query/latest/docs/react/overview)

### Visualização de Dados

- **Chart.js** (v4.4.0) e **React-Chartjs-2** (v5.2.0)
  - Bibliotecas para criação de gráficos interativos
  - Utilizadas para visualização de dados em dashboards e relatórios
  - [Documentação Chart.js](https://www.chartjs.org/docs/latest/)
  - [Documentação React-Chartjs-2](https://react-chartjs-2.js.org/)

- **TanStack Table** (v8.10.7)
  - Biblioteca para criação de tabelas de dados avançadas
  - Utilizada para exibição de dados tabulares com recursos de ordenação, filtragem e paginação
  - [Documentação oficial](https://tanstack.com/table/v8/docs/guide/introduction)

### Utilitários e Ferramentas

- **Axios** (v1.6.2)
  - Cliente HTTP baseado em Promises para navegador e Node.js
  - Utilizado para comunicação com APIs do backend
  - [Documentação oficial](https://axios-http.com/docs/intro)

- **date-fns** (v2.30.0)
  - Biblioteca para manipulação de datas em JavaScript
  - Utilizada para formatação e cálculos com datas em todo o sistema
  - [Documentação oficial](https://date-fns.org/docs/Getting-Started)

- **next-themes** (v0.2.1)
  - Biblioteca para gerenciamento de temas em aplicações Next.js
  - Utilizada para implementar o modo claro/escuro
  - [Documentação oficial](https://github.com/pacocoursey/next-themes)

- **js-cookie** (v3.0.5)
  - Biblioteca para manipulação de cookies no navegador
  - Utilizada para armazenamento de tokens de autenticação
  - [Documentação oficial](https://github.com/js-cookie/js-cookie)

### Ferramentas de Desenvolvimento

- **ESLint** (v8.x)
  - Ferramenta de linting para identificar e reportar padrões problemáticos no código
  - Configurada com regras específicas para o projeto
  - [Documentação oficial](https://eslint.org/docs/user-guide/getting-started)

- **TypeScript** (v5.x)
  - Além de linguagem de programação, serve como ferramenta de verificação de tipos
  - Configurada para garantir a integridade dos tipos em todo o projeto
  - [Documentação oficial](https://www.typescriptlang.org/docs/)

- **Autoprefixer** (v10.0.1) e **PostCSS** (v8.x)
  - Ferramentas para processamento de CSS
  - Utilizadas para adicionar prefixos de navegador e outras transformações CSS
  - [Documentação Autoprefixer](https://github.com/postcss/autoprefixer)
  - [Documentação PostCSS](https://postcss.org/)

## 3. Configuração e Execução do Frontend do CondoIA

### Pré-requisitos

Para configurar e executar o frontend do CondoIA localmente, você precisará ter instalado:

- **Node.js** (versão 18.x ou superior recomendada)
- **npm** (versão 8.x ou superior) ou **yarn** (versão 1.22.x ou superior)
- **Git** para clonar o repositório

### Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**

```bash
git clone https://github.com/sua-organizacao/condoia-frontend.git
cd condoia-frontend

2. **Instale as dependências:**


Com npm:

```shellscript
npm install
```

Com yarn:

```shellscript
yarn install
```

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_USE_MOCKS=true
```

Descrição das variáveis:
- `NEXT_PUBLIC_API_URL`: URL base da API do backend do CondoIA
- `NEXT_PUBLIC_USE_MOCKS`: Define se o sistema deve usar dados mockados (true) ou se comunicar com a API real (false)


### Execução em Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

Com npm:

```shellscript
npm run dev
```

Com yarn:

```shellscript
yarn dev
```

O servidor de desenvolvimento será iniciado e estará disponível em `http://localhost:3000`.

### Construção para Produção

Para construir a aplicação para produção:

Com npm:

```shellscript
npm run build
```

Com yarn:

```shellscript
yarn build
```

Para iniciar a aplicação em modo de produção após a construção:

Com npm:

```shellscript
npm start
```

Com yarn:

```shellscript
yarn start
```

### Scripts Disponíveis

O projeto inclui os seguintes scripts npm/yarn:

- `dev`: Inicia o servidor de desenvolvimento
- `build`: Constrói a aplicação para produção
- `start`: Inicia a aplicação em modo de produção
- `lint`: Executa o linter para verificar problemas no código


## 4. Arquitetura e Estrutura de Pastas do Frontend do CondoIA

### Arquitetura Geral

O frontend do CondoIA segue uma arquitetura baseada em componentes, utilizando o padrão de arquitetura do Next.js com o App Router. A aplicação é estruturada em torno de:

- **Componentes**: Unidades reutilizáveis de interface do usuário
- **Páginas**: Componentes que representam rotas específicas da aplicação
- **Layouts**: Componentes que definem a estrutura visual compartilhada entre páginas
- **Hooks**: Funções personalizadas para lógica reutilizável
- **Contextos**: Gerenciadores de estado global
- **Serviços**: Funções para comunicação com APIs e processamento de dados
- **Utilitários**: Funções auxiliares para tarefas comuns


### Estrutura de Pastas

```plaintext
condoia-frontend/
├── app/                    # Diretório principal do App Router do Next.js
│   ├── (auth)/             # Grupo de rotas relacionadas à autenticação
│   │   ├── login/          # Página de login
│   │   └── layout.tsx      # Layout compartilhado para rotas de autenticação
│   ├── (dashboard)/        # Grupo de rotas do painel administrativo
│   │   ├── home/           # Página inicial do dashboard
│   │   ├── chamados/       # Páginas de gestão de chamados
│   │   ├── gastos/         # Páginas de gestão de gastos
│   │   ├── moradores/      # Páginas de gestão de moradores
│   │   ├── reservas/       # Páginas de gestão de reservas
│   │   ├── avisos/         # Páginas de gestão de avisos
│   │   ├── relatorios/     # Páginas de relatórios
│   │   ├── configuracoes/  # Páginas de configurações
│   │   ├── perfil/         # Página de perfil do usuário
│   │   └── layout.tsx      # Layout compartilhado para rotas do dashboard
│   ├── acesso-negado/      # Página de acesso negado
│   ├── layout.tsx          # Layout raiz da aplicação
│   ├── page.tsx            # Página inicial (landing page)
│   └── globals.css         # Estilos globais
├── components/             # Componentes reutilizáveis
│   ├── dashboard/          # Componentes específicos do dashboard
│   │   ├── charts.tsx      # Componentes de gráficos
│   │   ├── header.tsx      # Cabeçalho do dashboard
│   │   ├── sidebar.tsx     # Barra lateral do dashboard
│   │   ├── recent-tickets.tsx # Lista de chamados recentes
│   │   └── recent-expenses.tsx # Lista de gastos recentes
│   ├── ui/                 # Componentes de interface do usuário genéricos
│   │   ├── button.tsx      # Componente de botão
│   │   ├── card.tsx        # Componente de card
│   │   ├── form-field.tsx  # Componente de campo de formulário
│   │   ├── loading-indicator.tsx # Indicador de carregamento
│   │   ├── error-state.tsx # Componente de estado de erro
│   │   └── ...             # Outros componentes UI
│   ├── tickets-table.tsx   # Tabela de chamados
│   ├── expenses-table.tsx  # Tabela de gastos
│   ├── users-table.tsx     # Tabela de usuários
│   ├── action-button.tsx   # Botão de ação
│   ├── error-boundary.tsx  # Componente para captura de erros
│   ├── global-error-handler.tsx # Manipulador global de erros
│   └── ...                 # Outros componentes
├── contexts/               # Contextos React para gerenciamento de estado
│   ├── auth-context.tsx    # Contexto de autenticação
│   ├── sidebar-context.tsx # Contexto da barra lateral
│   └── notification-context.tsx # Contexto de notificações
├── hooks/                  # Hooks personalizados
│   ├── use-mobile.ts       # Hook para detecção de dispositivos móveis
│   ├── use-api-error.ts    # Hook para tratamento de erros de API
│   ├── use-data-request.ts # Hook para requisições de dados
│   └── ...                 # Outros hooks
├── lib/                    # Bibliotecas e utilitários
│   ├── api-client.ts       # Cliente de API
│   ├── auth.ts             # Funções de autenticação
│   ├── utils.ts            # Funções utilitárias
│   ├── validation.ts       # Funções de validação
│   ├── mock-data.ts        # Dados mockados para desenvolvimento
│   └── ...                 # Outros utilitários
├── public/                 # Arquivos estáticos
│   ├── images/             # Imagens
│   └── ...                 # Outros arquivos estáticos
├── tests/                  # Testes
│   ├── e2e/                # Testes end-to-end
│   └── ...                 # Outros testes
├── middleware.ts           # Middleware do Next.js para autenticação
├── next.config.js          # Configuração do Next.js
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

### Padrões de Projeto
O frontend do CondoIA utiliza os seguintes padrões de projeto:

#### 1. Componentes Client e Server

O sistema utiliza a separação entre componentes client e server do Next.js:

- **Server Components**: Componentes renderizados no servidor, utilizados para busca de dados e operações que não requerem interatividade do cliente.
- **Client Components**: Componentes que utilizam hooks e estado, marcados com a diretiva `'use client'` no topo do arquivo.

Exemplo de Server Component:

```typescriptreact
// app/(dashboard)/chamados/page.tsx
import { ChamadosClient } from './chamados-client'
import { apiClient } from '@/lib/api-client'

export default async function ChamadosPage() {
  const chamados = await apiClient.get('/chamados')
  return <ChamadosClient initialData={chamados} />
}
```

Exemplo de Client Component:

```typescriptreact
// app/(dashboard)/chamados/chamados-client.tsx
'use client'

import { useState } from 'react'
import { ChamadosTable } from '@/components/tickets-table'

export function ChamadosClient({ initialData }) {
  const [filteredData, setFilteredData] = useState(initialData)
  
  // Lógica de interatividade do cliente
  
  return <ChamadosTable data={filteredData} />
}
```

#### 2. Hooks Personalizados

O sistema utiliza hooks personalizados para encapsular lógica reutilizável:

- **useMobile**: Hook para detectar se o dispositivo é móvel
- **useApiError**: Hook para tratamento padronizado de erros de API
- **useDataRequest**: Hook para busca de dados com estados de carregamento e erro
- **useCrudOperations**: Hook para operações CRUD padronizadas


Exemplo:

```typescriptreact
// hooks/use-data-request.ts
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'

export function useDataRequest<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await apiClient.get<T>(endpoint)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}
```

#### 3. Context API para Estado Global

O sistema utiliza a Context API do React para gerenciar estados globais:

- **AuthContext**: Gerencia o estado de autenticação do usuário
- **SidebarContext**: Gerencia o estado da barra lateral (aberta/fechada)
- **NotificationContext**: Gerencia notificações do sistema


Exemplo:

```typescriptreact
// contexts/auth-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Implementação do contexto

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

#### 4. Componentes de Layout

O sistema utiliza componentes de layout para definir estruturas visuais compartilhadas:

- **RootLayout**: Layout raiz da aplicação
- **DashboardLayout**: Layout para páginas do dashboard
- **AuthLayout**: Layout para páginas de autenticação


Exemplo:

```typescriptreact
// app/(dashboard)/layout.tsx
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardSidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
```

## 5. Entidades e Relacionamentos de Dados no Frontend do CondoIA

### Principais Entidades

#### 1. Usuário (User)

**Descrição**: Representa uma conta de acesso ao sistema CondoIA.

**Atributos Principais**:

- `id`: string - Identificador único do usuário
- `nome`: string - Nome completo do usuário
- `email`: string - Endereço de e-mail (usado para login)
- `perfil`: string - Nível de acesso ('admin', 'sindico', 'morador')
- `avatar`: string (opcional) - URL da imagem de perfil


**Relacionamentos**:

- Um `Usuário` pode estar associado a um `Morador` (se for um morador do condomínio)
- Um `Usuário` pode criar múltiplos `Chamados`
- Um `Usuário` pode registrar múltiplos `Gastos`


**Obtenção de Dados**: Via `AuthContext` após autenticação ou através de chamadas à API `/usuarios`.

#### 2. Morador (Resident)

**Descrição**: Representa um residente do condomínio.

**Atributos Principais**:

- `id`: string - Identificador único do morador
- `nome`: string - Nome completo do morador
- `email`: string - Endereço de e-mail
- `telefone`: string - Número de telefone
- `unidadeId`: string - ID da unidade habitacional
- `unidade`: string - Identificação da unidade (ex: "Bloco A, Apto 101")
- `dataCadastro`: string - Data de cadastro no sistema
- `status`: string - Status do morador ('ativo', 'inativo')


**Relacionamentos**:

- Um `Morador` está associado a uma `Unidade`
- Um `Morador` pode ter uma conta de `Usuário` associada
- Um `Morador` pode criar múltiplos `Chamados`
- Um `Morador` pode fazer múltiplas `Reservas`


**Obtenção de Dados**: Através de chamadas à API `/moradores`.

#### 3. Unidade (Unit)

**Descrição**: Representa um apartamento ou casa no condomínio.

**Atributos Principais**:

- `id`: string - Identificador único da unidade
- `identificacao`: string - Identificação da unidade (ex: "Bloco A, Apto 101")
- `bloco`: string - Bloco ou edifício
- `numero`: string - Número do apartamento
- `proprietarioId`: string (opcional) - ID do proprietário
- `status`: string - Status da unidade ('ocupada', 'vazia')


**Relacionamentos**:

- Uma `Unidade` pode ter múltiplos `Moradores`
- Uma `Unidade` pode ter múltiplos `Chamados` associados


**Obtenção de Dados**: Através de chamadas à API `/unidades`.

#### 4. Chamado (Ticket)

**Descrição**: Representa uma solicitação, reclamação ou ocorrência registrada no sistema.

**Atributos Principais**:

- `id`: string - Identificador único do chamado
- `titulo`: string - Título do chamado
- `descricao`: string - Descrição detalhada
- `status`: string - Status atual ('aberto', 'em_andamento', 'resolvido', 'cancelado')
- `prioridade`: string - Nível de prioridade ('baixa', 'media', 'alta', 'urgente')
- `categoria`: string - Categoria do chamado (ex: 'manutencao', 'seguranca', 'limpeza')
- `dataCriacao`: string - Data de criação
- `dataAtualizacao`: string - Data da última atualização
- `criadorId`: string - ID do usuário que criou o chamado
- `responsavelId`: string (opcional) - ID do usuário responsável pela resolução
- `unidadeId`: string (opcional) - ID da unidade relacionada


**Relacionamentos**:

- Um `Chamado` é criado por um `Usuário`
- Um `Chamado` pode ser atribuído a um `Usuário` responsável
- Um `Chamado` pode estar associado a uma `Unidade`


**Obtenção de Dados**: Através de chamadas à API `/chamados`.

#### 5. Gasto (Expense)

**Descrição**: Representa uma despesa do condomínio.

**Atributos Principais**:

- `id`: string - Identificador único do gasto
- `descricao`: string - Descrição do gasto
- `valor`: number - Valor em reais
- `categoria`: string - Categoria do gasto (ex: 'manutencao', 'limpeza', 'seguranca')
- `dataRegistro`: string - Data de registro
- `dataPagamento`: string (opcional) - Data de pagamento
- `status`: string - Status do pagamento ('pendente', 'pago', 'cancelado')
- `registradoPorId`: string - ID do usuário que registrou o gasto
- `comprovante`: string (opcional) - URL do comprovante de pagamento


**Relacionamentos**:

- Um `Gasto` é registrado por um `Usuário`


**Obtenção de Dados**: Através de chamadas à API `/gastos`.

#### 6. Aviso (Notice)

**Descrição**: Representa um comunicado ou aviso para os moradores.

**Atributos Principais**:

- `id`: string - Identificador único do aviso
- `titulo`: string - Título do aviso
- `conteudo`: string - Conteúdo do aviso
- `dataPublicacao`: string - Data de publicação
- `autorId`: string - ID do usuário que publicou o aviso
- `importante`: boolean - Indica se o aviso é marcado como importante
- `anexo`: string (opcional) - URL de um arquivo anexado


**Relacionamentos**:

- Um `Aviso` é publicado por um `Usuário`


**Obtenção de Dados**: Através de chamadas à API `/avisos`.

#### 7. Reserva (Reservation)

**Descrição**: Representa uma reserva de área comum do condomínio.

**Atributos Principais**:

- `id`: string - Identificador único da reserva
- `areaComumId`: string - ID da área comum reservada
- `areaComum`: string - Nome da área comum (ex: "Salão de Festas")
- `moradorId`: string - ID do morador que fez a reserva
- `dataInicio`: string - Data e hora de início da reserva
- `dataFim`: string - Data e hora de término da reserva
- `status`: string - Status da reserva ('pendente', 'confirmada', 'cancelada')
- `observacoes`: string (opcional) - Observações adicionais


**Relacionamentos**:

- Uma `Reserva` é feita por um `Morador`
- Uma `Reserva` está associada a uma `ÁreaComum`


**Obtenção de Dados**: Através de chamadas à API `/reservas`.

#### 8. ÁreaComum (CommonArea)

**Descrição**: Representa uma área de uso comum no condomínio que pode ser reservada.

**Atributos Principais**:

- `id`: string - Identificador único da área comum
- `nome`: string - Nome da área (ex: "Salão de Festas", "Churrasqueira")
- `descricao`: string - Descrição detalhada
- `capacidade`: number - Capacidade máxima de pessoas
- `horarioInicio`: string - Horário permitido para início de reservas
- `horarioFim`: string - Horário permitido para término de reservas
- `taxaReserva`: number (opcional) - Valor cobrado pela reserva
- `status`: string - Status da área ('disponivel', 'em_manutencao', 'indisponivel')


**Relacionamentos**:

- Uma `ÁreaComum` pode ter múltiplas `Reservas`


**Obtenção de Dados**: Através de chamadas à API `/areas-comuns`.

### Diagrama de Relacionamentos

```plaintext
Usuario ---> Chamado (cria)
Usuario ---> Gasto (registra)
Usuario ---> Aviso (publica)
Usuario ---> Morador (pode ser)
Morador ---> Reserva (faz)
Morador ---> Unidade (mora em)
Unidade ---> Chamado (associado a)
Reserva ---> AreaComum (reserva)
Chamado ---> Usuario (atribuído a)
```

## 6. Rotas e Navegação no Frontend do CondoIA

### Estrutura de Rotas

O CondoIA utiliza o sistema de roteamento do Next.js App Router, que organiza as rotas com base na estrutura de diretórios.

#### Rotas Públicas

| Rota | Descrição | Parâmetros | Autenticação
|-----|-----|-----|-----
| `/` | Página inicial (landing page) | - | Não requerida
| `/login` | Página de login | - | Não requerida
| `/acesso-negado` | Página de acesso negado | - | Não requerida


#### Rotas do Dashboard (Autenticadas)

| Rota | Descrição | Parâmetros | Autenticação
|-----|-----|-----|-----
| `/home` | Dashboard principal | - | Requerida
| `/chamados` | Lista de chamados | - | Requerida
| `/chamados/novo` | Formulário para criar novo chamado | - | Requerida
| `/chamados/[id]` | Detalhes de um chamado específico | `id`: ID do chamado | Requerida
| `/gastos` | Lista de gastos | - | Requerida
| `/gastos/novo` | Formulário para registrar novo gasto | - | Requerida
| `/gastos/[id]` | Detalhes de um gasto específico | `id`: ID do gasto | Requerida
| `/moradores` | Lista de moradores | - | Requerida (Admin/Síndico)
| `/reservas` | Lista de reservas | - | Requerida
| `/avisos` | Lista de avisos | - | Requerida
| `/relatorios` | Página de relatórios | - | Requerida (Admin/Síndico)
| `/configuracoes` | Configurações do sistema | - | Requerida (Admin)
| `/perfil` | Perfil do usuário logado | - | Requerida
| `/usuarios` | Lista de usuários do sistema | - | Requerida (Admin)
| `/usuarios/novo` | Formulário para criar novo usuário | - | Requerida (Admin)
| `/usuarios/editar/[id]` | Formulário para editar usuário | `id`: ID do usuário | Requerida (Admin)


### Middleware de Autenticação

O sistema utiliza um middleware de autenticação para proteger rotas que requerem login. O middleware verifica a presença de um token de autenticação válido nos cookies e redireciona para a página de login caso o token não exista ou seja inválido.

```typescript
// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas que não precisam de autenticação
  const publicRoutes = ["/login", "/registro", "/recuperar-senha", "/acesso-negado", "/"]
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // Verificar se é uma rota de API ou de assets
  const isApiRoute = pathname.startsWith("/api")
  const isAssetRoute = pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico") || pathname.includes(".")

  // Se for uma rota pública, de API ou de assets, permite o acesso
  if (isPublicRoute || isApiRoute || isAssetRoute) {
    return NextResponse.next()
  }

  // Verificar o token nos cookies
  const token = request.cookies.get("auth-token")?.value

  // Se não houver token, redireciona para o login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Se houver token, permite o acesso
  return NextResponse.next()
}
```

### Navegação Programática

Para navegação programática entre rotas, o sistema utiliza o hook `useRouter` do Next.js:

```typescript
'use client'

import { useRouter } from 'next/navigation'

export function ActionButton({ chamadoId }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/chamados/${chamadoId}`)
  }

  return <button onClick={handleClick}>Ver Detalhes</button>
}
```

### Links de Navegação

Para links declarativos, o sistema utiliza o componente `Link` do Next.js:

```typescriptreact
import Link from 'next/link'

export function ChamadoCard({ chamado }) {
  return (
    <div className="p-4 border rounded">
      <h3>{chamado.titulo}</h3>
      <p>{chamado.descricao}</p>
      <Link href={`/chamados/${chamado.id}`} className="text-blue-500 hover:underline">
        Ver detalhes
      </Link>
    </div>
  )
}
```

## 7. Interação com a Interface do Usuário do CondoIA

### Página de Login

**Elementos Interativos**:

- **Campo de Email**: Aceita o endereço de email do usuário
- **Campo de Senha**: Aceita a senha do usuário (mascarada)
- **Botão "Entrar"**: Submete o formulário de login

- **Ação**: Envia uma requisição POST para `/api/auth/login` com as credenciais
- **Resultado**: Se bem-sucedido, armazena o token de autenticação e redireciona para o dashboard





**Validação**:

- Email: Verifica se é um endereço de email válido
- Senha: Verifica se tem pelo menos 6 caracteres


**Feedback**:

- Exibe mensagem de erro se as credenciais forem inválidas
- Exibe indicador de carregamento durante a autenticação


### Dashboard Principal

**Elementos Interativos**:

- **Gráficos de Chamados por Status**:

- **Ação**: Exibe a distribuição de chamados por status
- **Interação**: Ao passar o mouse sobre as seções, exibe detalhes específicos



- **Gráficos de Gastos por Categoria**:

- **Ação**: Exibe a distribuição de gastos por categoria
- **Interação**: Ao passar o mouse sobre as seções, exibe valores específicos



- **Lista de Chamados Recentes**:

- **Ação**: Exibe os chamados mais recentes
- **Interação**: Ao clicar em um chamado, navega para a página de detalhes do chamado



- **Lista de Gastos Recentes**:

- **Ação**: Exibe os gastos mais recentes
- **Interação**: Ao clicar em um gasto, navega para a página de detalhes do gasto



- **Indicador de Status da API**:

- **Ação**: Exibe o status atual da conexão com a API
- **Interação**: Ao clicar, tenta reconectar se estiver desconectado





### Página de Chamados

**Elementos Interativos**:

- **Botão "Novo Chamado"**:

- **Ação**: Navega para o formulário de criação de novo chamado



- **Filtros de Chamados**:

- **Ação**: Filtra a lista de chamados por status, prioridade, categoria
- **Interação**: Ao selecionar um filtro, atualiza a lista de chamados exibidos



- **Tabela de Chamados**:

- **Ação**: Exibe os chamados com opções de ordenação e paginação
- **Interação**:

- Ao clicar no cabeçalho da coluna, ordena a tabela por essa coluna
- Ao clicar em um chamado, navega para a página de detalhes do chamado
- Ao clicar nos botões de paginação, navega entre as páginas da tabela








**Formulário de Novo Chamado**:

- **Campo de Título**: Aceita o título do chamado
- **Campo de Descrição**: Aceita a descrição detalhada do chamado
- **Seletor de Categoria**: Permite selecionar a categoria do chamado
- **Seletor de Prioridade**: Permite selecionar a prioridade do chamado
- **Botão "Enviar"**:

- **Ação**: Envia uma requisição POST para `/api/chamados` com os dados do chamado
- **Resultado**: Se bem-sucedido, exibe mensagem de sucesso e redireciona para a lista de chamados





**Validação**:

- Título: Obrigatório, mínimo de 5 caracteres
- Descrição: Obrigatório, mínimo de 10 caracteres
- Categoria: Seleção obrigatória
- Prioridade: Seleção obrigatória


### Página de Gastos

**Elementos Interativos**:

- **Botão "Novo Gasto"**:

- **Ação**: Navega para o formulário de registro de novo gasto



- **Filtros de Gastos**:

- **Ação**: Filtra a lista de gastos por categoria, status, período
- **Interação**: Ao selecionar um filtro, atualiza a lista de gastos exibidos



- **Tabela de Gastos**:

- **Ação**: Exibe os gastos com opções de ordenação e paginação
- **Interação**:

- Ao clicar no cabeçalho da coluna, ordena a tabela por essa coluna
- Ao clicar em um gasto, navega para a página de detalhes do gasto
- Ao clicar nos botões de paginação, navega entre as páginas da tabela








**Formulário de Novo Gasto**:

- **Campo de Descrição**: Aceita a descrição do gasto
- **Campo de Valor**: Aceita o valor do gasto
- **Seletor de Categoria**: Permite selecionar a categoria do gasto
- **Campo de Data**: Permite selecionar a data do gasto
- **Seletor de Status**: Permite selecionar o status do pagamento
- **Upload de Comprovante**: Permite fazer upload de um comprovante de pagamento
- **Botão "Registrar"**:

- **Ação**: Envia uma requisição POST para `/api/gastos` com os dados do gasto
- **Resultado**: Se bem-sucedido, exibe mensagem de sucesso e redireciona para a lista de gastos





**Validação**:

- Descrição: Obrigatório
- Valor: Obrigatório, deve ser um número positivo
- Categoria: Seleção obrigatória
- Data: Obrigatório, deve ser uma data válida
- Status: Seleção obrigatória


### Página de Moradores

**Elementos Interativos**:

- **Botão "Novo Morador"**:

- **Ação**: Navega para o formulário de cadastro de novo morador



- **Filtros de Moradores**:

- **Ação**: Filtra a lista de moradores por bloco, status
- **Interação**: Ao selecionar um filtro, atualiza a lista de moradores exibidos



- **Tabela de Moradores**:

- **Ação**: Exibe os moradores com opções de ordenação e paginação
- **Interação**:

- Ao clicar no cabeçalho da coluna, ordena a tabela por essa coluna
- Ao clicar em um morador, navega para a página de detalhes do morador
- Ao clicar nos botões de paginação, navega entre as páginas da tabela








**Formulário de Novo Morador**:

- **Campo de Nome**: Aceita o nome completo do morador
- **Campo de Email**: Aceita o email do morador
- **Campo de Telefone**: Aceita o telefone do morador
- **Seletor de Unidade**: Permite selecionar a unidade habitacional
- **Botão "Cadastrar"**:

- **Ação**: Envia uma requisição POST para `/api/moradores` com os dados do morador
- **Resultado**: Se bem-sucedido, exibe mensagem de sucesso e redireciona para a lista de moradores





**Validação**:

- Nome: Obrigatório
- Email: Obrigatório, deve ser um email válido
- Telefone: Obrigatório, deve ser um número de telefone válido
- Unidade: Seleção obrigatória


### Página de Reservas

**Elementos Interativos**:

- **Botão "Nova Reserva"**:

- **Ação**: Navega para o formulário de criação de nova reserva



- **Calendário de Reservas**:

- **Ação**: Exibe as reservas em um formato de calendário
- **Interação**:

- Ao clicar em uma data, exibe as reservas para aquele dia
- Ao clicar em uma reserva, exibe detalhes da reserva






- **Lista de Reservas**:

- **Ação**: Exibe as reservas em formato de lista
- **Interação**: Ao clicar em uma reserva, navega para a página de detalhes da reserva





**Formulário de Nova Reserva**:

- **Seletor de Área Comum**: Permite selecionar a área comum a ser reservada
- **Seletor de Data**: Permite selecionar a data da reserva
- **Seletor de Horário de Início**: Permite selecionar o horário de início
- **Seletor de Horário de Término**: Permite selecionar o horário de término
- **Campo de Observações**: Aceita observações adicionais
- **Botão "Reservar"**:

- **Ação**: Envia uma requisição POST para `/api/reservas` com os dados da reserva
- **Resultado**: Se bem-sucedido, exibe mensagem de sucesso e redireciona para a lista de reservas





**Validação**:

- Área Comum: Seleção obrigatória
- Data: Obrigatório, deve ser uma data futura
- Horário de Início: Obrigatório, deve estar dentro do horário permitido
- Horário de Término: Obrigatório, deve ser posterior ao horário de início


### Página de Avisos

**Elementos Interativos**:

- **Botão "Novo Aviso"**:

- **Ação**: Navega para o formulário de criação de novo aviso



- **Lista de Avisos**:

- **Ação**: Exibe os avisos em ordem cronológica
- **Interação**: Ao clicar em um aviso, expande para mostrar o conteúdo completo





**Formulário de Novo Aviso**:

- **Campo de Título**: Aceita o título do aviso
- **Campo de Conteúdo**: Aceita o conteúdo do aviso
- **Checkbox "Importante"**: Permite marcar o aviso como importante
- **Upload de Anexo**: Permite fazer upload de um arquivo anexo
- **Botão "Publicar"**:

- **Ação**: Envia uma requisição POST para `/api/avisos` com os dados do aviso
- **Resultado**: Se bem-sucedido, exibe mensagem de sucesso e redireciona para a lista de avisos





**Validação**:

- Título: Obrigatório
- Conteúdo: Obrigatório


### Feedback ao Usuário

O sistema utiliza os seguintes mecanismos para fornecer feedback ao usuário:

- **Toasts de Notificação**: Mensagens temporárias exibidas no canto da tela para informar sobre o resultado de uma ação
- **Estados de Carregamento**: Indicadores visuais (spinners, skeletons) durante operações assíncronas
- **Mensagens de Erro**: Exibidas próximas aos campos de formulário com validação falha ou em componentes de erro para falhas de API
- **Confirmações de Ação**: Diálogos modais para confirmar ações destrutivas ou importantes


## 8. Comunicação com o Backend (APIs do CondoIA)

### Configuração da API

O frontend do CondoIA se comunica com o backend através de uma API RESTful. A configuração base da API é definida no arquivo `lib/api-client.ts`:

```typescript
import axios from "axios"

// Função para obter a URL da API
const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || "http://mockapi/api"
}

// Criar instância do axios com a URL correta
const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

// Add a request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Cliente de API
export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await axiosInstance.get<T>(url)
    return response.data
  },
  
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.post<T>(url, data)
    return response.data
  },
  
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.put<T>(url, data)
    return response.data
  },
  
  async delete<T>(url: string): Promise<T> {
    const response = await axiosInstance.delete<T>(url)
    return response.data
  },
}
```

### Principais Endpoints da API

#### Autenticação

**Login**

- **Endpoint**: `POST /api/auth/login`
- **Corpo da Requisição**:

```json
{
  "email": "admin@condominio.com",
  "senha": "senha123"
}
```


- **Resposta de Sucesso** (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "nome": "Administrador",
    "email": "admin@condominio.com",
    "perfil": "admin"
  }
}
```




**Verificar Autenticação**

- **Endpoint**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer {token}`
- **Resposta de Sucesso** (200 OK):

```json
{
  "id": "1",
  "nome": "Administrador",
  "email": "admin@condominio.com",
  "perfil": "admin"
}
```




#### Chamados

**Listar Chamados**

- **Endpoint**: `GET /api/chamados`
- **Headers**: `Authorization: Bearer {token}`
- **Parâmetros de Query** (opcionais):

- `status`: Filtrar por status (ex: "aberto", "em_andamento")
- `prioridade`: Filtrar por prioridade (ex: "alta", "media")
- `categoria`: Filtrar por categoria (ex: "manutencao", "seguranca")
- `page`: Número da página para paginação
- `limit`: Número de itens por página



- **Resposta de Sucesso** (200 OK):

```json
{
  "total": 25,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "1",
      "titulo": "Vazamento no banheiro",
      "descricao": "Há um vazamento no banheiro do apartamento 101",
      "status": "aberto",
      "prioridade": "alta",
      "categoria": "manutencao",
      "dataCriacao": "2023-11-15T10:30:00Z",
      "dataAtualizacao": "2023-11-15T10:30:00Z",
      "criadorId": "2",
      "criador": {
        "id": "2",
        "nome": "João Silva"
      },
      "unidadeId": "101",
      "unidade": "Bloco A, Apto 101"
    }
  ]
}
```




**Obter Detalhes de um Chamado**

- **Endpoint**: `GET /api/chamados/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Resposta de Sucesso** (200 OK):

```json
{
  "id": "1",
  "titulo": "Vazamento no banheiro",
  "descricao": "Há um vazamento no banheiro do apartamento 101",
  "status": "aberto",
  "prioridade": "alta",
  "categoria": "manutencao",
  "dataCriacao": "2023-11-15T10:30:00Z",
  "dataAtualizacao": "2023-11-15T10:30:00Z",
  "criadorId": "2",
  "criador": {
    "id": "2",
    "nome": "João Silva",
    "email": "joao@exemplo.com"
  },
  "responsavelId": null,
  "responsavel": null,
  "unidadeId": "101",
  "unidade": "Bloco A, Apto 101",
  "comentarios": [
    {
      "id": "1",
      "texto": "Técnico agendado para amanhã",
      "autorId": "1",
      "autor": {
        "id": "1",
        "nome": "Administrador"
      },
      "data": "2023-11-15T14:20:00Z"
    }
  ]
}
```




**Criar Novo Chamado**

- **Endpoint**: `POST /api/chamados`
- **Headers**: `Authorization: Bearer {token}`
- **Corpo da Requisição**:

```json
{
  "titulo": "Problema na iluminação",
  "descricao": "A luz do corredor do 2º andar está queimada",
  "categoria": "manutencao",
  "prioridade": "media",
  "unidadeId": "205"
}
```


- **Resposta de Sucesso** (201 Created):

```json
{
  "id": "26",
  "titulo": "Problema na iluminação",
  "descricao": "A luz do corredor do 2º andar está queimada",
  "status": "aberto",
  "prioridade": "media",
  "categoria": "manutencao",
  "dataCriacao": "2023-11-20T09:15:00Z",
  "dataAtualizacao": "2023-11-20T09:15:00Z",
  "criadorId": "2",
  "unidadeId": "205"
}
```




**Atualizar Status de um Chamado**

- **Endpoint**: `PUT /api/chamados/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Corpo da Requisição**:

```json
{
  "status": "em_andamento",
  "responsavelId": "1"
}
```


- **Resposta de Sucesso** (200 OK):

```json
{
  "id": "1",
  "titulo": "Vazamento no banheiro",
  "status": "em_andamento",
  "dataAtualizacao": "2023-11-20T10:30:00Z",
  "responsavelId": "1"
}
```




#### Gastos

**Listar Gastos**

- **Endpoint**: `GET /api/gastos`
- **Headers**: `Authorization: Bearer {token}`
- **Parâmetros de Query** (opcionais):

- `categoria`: Filtrar por categoria
- `status`: Filtrar por status
- `dataInicio`: Filtrar por data inicial
- `dataFim`: Filtrar por data final
- `page`: Número da página para paginação
- `limit`: Número de itens por página



- **Resposta de Sucesso** (200 OK):

```json
{
  "total": 42,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "1",
      "descricao": "Manutenção do elevador",
      "valor": 1500.00,
      "categoria": "manutencao",
      "dataRegistro": "2023-11-10T08:00:00Z",
      "dataPagamento": "2023-11-12T14:30:00Z",
      "status": "pago",
      "registradoPorId": "1",
      "registradoPor": {
        "id": "1",
        "nome": "Administrador"
      }
    }
  ]
}
```




**Registrar Novo Gasto**

- **Endpoint**: `POST /api/gastos`
- **Headers**:

- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data` (se incluir comprovante)



- **Corpo da Requisição**:

```json
{
  "descricao": "Material de limpeza",
  "valor": 350.75,
  "categoria": "limpeza",
  "dataRegistro": "2023-11-20T00:00:00Z",
  "status": "pendente"
}
```


- **Resposta de Sucesso** (201 Created):

```json
{
  "id": "43",
  "descricao": "Material de limpeza",
  "valor": 350.75,
  "categoria": "limpeza",
  "dataRegistro": "2023-11-20T00:00:00Z",
  "status": "pendente",
  "registradoPorId": "1"
}
```




#### Moradores

**Listar Moradores**

- **Endpoint**: `GET /api/moradores`
- **Headers**: `Authorization: Bearer {token}`
- **Parâmetros de Query** (opcionais):

- `bloco`: Filtrar por bloco
- `status`: Filtrar por status
- `page`: Número da página para paginação
- `limit`: Número de itens por página



- **Resposta de Sucesso** (200 OK):

```json
{
  "total": 120,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "1",
      "nome": "João Silva",
      "email": "joao@exemplo.com",
      "telefone": "(11) 98765-4321",
      "unidadeId": "101",
      "unidade": "Bloco A, Apto 101",
      "dataCadastro": "2023-01-15T00:00:00Z",
      "status": "ativo"
    }
  ]
}
```




**Cadastrar Novo Morador**

- **Endpoint**: `POST /api/moradores`
- **Headers**: `Authorization: Bearer {token}`
- **Corpo da Requisição**:

```json
{
  "nome": "Maria Oliveira",
  "email": "maria@exemplo.com",
  "telefone": "(11) 91234-5678",
  "unidadeId": "202"
}
```


- **Resposta de Sucesso** (201 Created):

```json
{
  "id": "121",
  "nome": "Maria Oliveira",
  "email": "maria@exemplo.com",
  "telefone": "(11) 91234-5678",
  "unidadeId": "202",
  "unidade": "Bloco B, Apto 202",
  "dataCadastro": "2023-11-20T09:30:00Z",
  "status": "ativo"
}
```




#### Avisos

**Listar Avisos**

- **Endpoint**: `GET /api/avisos`
- **Headers**: `Authorization: Bearer {token}`
- **Parâmetros de Query** (opcionais):

- `importante`: Filtrar por importância (true/false)
- `page`: Número da página para paginação
- `limit`: Número de itens por página



- **Resposta de Sucesso** (200 OK):

```json
{
  "total": 15,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "1",
      "titulo": "Manutenção na piscina",
      "conteudo": "Informamos que a piscina estará fechada para manutenção nos dias 25 e 26 de novembro.",
      "dataPublicacao": "2023-11-18T10:00:00Z",
      "autorId": "1",
      "autor": {
        "id": "1",
        "nome": "Administrador"
      },
      "importante": true,
      "anexo": null
    }
  ]
}
```




**Publicar Novo Aviso**

- **Endpoint**: `POST /api/avisos`
- **Headers**:

- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data` (se incluir anexo)



- **Corpo da Requisição**:

```json
{
  "titulo": "Assembleia de Condomínio",
  "conteudo": "Convocamos todos os moradores para a assembleia que ocorrerá no dia 30/11 às 19h no salão de festas.",
  "importante": true
}
```


- **Resposta de Sucesso** (201 Created):

```json
{
  "id": "16",
  "titulo": "Assembleia de Condomínio",
  "conteudo": "Convocamos todos os moradores para a assembleia que ocorrerá no dia 30/11 às 19h no salão de fest  "Convocamos todos os moradores para a assembleia que ocorrerá no dia 30/11 às 19h no salão de festas.",
  "importante": true,
  "dataPublicacao": "2023-11-20T15:45:00Z",
  "autorId": "1",
  "anexo": null
}
```




## 9. Considerações de Estado Global no Frontend do CondoIA

O frontend do CondoIA utiliza principalmente a Context API do React para gerenciamento de estado global. Essa abordagem foi escolhida por sua simplicidade e integração nativa com o React, sendo suficiente para as necessidades do sistema.

### Principais Contextos

#### AuthContext

O `AuthContext` é responsável por gerenciar o estado de autenticação do usuário em toda a aplicação.

**Estado Gerenciado**:

- `user`: Objeto contendo informações do usuário autenticado
- `isLoading`: Booleano indicando se a verificação de autenticação está em andamento
- `isAuthenticated`: Booleano indicando se o usuário está autenticado


**Ações Disponíveis**:

- `login(email, senha)`: Autentica o usuário com as credenciais fornecidas
- `logout()`: Encerra a sessão do usuário
- `checkAuth()`: Verifica se o token de autenticação é válido


**Implementação**:

```typescriptreact
// contexts/auth-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { User } from '@/lib/types'
import Cookies from 'js-cookie'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email: string, senha: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, senha })
      const { token, user } = response
      
      // Armazenar token nos cookies
      Cookies.set('auth-token', token, { expires: 7 })
      
      // Atualizar estado
      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // Remover token dos cookies
    Cookies.remove('auth-token')
    
    // Atualizar estado
    setUser(null)
    setIsAuthenticated(false)
  }

  const checkAuth = async () => {
    try {
      setIsLoading(true)
      const token = Cookies.get('auth-token')
      
      if (!token) {
        setIsAuthenticated(false)
        setUser(null)
        return false
      }
      
      const user = await apiClient.get('/auth/me')
      setUser(user)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

#### SidebarContext

O `SidebarContext` gerencia o estado da barra lateral, especialmente importante para a experiência em dispositivos móveis.

**Estado Gerenciado**:

- `isOpen`: Booleano indicando se a barra lateral está aberta ou fechada


**Ações Disponíveis**:

- `toggle()`: Alterna o estado da barra lateral
- `open()`: Abre a barra lateral
- `close()`: Fecha a barra lateral


**Implementação**:

```typescriptreact
// contexts/sidebar-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useMobile } from '@/hooks/use-mobile'

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  const toggle = () => setIsOpen(prev => !prev)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  // Fechar a barra lateral automaticamente em dispositivos móveis quando a rota muda
  useEffect(() => {
    if (isMobile) {
      close()
    }
  }, [isMobile, window.location.pathname])

  // Fechar a barra lateral em dispositivos móveis quando o usuário clica fora dela
  useEffect(() => {
    if (!isMobile) return

    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar')) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobile, isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
```

#### NotificationContext

O `NotificationContext` gerencia as notificações do sistema, como mensagens de sucesso, erro e informações.

**Estado Gerenciado**:

- `notifications`: Array de objetos de notificação


**Ações Disponíveis**:

- `showNotification(type, message)`: Exibe uma nova notificação
- `dismissNotification(id)`: Remove uma notificação específica
- `clearNotifications()`: Remove todas as notificações


**Implementação**:

```typescriptreact
// contexts/notification-context.tsx
'use client'

import { createContext, useContext, useState, useId } from 'react'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface Notification {
  id: string
  type: NotificationType
  message: string
  timestamp: number
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (type: NotificationType, message: string) => void
  dismissNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (type: NotificationType, message: string) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      id,
      type,
      message,
      timestamp: Date.now()
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(id)
    }, 5000)
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, dismissNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
```

### Uso dos Contextos na Aplicação

Os contextos são utilizados em toda a aplicação para acessar e modificar o estado global:

```typescriptreact
// Exemplo de uso do AuthContext
'use client'

import { useAuth } from '@/contexts/auth-context'

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, senha)
      // Redirecionar após login bem-sucedido
    } catch (error) {
      // Tratar erro de login
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

```typescriptreact
// Exemplo de uso do SidebarContext
'use client'

import { useSidebar } from '@/contexts/sidebar-context'

export function SidebarToggleButton() {
  const { toggle, isOpen } = useSidebar()
  
  return (
    <button onClick={toggle} aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
      {isOpen ? 'Fechar' : 'Menu'}
    </button>
  )
}
```

```typescriptreact
// Exemplo de uso do NotificationContext
'use client'

import { useNotification } from '@/contexts/notification-context'

export function SaveButton({ onSave }) {
  const { showNotification } = useNotification()
  
  const handleSave = async () => {
    try {
      await onSave()
      showNotification('success', 'Dados salvos com sucesso!')
    } catch (error) {
      showNotification('error', 'Erro ao salvar dados. Tente novamente.')
    }
  }
  
  return <button onClick={handleSave}>Salvar</button>
}
```

## 10. Testes do Frontend do CondoIA

O frontend do CondoIA implementa uma estratégia de testes abrangente para garantir a qualidade e confiabilidade do código. A abordagem de testes inclui testes unitários, testes de integração e testes end-to-end.

### Ferramentas de Teste

- **Jest**: Framework de testes para JavaScript/TypeScript
- **React Testing Library**: Biblioteca para testar componentes React
- **Playwright**: Ferramenta para testes end-to-end automatizados
- **MSW (Mock Service Worker)**: Biblioteca para simular requisições de API durante os testes


### Estrutura de Testes

Os testes são organizados em diferentes categorias:

- **Testes Unitários**: Testam componentes e funções isoladamente
- **Testes de Integração**: Testam a interação entre múltiplos componentes
- **Testes End-to-End (E2E)**: Testam fluxos completos de usuário em um ambiente simulado


### Testes Unitários e de Integração

Os testes unitários e de integração são escritos usando Jest e React Testing Library. Eles são organizados em arquivos `.test.ts` ou `.test.tsx` ao lado dos arquivos que estão testando.

Exemplo de teste unitário para um componente:

```typescriptreact
// components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('applies the correct variant class', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass('bg-red-500')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()
  })
})
```

Exemplo de teste de integração para um formulário:

```typescriptreact
// app/(dashboard)/chamados/novo/novo-chamado-client.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NovoChamadoClient } from './novo-chamado-client'
import { AuthProvider } from '@/contexts/auth-context'
import { NotificationProvider } from '@/contexts/notification-context'
import { apiClient } from '@/lib/api-client'

// Mock do apiClient
jest.mock('@/lib/api-client', () => ({
  post: jest.fn(),
}))

describe('NovoChamadoClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('submits the form with correct data', async () => {
    // Mock da resposta da API
    apiClient.post.mockResolvedValueOnce({ id: '123', status: 'aberto' })

    render(
      <AuthProvider>
        <NotificationProvider>
          <NovoChamadoClient />
        </NotificationProvider>
      </AuthProvider>
    )

    // Preencher o formulário
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: 'Problema na iluminação' },
    })
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: 'A luz do corredor do 2º andar está queimada' },
    })
    fireEvent.click(screen.getByLabelText(/categoria/i))
    fireEvent.click(screen.getByText(/manutenção/i))
    fireEvent.click(screen.getByLabelText(/prioridade/i))
    fireEvent.click(screen.getByText(/média/i))

    // Submeter o formulário
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    // Verificar se a API foi chamada com os dados corretos
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/chamados', {
        titulo: 'Problema na iluminação',
        descricao: 'A luz do corredor do 2º andar está queimada',
        categoria: 'manutencao',
        prioridade: 'media',
      })
    })

    // Verificar se a mensagem de sucesso foi exibida
    expect(screen.getByText(/chamado criado com sucesso/i)).toBeInTheDocument()
  })

  it('displays validation errors for empty fields', async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <NovoChamadoClient />
        </NotificationProvider>
      </AuthProvider>
    )

    // Submeter o formulário sem preencher
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    // Verificar se as mensagens de erro são exibidas
    await waitFor(() => {
      expect(screen.getByText(/título é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/categoria é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/prioridade é obrigatória/i)).toBeInTheDocument()
    })

    // Verificar se a API não foi chamada
    expect(apiClient.post).not.toHaveBeenCalled()
  })
})
```

### Testes End-to-End (E2E)

Os testes E2E são escritos usando Playwright e estão localizados no diretório `tests/e2e`. Eles simulam interações reais de usuários com a aplicação.

Exemplo de teste E2E para o fluxo de login:

```typescript
// tests/e2e/auth-flow.test.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navegar para a página de login
    await page.goto('/login')

    // Preencher o formulário de login
    await page.fill('input[name="email"]', 'admin@condominio.com')
    await page.fill('input[name="senha"]', 'senha123')
    
    // Clicar no botão de login
    await page.click('button[type="submit"]')

    // Verificar se foi redirecionado para o dashboard
    await expect(page).toHaveURL('/home')
    
    // Verificar se o nome do usuário está visível no header
    await expect(page.locator('.user-name')).toContainText('Administrador')
  })

  test('should show error message with invalid credentials', async ({ page }) => {
    // Navegar para a página de login
    await page.goto('/login')

    // Preencher o formulário com credenciais inválidas
    await page.fill('input[name="email"]', 'admin@condominio.com')
    await page.fill('input[name="senha"]', 'senha_errada')
    
    // Clicar no botão de login
    await page.click('button[type="submit"]')

    // Verificar se a mensagem de erro é exibida
    await expect(page.locator('.error-message')).toBeVisible()
    await expect(page.locator('.error-message')).toContainText('Credenciais inválidas')
    
    // Verificar se permanece na página de login
    await expect(page).toHaveURL('/login')
  })

  test('should redirect to login page when accessing protected route without authentication', async ({ page }) => {
    // Tentar acessar uma rota protegida sem estar autenticado
    await page.goto('/chamados')
    
    // Verificar se foi redirecionado para a página de login
    await expect(page).toHaveURL(/\/login/)
    
    // Verificar se o parâmetro de redirecionamento está presente
    await expect(page.url()).toContain('from=/chamados')
  })

  test('should logout successfully', async ({ page }) => {
    // Fazer login primeiro
    await page.goto('/login')
    await page.fill('input[name="email"]', 'admin@condominio.com')
    await page.fill('input[name="senha"]', 'senha123')
    await page.click('button[type="submit"]')
    
    // Verificar se está no dashboard
    await expect(page).toHaveURL('/home')
    
    // Clicar no botão de logout
    await page.click('.user-menu-trigger')
    await page.click('button:has-text("Sair")')
    
    // Verificar se foi redirecionado para a página de login
    await expect(page).toHaveURL('/login')
  })
})
```

Exemplo de teste E2E para o fluxo de criação de chamado:

```typescript
// tests/e2e/chamados.test.ts
import { test, expect } from '@playwright/test'

test.describe('Chamados Flow', () => {
  // Executar login antes de cada teste
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="email"]', 'admin@condominio.com')
    await page.fill('input[name="senha"]', 'senha123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/home')
  })

  test('should create a new chamado successfully', async ({ page }) => {
    // Navegar para a página de criação de chamado
    await page.goto('/chamados/novo')
    
    // Preencher o formulário
    await page.fill('input[name="titulo"]', 'Teste de Chamado E2E')
    await page.fill('textarea[name="descricao"]', 'Descrição detalhada do chamado para teste E2E')
    
    // Selecionar categoria
    await page.click('select[name="categoria"]')
    await page.selectOption('select[name="categoria"]', 'manutencao')
    
    // Selecionar prioridade
    await page.click('select[name="prioridade"]')
    await page.selectOption('select[name="prioridade"]', 'media')
    
    // Enviar o formulário
    await page.click('button[type="submit"]')
    
    // Verificar se foi redirecionado para a lista de chamados
    await expect(page).toHaveURL('/chamados')
    
    // Verificar se o chamado aparece na lista
    await expect(page.locator('table')).toContainText('Teste de Chamado E2E')
  })

  test('should filter chamados by status', async ({ page }) => {
    // Navegar para a página de chamados
    await page.goto('/chamados')
    
    // Verificar se a tabela está visível
    await expect(page.locator('table')).toBeVisible()
    
    // Selecionar filtro de status "Em andamento"
    await page.click('select[name="status"]')
    await page.selectOption('select[name="status"]', 'em_andamento')
    
    // Clicar no botão de filtrar
    await page.click('button:has-text("Filtrar")')
    
    // Verificar se todos os chamados exibidos têm o status "Em andamento"
    const statusCells = await page.locator('td.status-cell').all()
    for (const cell of statusCells) {
      await expect(cell).toContainText('Em andamento')
    }
  })

  test('should navigate to chamado details when clicking on a chamado', async ({ page }) => {
    // Navegar para a página de chamados
    await page.goto('/chamados')
    
    // Clicar no primeiro chamado da lista
    const firstRow = await page.locator('table tbody tr').first()
    const chamadoId = await firstRow.getAttribute('data-id')
    await firstRow.click()
    
    // Verificar se foi redirecionado para a página de detalhes do chamado
    await expect(page).toHaveURL(`/chamados/${chamadoId}`)
    
    // Verificar se os detalhes do chamado são exibidos
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.chamado-details')).toBeVisible()
  })
})
```

### Testes de Responsividade

O CondoIA também implementa testes específicos para verificar a responsividade da interface em diferentes tamanhos de tela:

```typescript
// tests/e2e/responsiveness.test.ts
import { test, expect } from '@playwright/test'

test.describe('Responsiveness Tests', () => {
  // Executar login antes de cada teste
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="email"]', 'admin@condominio.com')
    await page.fill('input[name="senha"]', 'senha123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/home')
  })

  test('dashboard should adapt to mobile viewport', async ({ page }) => {
    // Definir viewport para tamanho de celular
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navegar para o dashboard
    await page.goto('/home')
    
    // Verificar se a barra lateral está oculta em dispositivos móveis
    await expect(page.locator('.sidebar')).toHaveClass(/hidden/)
    
    // Verificar se o botão de menu móvel está visível
    await expect(page.locator('.mobile-menu-button')).toBeVisible()
    
    // Clicar no botão de menu
    await page.click('.mobile-menu-button')
    
    // Verificar se a barra lateral é exibida
    await expect(page.locator('.sidebar')).toBeVisible()
    
    // Verificar se os gráficos são exibidos em formato adequado para mobile
    await expect(page.locator('.dashboard-charts')).toHaveClass(/flex-col/)
  })

  test('tables should be responsive on small screens', async ({ page }) => {
    // Definir viewport para tamanho de celular
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navegar para a página de chamados
    await page.goto('/chamados')
    
    // Verificar se a tabela responsiva é exibida
    await expect(page.locator('.responsive-table')).toBeVisible()
    
    // Verificar se colunas menos importantes estão ocultas
    await expect(page.locator('th:has-text("Data de Atualização")')).toHaveClass(/hidden/)
    
    // Verificar se o botão de expandir detalhes está visível
    await expect(page.locator('.expand-row-button').first()).toBeVisible()
    
    // Clicar no botão de expandir
    await page.click('.expand-row-button:first-child')
    
    // Verificar se os detalhes expandidos são exibidos
    await expect(page.locator('.expanded-details').first()).toBeVisible()
  })

  test('forms should adapt to different screen sizes', async ({ page }) => {
    // Testar em tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/chamados/novo')
    
    // Verificar layout em tablet
    await expect(page.locator('form')).toHaveClass(/md:grid-cols-2/)
    
    // Testar em celular
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Verificar layout em celular
    await expect(page.locator('form')).toHaveClass(/grid-cols-1/)
  })
})
```

### Configuração de Testes

A configuração dos testes é definida nos seguintes arquivos:

- `jest.config.js`: Configuração do Jest para testes unitários e de integração
- `playwright.config.ts`: Configuração do Playwright para testes E2E
- `jest.setup.js`: Configuração global para testes Jest
- `tests/e2e/setup.ts`: Configuração global para testes E2E


Exemplo de configuração do Jest:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
```

Exemplo de configuração do Playwright:

```typescript
// playwright.config.ts
import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
  ],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
}

export default config
```

### Execução de Testes

Os testes podem ser executados através dos seguintes comandos:

- **Testes Unitários e de Integração**:

```shellscript
npm run test
```


- **Testes Unitários com Cobertura**:

```shellscript
npm run test:coverage
```


- **Testes E2E**:

```shellscript
npm run test:e2e
```


- **Testes E2E em um Navegador Específico**:

```shellscript
npm run test:e2e:chrome
npm run test:e2e:firefox
npm run test:e2e:safari
```


- **Testes E2E em Dispositivos Móveis**:

```shellscript
npm run test:e2e:mobile
```




### Integração Contínua (CI)

Os testes são executados automaticamente em um ambiente de integração contínua (CI) a cada push ou pull request. A configuração do CI garante que todos os testes passem antes que o código seja mesclado na branch principal.

O pipeline de CI inclui as seguintes etapas:

1. Instalação de dependências
2. Verificação de linting
3. Execução de testes unitários e de integração
4. Geração de relatório de cobertura
5. Execução de testes E2E
6. Geração de relatórios de testes

