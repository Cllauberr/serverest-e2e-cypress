class HomePageElements {
  static elements = {
    welcomeMessage: 'h1, .welcome, [class*="welcome"]',
    logoutButton: 'button:contains("Logout"), a:contains("Logout"), [href*="logout"]',
    productsLink: 'a:contains("Produtos"), [href*="produtos"]',
    addProductLink: 'a:contains("Cadastrar"), [href*="cadastrar"]',
    listProductsLink: 'a:contains("Listar"), [href*="listar"]',
    productsList: '.products, [class*="produto"], [class*="lista"]',
    searchInput: 'input[type="search"], input[placeholder*="pesquis"], input[placeholder*="busca"]',
    userMenu: '.user-menu, .menu-usuario'
  }
}

export default HomePageElements
