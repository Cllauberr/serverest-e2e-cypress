import LoginPageElements from '../page-elements/LoginPageElements'
import RegisterPageElements from '../page-elements/RegisterPageElements'

// login
Cypress.Commands.add('loginUser', (email, password) => {
  cy.get(LoginPageElements.elements.emailInput).clear().type(email)
  cy.get(LoginPageElements.elements.passwordInput).clear().type(password)
  cy.get(LoginPageElements.elements.loginButton).click()
})

// registro de usuário
Cypress.Commands.add('registerUser', (name, email, password) => {
  cy.get(RegisterPageElements.elements.nameInput).clear().type(name)
  cy.get(RegisterPageElements.elements.emailInput).clear().type(email)
  cy.get(RegisterPageElements.elements.passwordInput).clear().type(password)
  cy.get(RegisterPageElements.elements.registerButton).click()
})

// dados de testes
Cypress.Commands.add('generateTestData', () => {
  const timestamp = Date.now()
  return {
    email: `user${timestamp}@test.com`,
    name: `Test User ${timestamp}`,
    password: 'test123'
  }
})

// autenticação de usuário
Cypress.Commands.add('authenticateUser', (userData = null) => {
  cy.fixture('testData').then((testData) => {
    const user = userData || testData.users.valid
    cy.visit(testData.navigation.paths.root)
    cy.loginUser(user.email, user.password)
    cy.wait(testData.timing.medium)
  })
})
