import LoginPageElements from '../page-elements/LoginPageElements'

class LoginPage {
  constructor() {
    this.elements = LoginPageElements.elements
  }

  // Page actions
  visit() {
    cy.visit('/')
    return this
  }

  fillEmail(email) {
    cy.get(this.elements.emailInput).clear().type(email)
    return this
  }

  fillPassword(password) {
    cy.get(this.elements.passwordInput).clear().type(password)
    return this
  }

  clickLogin() {
    cy.get(this.elements.loginButton).click()
    return this
  }

  clickRegister() {
    cy.get(this.elements.registerButton).click()
    return this
  }

  Login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.clickLogin()
    return this
  }

  // Verifications
  verifyErrorMessage(message) {
    cy.get(this.elements.errorMessage).should('contain.text', message)
    return this
  }

  verifyLoginSuccess() {
    cy.url().should('not.contain', '/login')
    cy.url().should('contain', '/home')
    return this
  }
}

export default LoginPage
