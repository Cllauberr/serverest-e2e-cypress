describe('API Tests - User Registration', () => {
    it('should create new user via API', () => {
        cy.fixture('testData').then((testData) => {
            cy.apiCreateUser().then((response) => {
                // // Validações do status da resposta
                expect(response.status).to.eq(201)

                // Validações do corpo da resposta - propriedades obrigatórias
                expect(response.body).to.have.property('_id')
                expect(response.body).to.have.property('message')
                expect(response.body.message).to.eq(testData.api.messages.userCreated)

                // Validações do tipo de dado
                expect(response.body._id).to.be.a('string')

                // Validações de formato
                expect(response.body._id).to.have.length.greaterThan(0)
            })
        })
    })

    it('should create and delete user via API', () => {
        cy.fixture('testData').then((testData) => {
            // Primeiro cria o usuário
            cy.apiCreateUser().then((createResponse) => {
                const userId = createResponse.body._id
                
                // Validações da criação
                expect(createResponse.status).to.eq(201)
                expect(userId).to.exist

                // Depois deleta o usuário usando o ID
                cy.apiDeleteUser(userId).then((deleteResponse) => {
                    // Validações da deleção
                    expect(deleteResponse.status).to.eq(200)
                    expect(deleteResponse.body).to.have.property('message')
                    expect(deleteResponse.body.message).to.eq(testData.api.messages.userDeleted)
                })
            })
        })
    })

    it('should find user by Id via API', () => {
        cy.apiFindUser().then((response) => {
            // Validações do status da resposta
            expect(response.status).to.eq(200)
            
            // Validações do corpo da resposta - propriedades obrigatórias
            expect(response.body).to.have.property('_id')
            expect(response.body).to.have.property('nome')
            expect(response.body).to.have.property('email')
            expect(response.body).to.have.property('administrador')
            
            // Validações de formato e tipo
            expect(response.body._id).to.be.a('string')
            expect(response.body._id).to.have.length.greaterThan(0)
            expect(response.body.nome).to.be.a('string')
            expect(response.body.email).to.be.a('string')
            expect(response.body.email).to.include('@')
            expect(response.body.administrador).to.match(/^(true|false)$/)
            
            // Validação do tempo de resposta (performance)
            expect(response.duration).to.be.lessThan(2000) // menos de 2 segundos
        })
    })
}) 