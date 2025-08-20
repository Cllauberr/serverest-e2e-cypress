describe('API Tests - User Registration', () => {
    it('should create new user via API', () => {
        cy.apiCreateUser().then((response) => {
            // Validações do resultado da API
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('_id')
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body._id).to.be.a('string')
            expect(response.body._id).to.have.length.greaterThan(0)
        })
    })

    it('should create and delete user via API', () => {
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
                expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
            })
        })
    })
}) 