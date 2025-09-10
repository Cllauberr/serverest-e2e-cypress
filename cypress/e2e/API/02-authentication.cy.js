describe('API Tests - Authentication', () => {

    it('should login successfully via API', () => {
        cy.fixture('testData').then((testData) => {
            cy.apiLogin().then((response) => {
                // Validações do status da resposta
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                
                // Validações do corpo da resposta
                expect(response.body).to.have.property('message')
                expect(response.body).to.have.property('authorization')
                expect(response.body.message).to.eq(testData.api.messages.loginSuccess)
                
                // Validações do token de autorização
                const token = response.body.authorization
                expect(token).to.exist
                expect(token).to.be.a('string')
                expect(token).to.have.length.greaterThan(0)
            })
        })
    })

    it('should fail login with invalid credentials via API', () => {
        cy.fixture('testData').then((testData) => {
            cy.request({
                method: 'POST',
                url: `${testData.api.baseUrl}${testData.api.endpoints.login}`,
                body: {
                    email: testData.users.invalidCredentials.email,
                    password: testData.users.invalidCredentials.password
                },
                failOnStatusCode: false
            }).then((response) => {
                // Validações do status de erro
                expect(response.status).to.eq(401)
                expect(response.statusText).to.eq('Unauthorized')
                
                // Validações do corpo da resposta de erro
                expect(response.body).to.have.property('message')
                expect(response.body.message).to.eq(testData.api.messages.loginFailed)
                
                // Validação que não retorna token
                expect(response.body).to.not.have.property('authorization')
            })
        })
    })

    it('should fail login with missing required fields via API', () => {
        cy.fixture('testData').then((testData) => {
            // Teste sem email
            cy.request({
                method: 'POST',
                url: `${testData.api.baseUrl}${testData.api.endpoints.login}`,
                body: {
                    password: 'test123'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(testData.api.statusCode.badRequest)
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.include('obrigatório')
            })
        })
    })
})