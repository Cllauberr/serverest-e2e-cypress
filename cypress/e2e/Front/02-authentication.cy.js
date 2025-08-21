import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import LoginPageElements from '../page-elements/LoginPageElements'

describe('E2E Tests - User Authentication', () => {
  const loginPage = new LoginPage()
  const homePage = new HomePage()
  
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

  it('should login successfully with valid credentials', () => {
    // Act
    loginPage
      .fillEmail(testData.users.valid.email)
      .fillPassword(testData.users.valid.password)
      .clickLogin()

    // Assert
    cy.wait(testData.timing.medium) // espera o redirecionamento
    homePage.verifyPageLoaded()
    
    // verifica a url
    cy.url().should('include', testData.navigation.paths.home)
  })

  it('should display error message when logging with invalid credentials', () => {
    // Act
    loginPage
      .fillEmail(testData.users.invalidCredentials.email)
      .fillPassword(testData.users.invalidCredentials.password)
      .clickLogin()

    // Assert - verifica se o login falhou (permanece no login ou mostra o erro)
    cy.wait(testData.timing.short)
    cy.url().should('not.include', testData.navigation.paths.home)
    
    // valida se a mensagem de erro apareceu ou se ainda está na tela de login
    cy.get('body').then(($body) => {
      if ($body.find(LoginPageElements.elements.errorMessage).length > 0) {
        cy.get(LoginPageElements.elements.errorMessage).should('be.visible')
      } else {
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      }
    })
  })

  it('should validate required fields on login form', () => {
    // Act - tentando fazer o login sem preencher os campos
    loginPage.clickLogin()

    // Assert - valida se o não é enviado
    cy.wait(testData.timing.short)
    cy.url().should('not.include', testData.navigation.paths.home)

    // preenche somente o email e tenta fazer login
    loginPage.fillEmail(testData.users.valid.email)
    loginPage.clickLogin()

    // Assert - validando se a senha é necessária
    cy.wait(testData.timing.short)
    cy.url().should('not.include', testData.navigation.paths.home)

    // verificação do formulário se os campos são inválidos
    cy.get(LoginPageElements.elements.emailInput).should('have.value', testData.users.valid.email)
    cy.get(LoginPageElements.elements.passwordInput).should('have.value', '')
  })
})
