import RegisterPageElements from '../page-elements/RegisterPageElements'

class RegisterPage {
  constructor() {
    this.elements = RegisterPageElements.elements
  }

  // Page actions
  visit() {
    cy.visit('/cadastrarusuarios')
    return this
  }

  fillName(name) {
    cy.get(this.elements.nameInput).clear().type(name)
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

  checkAdmin() {
    cy.get(this.elements.adminCheckbox).check()
    return this
  }

  clickRegister() {
    cy.get(this.elements.registerButton).click()
    return this
  }

  clickLogin() {
    cy.get(this.elements.loginLink).click()
    return this
  }

  performRegister(name, email, password, isAdmin = false) {
    this.fillName(name)
    this.fillEmail(email)
    this.fillPassword(password)
    if (isAdmin) {
      this.checkAdmin()
    }
    this.clickRegister()
    return this
  }

  // Verifications
  verifyErrorMessage(message) {
    cy.get(this.elements.errorMessage).should('contain.text', message)
    return this
  }

  verifyRegisterSuccess() {
    // Check for success message or redirect to login
    cy.url().should('contain', '/login')
    return this
  }
}

export default RegisterPage
