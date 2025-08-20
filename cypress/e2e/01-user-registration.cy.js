import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import RegisterPageElements from '../page-elements/RegisterPageElements'

describe('E2E Tests - User Registration', () => {
  const registerPage = new RegisterPage()
  const loginPage = new LoginPage()
  
  let testData

  // carrega dados de teste dos fixtures
  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should register new user successfully', () => {
    // Arrange
    cy.generateTestData().then((userData) => {
      // Act - acessando a página de registro
      loginPage.clickRegister()
      cy.wait(testData.timing.short)
      
      // usa comando customizado para registro
      cy.registerUser(userData.name, userData.email, userData.password)

      // Assert - validação de sucesso (redireciona para o login ou exibe a mensagem de sucesso)
      cy.wait(testData.timing.medium)
      cy.url().then((url) => {
        if (url.includes(testData.navigation.paths.login) || url.includes('/')) {
          // registro bem-sucedido - tenta fazer login com novas credenciais
          cy.loginUser(userData.email, userData.password)
          cy.wait(testData.timing.medium)
          cy.url().should('include', testData.navigation.paths.home)
        } else {
          // verifica se ainda está na página de registro com a mensagem de sucesso
          cy.get('body').should('contain.text', testData.messages.success)
        }
      })
    })
  })

  it('should prevent registration with existing email', () => {
    // Act
    loginPage.clickRegister()
    cy.wait(testData.timing.short)
    cy.registerUser(testData.users.valid.name, testData.users.valid.email, testData.users.valid.password)

    // Assert - validação de falha no registro
    cy.wait(testData.timing.medium)
    cy.get('body').then(($body) => {
      // verifica se tem mensagens de erro ou se ainda está na página de registro
      if ($body.find(RegisterPageElements.elements.errorMessage).length > 0) {
        cy.get(RegisterPageElements.elements.errorMessage).should('be.visible')
      } else {
        cy.url().should('include', testData.navigation.paths.registration)
      }
    })
  })

  it('should validate email format on registration', () => {
    // Act
    loginPage.clickRegister()
    cy.wait(testData.timing.short)
    
    registerPage
      .fillName(testData.users.invalidEmail.name)
      .fillEmail(testData.users.invalidEmail.email)
      .fillPassword(testData.users.invalidEmail.password)
      .clickRegister()

    // Assert - valida se impede o envio dos dados ou mostra erro
    cy.wait(testData.timing.short)
    
    // verifica se o campo de email tem validação ou se fica na mesma página
    cy.get(RegisterPageElements.elements.emailInput).should('have.value', testData.users.invalidEmail.email)
    cy.url().should('include', testData.navigation.paths.registration)
    
    // verifica se a requisição do formulário não foi enviada sem redirecionar para a tela inicial
    cy.url().should('not.include', testData.navigation.paths.home)
  })
})
