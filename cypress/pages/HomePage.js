import HomePageElements from '../page-elements/HomePageElements'

class HomePage {
  constructor() {
    this.elements = HomePageElements.elements
  }

  // Page actions
  visit() {
    cy.visit('/home')
    return this
  }

  performLogout() {
    cy.get(this.elements.logoutButton).click()
    return this
  }

  navigateToProducts() {
    cy.get(this.elements.productsLink).click()
    return this
  }

  navigateToAddProduct() {
    cy.get(this.elements.addProductLink).click()
    return this
  }

  navigateToProductsList() {
    cy.contains('Listar Produtos').click()
    return this
  }

  searchProduct(productName) {
    cy.get(this.elements.searchInput).type(productName)
    return this
  }

  // Verifications
  verifyWelcomeMessage(userName) {
    cy.get(this.elements.welcomeMessage).should('be.visible')
    return this
  }

  verifyPageLoaded() {
    cy.url().should('contain', '/home')
    cy.get('body').should('be.visible')
    return this
  }

  verifyLogoutSuccess() {
    cy.url().should('not.contain', '/home')
    return this
  }
}

export default HomePage
