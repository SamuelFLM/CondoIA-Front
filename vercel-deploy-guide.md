# Guia de Deploy no Vercel

Este guia fornece instruções passo a passo para fazer o deploy do projeto no Vercel.

## Preparação para o Deploy

1. Execute o script de preparação para o Vercel:

\`\`\`bash
npm run prepare-vercel
\`\`\`

Este script irá:
- Criar um arquivo `.npmrc` otimizado para o Vercel
- Atualizar o `package.json` para ser compatível com o Vercel
- Criar um arquivo `.env.production` com as variáveis de ambiente necessárias
- Limpar caches e arquivos temporários

2. Reinstale as dependências:

\`\`\`bash
npm install
\`\`\`

3. Verifique se o build funciona localmente:

\`\`\`bash
npm run build
\`\`\`

## Deploy via CLI do Vercel

Se você tem o CLI do Vercel instalado, pode fazer o deploy diretamente do terminal:

1. Instale o CLI do Vercel (se ainda não tiver):

\`\`\`bash
npm install -g vercel
\`\`\`

2. Faça login no Vercel:

\`\`\`bash
vercel login
\`\`\`

3. Faça o deploy:

\`\`\`bash
vercel --prod
\`\`\`

## Deploy via Dashboard do Vercel

Alternativamente, você pode fazer o deploy pelo dashboard do Vercel:

1. Faça login no [dashboard do Vercel](https://vercel.com/dashboard)
2. Clique em "New Project"
3. Importe o repositório do projeto
4. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`: `https://mock-api.vercel.app/api`
5. Clique em "Deploy"

## Solução de Problemas Comuns

### Erro de Dependências

Se você encontrar erros relacionados a dependências, tente:

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### Erro de Build

Se o build falhar, verifique os logs de build no dashboard do Vercel para identificar o problema específico.

Problemas comuns incluem:
- Dependências incompatíveis
- Erros de sintaxe no código
- Problemas com variáveis de ambiente

### Erro de Timeout

Se o build estiver demorando muito e atingir o timeout do Vercel:

1. Simplifique o projeto removendo dependências desnecessárias
2. Otimize o processo de build no `next.config.js`
3. Considere usar o plano Pro do Vercel que oferece tempos de build mais longos

### Erro de Memória

Se o build falhar por falta de memória:

1. Otimize as importações para reduzir o tamanho do bundle
2. Divida componentes grandes em componentes menores
3. Use lazy loading para componentes pesados

## Verificação Pós-Deploy

Após o deploy, verifique:

1. Se a aplicação está carregando corretamente
2. Se todas as rotas estão funcionando
3. Se os dados mockados estão sendo exibidos corretamente
4. Se a interface está responsiva em diferentes dispositivos

## Contato e Suporte

Se você continuar enfrentando problemas com o deploy, entre em contato com o suporte do Vercel ou consulte a [documentação oficial](https://vercel.com/docs).
