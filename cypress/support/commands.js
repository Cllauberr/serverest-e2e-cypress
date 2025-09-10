import LoginPageElements from '../page-elements/LoginPageElements'
import RegisterPageElements from '../page-elements/RegisterPageElements'

// UI Commands

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

// API Helper - função centralizada para requisições
const ApiRequest = (method, endpoint, options = {}) => {
  return cy.fixture('testData').then((testData) => {
    const config = {
      method,
      url: `${testData.api.baseUrl}${endpoint}`,
      ...options
    }
    return cy.request(config)
  })
}

// API Commands

// Realiza o login e retorna o token de autorização
Cypress.Commands.add('getAuthToken', (email = null, password = null) => {
  return cy.fixture('testData').then((testData) => {
    const auth = {
      email: email || testData.users.valid.email,
      password: password || testData.users.valid.password
    }
    
    return ApiRequest('POST', testData.api.endpoints.login, { body: auth })
      .then((response) => {
        expect(response.status).to.eq(testData.api.statusCode.success)
        expect(response.body).to.have.property('authorization')
        return response.body.authorization
      })
  })
})

// Realiza o login de sucesso
Cypress.Commands.add('apiLogin', (email = null, password = null) => {
  return cy.fixture('testData').then((testData) => {
    const auth = {
      email: email || testData.users.valid.email,
      password: password || testData.users.valid.password
    }
    
    return ApiRequest('POST', testData.api.endpoints.login, { body: auth })
      .then((response) => {
        expect(response.status).to.eq(testData.api.statusCode.success)
        expect(response.body).to.have.property('authorization')
        expect(response.body.message).to.eq(testData.api.messages.loginSuccess)
        return response
      })
  })
})

// Realiza o cadastro de um usuário Admin
Cypress.Commands.add('apiCreateUser', (userData = null) => {
  return cy.fixture('testData').then((testData) => {
    const timestamp = Date.now()
    const user = userData || {
      nome: `API User ${timestamp}`,
      email: `apiuser${timestamp}@test.com`,
      password: 'test123',
      administrador: 'true'
    }

    return ApiRequest('POST', testData.api.endpoints.register, { body: user })
      .then((response) => {
        expect(response.status).to.eq(testData.api.statusCode.created)
        expect(response.body.message).to.eq(testData.api.messages.userCreated)
        return response
      })
  })
})

// Realiza a deleção de um usuário por ID
Cypress.Commands.add('apiDeleteUser', (userId) => {
  return cy.fixture('testData').then((testData) => {
    return ApiRequest('DELETE', `${testData.api.endpoints.delete}${userId}`)
      .then((response) => {
        expect(response.status).to.eq(testData.api.statusCode.success)
        expect(response.body.message).to.eq(testData.api.messages.userDeleted)
        return response
      })
  })
})

// Realiza a busca de um usuário por ID
Cypress.Commands.add('apiFindUser', (userId = null) => {
  return cy.fixture('testData').then((testData) => {
    // Se não foi fornecido userId, criar um usuário e buscar por ele
    if (!userId) {
      return cy.apiCreateUser().then((createResponse) => {
        const createdUserId = createResponse.body._id
        return ApiRequest('GET', `${testData.api.endpoints.find}${createdUserId}`)
          .then((response) => {
            expect(response.status).to.eq(testData.api.statusCode.success)
            expect(response.body).to.have.property('_id', createdUserId)
            return response
          })
      })
    }
    
    return ApiRequest('GET', `${testData.api.endpoints.find}${userId}`)
      .then((response) => {
        expect(response.status).to.eq(testData.api.statusCode.success)
        expect(response.body).to.have.property('_id', userId)
        return response
      })
  })
})

// Realiza o cadastro de um produto
Cypress.Commands.add('apiCreateProduct', (productData = null) => {
  return cy.fixture('testData').then((testData) => {
    const timestamp = Date.now()
    const product = productData || {
      ...testData.api.productData,
      nome: `${testData.api.productData.nome} ${timestamp}`
    }

    // Obter o token de autorização usando o comando getAuthToken
    return cy.getAuthToken().then((authToken) => {
      return ApiRequest('POST', testData.api.endpoints.products, {
        headers: { 'Authorization': authToken },
        body: product
      }).then((response) => {
        expect(response.status).to.eq(testData.api.statusCode.created)
        return response
      })
    })
  })
})

// Realiza a busca de um produto
Cypress.Commands.add('apiFindProduct', () => {
  return cy.fixture('testData').then((testData) => {
    // Cria um produto
    return cy.apiCreateProduct().then((createResponse) => {
      const productId = createResponse.body._id
      
      // Validações da criação
      expect(createResponse.status).to.eq(201)
      expect(productId).to.exist

      // Busca o produto usando o ID
      return ApiRequest('GET', `${testData.api.endpoints.productsFind}${productId}`)
        .then((response) => {
          expect(response.status).to.eq(testData.api.statusCode.success)
          return response
        })
    })
  })
})

// Realiza a deleção de um produto
Cypress.Commands.add('apiDeleteProduct', () => {
  return cy.fixture('testData').then((testData) => {
    return cy.apiCreateProduct().then((createResponse) => {
      const productId = createResponse.body._id
      
      // Validações da criação
      expect(createResponse.status).to.eq(201)
      expect(productId).to.exist
      
      // Obter token para deleção
      return cy.getAuthToken().then((authToken) => {
        return ApiRequest('DELETE', `${testData.api.endpoints.productsDelete}${productId}`, {
          headers: { 'Authorization': authToken }
        }).then((response) => {
          expect(response.status).to.eq(testData.api.statusCode.success)
          return response
        })
      })
    })
  })
})