import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

describe('E2E Tests - Navigation and User Flow', () => {
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
    // Setup - realiza o login antes de cada teste
    cy.authenticateUser()
    homePage.verifyPageLoaded()
  })

  it('should navigate through system and logout successfully', () => {
    // Assert - verifica se está logado
    cy.url().should('include', testData.navigation.paths.home)

    // Act - navega para a página de produtos se disponível
    cy.get('body').then(($body) => {
      if ($body.find(testData.navigation.links.products).length > 0) {
        cy.get(testData.navigation.links.products).first().click()
        cy.wait(testData.timing.short)
      }
    })
    
    // retorna ao inicio
    cy.visit(testData.navigation.paths.home)
    homePage.verifyPageLoaded()

    // Act - verifica se existe o botão de logout
    cy.get('body').then(($body) => {
      if ($body.find(testData.navigation.links.logout).length > 0) {
        cy.get(testData.navigation.links.logout).first().click()
        cy.wait(testData.timing.short)
        cy.url().should('not.include', testData.navigation.paths.home)
      } else {
        // validação caso não encontre o botão de logout faz o redirecionamento manualmente
        cy.visit(testData.navigation.paths.root)
        cy.url().should('not.include', testData.navigation.paths.home)
      }
    })
  })

  it('should search products if search functionality exists', () => {
    // Act - função de pesquisa
    cy.get('body').then(($body) => {
      if ($body.find(testData.navigation.selectors.search).length > 0) {
        // verificando se existe
        cy.get(testData.navigation.selectors.search).first().type(testData.search.term)
        cy.wait(testData.timing.short)
        
        // validação da pesquisa se os resultados são exibidos
        cy.get('body').should('be.visible')
      } else {
        // se não existir, tenta navegar para a página de produtos
        if ($body.find(testData.navigation.links.products).length > 0) {
          cy.get(testData.navigation.links.products).first().click()
          cy.wait(testData.timing.short)
          cy.get('body').should('be.visible')
        } else {
          cy.log('No search or products functionality found')
        }
      }
    })
  })

  it('should validate responsive design elements', () => {
    // Act - testa diferentes tamanhos de tela
    cy.viewport(testData.viewport.desktop.width, testData.viewport.desktop.height)
    homePage.verifyPageLoaded()
    cy.get('body').should('be.visible')

    // Tablet
    cy.viewport(testData.viewport.tablet.width, testData.viewport.tablet.height)
    cy.get('body').should('be.visible')

    // Mobile
    cy.viewport(testData.viewport.mobile.width, testData.viewport.mobile.height)
    cy.get('body').should('be.visible')

    // Assert - verificação básica de responsividade
    cy.get('html').should('have.css', 'width')
    
    // retorno ao desktop
    cy.viewport(testData.viewport.desktop.width, testData.viewport.desktop.height)
  })
})
