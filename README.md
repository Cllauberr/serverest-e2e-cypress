# Projeto de Automação E2E com Cypress - Frontend ServeRest

Este projeto implementa testes end-to-end automatizados para o frontend da aplicação ServeRest usando Cypress e JavaScript. O desenvolvimento seguiu boas práticas de automação e padrões de projeto consolidados no mercado.

## Sobre o Projeto

**Aplicação sob teste:** https://front.serverest.dev/  
**Framework:** Cypress  
**Linguagem:** JavaScript  
**Padrão de Projeto:** Page Object Model  

## Cenários de Teste Implementados

### 1. Autenticação de Usuário (01-authentication.cy.js)
- Login com credenciais válidas
- Login com credenciais inválidas
- Validação de campos obrigatórios

### 2. Registro de Usuário (02-user-registration.cy.js)
- Registro bem-sucedido de novo usuário
- Tentativa de registro com email existente
- Validação de formato de email

### 3. Navegação e Fluxo do Usuário (03-navigation-flow.cy.js)
- Navegação pelo sistema e logout
- Funcionalidade de busca de produtos
- Validação de responsividade

## Estrutura do Projeto

```
cypress-frontend-automation/
├── cypress/
│   ├── e2e/                    # Cenários de teste
│   │   ├── 01-authentication.cy.js
│   │   ├── 02-user-registration.cy.js
│   │   └── 03-navigation-flow.cy.js
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
│       ├── commands.js
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
```

## Executando os Testes

### Modo Interativo (Cypress Test Runner)
```bash
npm run cy:open
```

### Modo Headless (Terminal)
```bash
# Executar todos os testes
npm test

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
- `cy.loginUser()` - Login rápido para setup
- `cy.registerUser()` - Registro de usuário
- `cy.generateTestData()` - Geração de dados únicos de teste
- `cy.authenticateUser()` - Autenticação completa para beforeEach

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
    "valid": {
      "name": "Fulano da Silva",
      "email": "fulano@qa.com",
      "password": "teste"
    },
    "invalidCredentials": {
      "email": "nonexistent@user.com",
      "password": "wrongpassword123"
    }
  },
  "navigation": {
    "paths": { "home": "/home", "login": "/login" },
    "links": { "products": "a:contains(\"Produtos\")" }
  },
  "timing": { "short": 1000, "medium": 2000 }
}
```

### Vantagens do uso de Fixtures:
- Gerenciamento centralizado de dados
- Manutenção facilitada
- Flexibilidade para diferentes ambientes
- Reutilização entre arquivos de teste
- Controle de versão dos dados

## Resultados dos Testes

Todos os 9 cenários de teste estão aprovados e funcionando corretamente:

- **Testes de Autenticação:** 3/3 aprovados
- **Testes de Registro:** 3/3 aprovados  
- **Testes de Navegação:** 3/3 aprovados

O projeto implementa com sucesso testes E2E com seletores realistas, tratamento adequado de erros e validações robustas.

## Configuração do Cypress

### Principais configurações (cypress.config.js)
- **baseUrl:** https://front.serverest.dev
- **timeouts:** 10 segundos
- **video:** Habilitado para debug
- **screenshots:** Em caso de falha

### Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run cy:open` | Abre o Cypress Test Runner |
| `npm run cy:run` | Executa testes em modo headless |
| `npm run cy:run:headed` | Executa com interface gráfica |
| `npm run cy:run:chrome` | Executa especificamente no Chrome |
| `npm test` | Alias para execução de testes |

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

**Desenvolvido com foco em qualidade e boas práticas de automação de testes**
