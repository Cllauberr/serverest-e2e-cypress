# Projeto de Automação E2E com Cypress - Frontend ServeRest

Este projeto implementa testes end-to-end automatizados para o frontend da aplicação ServeRest usando Cypress e JavaScript. O desenvolvimento seguiu boas práticas de automação e padrões de projeto consolidados no mercado.

## Sobre o Projeto

**Aplicação sob teste:** https://front.serverest.dev/  
**Framework:** Cypress  
**Linguagem:** JavaScript  
**Padrão de Projeto:** Page Object Model  

## Cenários de Teste Implementados

### 1. Autenticação de Usuário
**Frontend (02-authentication.cy.js)**
- Login com credenciais válidas
- Login com credenciais inválidas
- Validação de campos obrigatórios

**API (02-authentication.cy.js)**
- Login bem-sucedido via API
- Falha de login com credenciais inválidas via API
- Falha de login com campos obrigatórios ausentes via API

### 2. Registro de Usuário
**Frontend (01-user-registration.cy.js)**
- Registro bem-sucedido de novo usuário
- Tentativa de registro com email existente
- Validação de formato de email

**API (01-user-registration.cy.js)**
- Criação de novo usuário via API
- Criação e deleção de usuário via API
- Busca de usuário por ID via API

### 3. Navegação e Fluxo do Usuário (03-navigation-flow.cy.js)
- Navegação pelo sistema e logout
- Funcionalidade de busca de produtos
- Validação de responsividade

### 4. Gerenciamento de Produtos via API (3-create-product.cy.js)
- Criação de produto com autenticação
- Busca de produto por ID
- Deleção de produto com autenticação

## Estrutura do Projeto

```
cypress-frontend-automation/
├── cypress/
│   ├── e2e/                    # Cenários de teste organizados por tipo
│   │   ├── API/                # Testes de API
│   │   │   ├── 01-user-registration.cy.js
│   │   │   ├── 02-authentication.cy.js
│   │   │   └── 3-create-product.cy.js
│   │   └── Front/              # Testes de Frontend (E2E)
│   │       ├── 01-user-registration.cy.js
│   │       ├── 02-authentication.cy.js
│   │       └── 03-navigation-flow.cy.js
│   ├── fixtures/               # Dados de teste
│   │   └── testData.json
│   ├── page-elements/          # Elementos das páginas
│   │   ├── LoginPageElements.js
│   │   ├── RegisterPageElements.js
│   │   └── HomePageElements.js
│   ├── pages/                  # Page Objects
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── HomePage.js
│   └── support/                # Configurações e comandos
│       ├── commands.js         # Comandos customizados (UI + API)
│       └── e2e.js
├── cypress.config.js           # Configuração do Cypress
├── package.json               # Dependências e scripts
└── README.md                  # Documentação
```

## Configuração e Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Navegar para o diretório
cd cypress-frontend-automation

# Instalar dependências
npm install

# Instalar biblioteca para testes de API avançados (já incluída no package.json)
npm install --save-dev @bahmutov/cy-api
```

**Problema Conhecido:** Os testes de API estão falhando devido a credenciais expiradas. Para corrigi-los:
1. Crie um novo usuário admin via API
2. Atualize as credenciais no arquivo `cypress/fixtures/testData.json`
3. Execute novamente os testes

### Executando os Testes

### Modo Interativo (Cypress Test Runner)
```bash
npm run cy:open
```

### Modo Headless (Terminal)
```bash
# Executar todos os testes
npm test

# Executar todos os testes API
npm run cy:run -- --spec "cypress/e2e/API/**/*.cy.js"

# Executar todos os testes Frontend
npm run cy:run -- --spec "cypress/e2e/Front/**/*.cy.js"

# Executar com interface gráfica
npm run cy:run:headed

# Executar no Chrome
npm run cy:run:chrome
```

## Padrões e Boas Práticas Implementadas

### Arquitetura Page Object Model
O projeto utiliza o padrão Page Object Model com uma abordagem híbrida:

- **Page Elements**: Centralizados em arquivos específicos para cada página
- **Page Objects**: Contêm as ações e métodos de interação
- **Custom Commands**: Para ações rápidas e setup de testes
- **Fixtures**: Para gerenciamento centralizado de dados de teste

### Comandos Customizados
**Comandos de UI:**
- `cy.loginUser()` - Login rápido para setup
- `cy.registerUser()` - Registro de usuário
- `cy.generateTestData()` - Geração de dados únicos de teste
- `cy.authenticateUser()` - Autenticação completa para beforeEach

**Comandos de API:**
- `cy.apiLogin()` - Login via API com validações completas
- `cy.getAuthToken()` - Obtenção de token de autorização reutilizável
- `cy.apiCreateUser()` - Criação de usuário administrador via API
- `cy.apiDeleteUser()` - Deleção de usuário por ID via API
- `cy.apiFindUser()` - Busca de usuário por ID via API
- `cy.apiCreateProduct()` - Criação de produto com autenticação
- `cy.apiFindProduct()` - Busca de produto (cria produto + busca por ID)
- `cy.apiDeleteProduct()` - Deleção de produto (cria produto + deleta)

### Organização dos Dados de Teste
- Fixtures para dados reutilizáveis
- Dados dinâmicos para evitar conflitos
- Centralização de todos os seletores e configurações

### Estratégias de Teste
- Padrão AAA (Arrange, Act, Assert)
- Testes independentes e isolados
- Múltiplas verificações e asserções claras
- Testing orientado a dados usando fixtures JSON
- Eliminação de strings mágicas no código
- Tempos de espera e timeouts consistentes

## Gerenciamento de Dados de Teste

### Fixtures (cypress/fixtures/testData.json)
O projeto usa uma abordagem centralizada para gerenciamento de dados:

```json
{
  "users": {
    "valid": { "name": "...", "email": "...", "password": "..." }
  },
  "api": {
    "baseUrl": "https://serverest.dev",
    "endpoints": { "login": "/login", "register": "/usuarios" },
    "statusCode": { "success": 200, "created": 201 }
  }
}
```

### Vantagens do uso de Fixtures:
- Gerenciamento centralizado de dados
- Manutenção facilitada
- Flexibilidade para diferentes ambientes
- Reutilização entre arquivos de teste
- Controle de versão dos dados
- Configuração de endpoints de API
- Padronização de mensagens de resposta
- Dados de produto reutilizáveis para testes API

## Resultados dos Testes

**Status Atual dos Testes:**

**Testes de Frontend:**
- **Testes de Autenticação:** 3/3 aprovados
- **Testes de Registro:** 3/3 aprovados  
- **Testes de Navegação:** 3/3 aprovados

**Testes de API:**
- **Testes de Autenticação API:** 2/3 (1 falha - credenciais)
- **Testes de Registro API:** 3/3 aprovados
- **Testes de Produtos API:** 0/3 (falhas de autenticação)

**Total:** 13/18 testes passando (72% - necessária atualização de credenciais API)

**Nota:** Os testes de API estão falhando devido a credenciais expiradas. É necessário atualizar o arquivo `testData.json` com usuário administrador válido.

## Configuração do Cypress

### Principais configurações (cypress.config.js)
- **baseUrl:** https://front.serverest.dev
- **API baseUrl:** https://serverest.dev (configurado via fixtures)
- **timeouts:** 10 segundos
- **video:** Desabilitado (para performance)
- **screenshots:** Desabilitados em falhas (para performance)
- **Autenticação JWT:** Gerenciada via tokens para testes de API

**Importante:** Para debug, habilite `video: true` e `screenshotOnRunFailure: true` no cypress.config.js

### Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run cy:open` | Abre o Cypress Test Runner |
| `npm run cy:run` | Executa testes em modo headless |
| `npm run cy:run:headed` | Executa com interface gráfica |
| `npm run cy:run:chrome` | Executa especificamente no Chrome |
| `npm test` | Alias para execução de testes |
| `npm run cy:run -- --spec "cypress/e2e/API/**/*.cy.js"` | Executa apenas testes de API |
| `npm run cy:run -- --spec "cypress/e2e/Front/**/*.cy.js"` | Executa apenas testes de Frontend |

## Inspeção de Requests e Debug

### Logs de Requisições API
Para inspecionar requests feitas com `cy.request()`:

```javascript
// Usar cy.log para Command Log do Cypress
cy.log('Token obtido:', authToken.substring(0, 20) + '...')

// Usar console.log para terminal/browser console
console.log('Request options:', {
  method: 'POST',
  url: '/produtos',
  headers: { Authorization: authToken.substring(0, 20) + '...' }
})
```

### Interceptação de Requests XHR/Fetch
Para requests feitas pelo navegador:

```javascript
cy.intercept('POST', '**/produtos').as('createProduct')
cy.wait('@createProduct').then(({ request, response }) => {
  cy.log('Request headers:', JSON.stringify(request.headers))
  console.log('Intercept response:', response)
})
```

### Boas Práticas de Logging
- Mascarar tokens em logs para evitar vazamento em CI
- Usar `cy.log()` para visualização no Test Runner
- Usar `console.log()` para debug detalhado no terminal
- Inspecionar headers e responses no painel direito do Cypress

## Relatórios e Evidências

- **Vídeos:** Gravação automática da execução dos testes
- **Screenshots:** Captura automática em falhas
- **Logs:** Detalhes completos da execução

### Configuração do Git Ignore
Os seguintes arquivos/pastas são automaticamente ignorados:
- `cypress/videos/` - Vídeos da execução dos testes
- `cypress/screenshots/` - Screenshots de falhas  
- `package-lock.json` - Arquivo de lock das dependências
- `node_modules/` - Pasta de dependências

## Estratégia de Seletores

O projeto utiliza seletores CSS robustos como estratégia principal de seleção de elementos, garantindo:
- Estabilidade dos testes em diferentes ambientes
- Padrões realistas de seletores comumente usados em produção
- Identificação clara de elementos sem depender de atributos específicos de teste
- Melhor manutenibilidade e compatibilidade entre navegadores

## Melhorias Futuras

- Integração com CI/CD
- Relatórios customizados (Mochawesome)
- Testes de acessibilidade
- Testes de performance
- Integração com ferramentas de monitoramento
- Testes de contrato para APIs
- Implementação de mocks para cenários específicos
- Cobertura de testes de componente

## Contribuindo

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com foco em qualidade e boas práticas de automação de testes E2E e API**
