describe('API Tests - Authentication', () => {

    it('should login successfully via API', () => {
        cy.apiLogin().then((response) => {
            // Validações do status da resposta
            expect(response.status).to.eq(200)
            expect(response.statusText).to.eq('OK')
            
            // Validações do corpo da resposta
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('authorization')
            expect(response.body.message).to.eq('Login realizado com sucesso')
            
            // Validações do token de autorização
            const token = response.body.authorization
            expect(token).to.exist
            expect(token).to.be.a('string')
            expect(token).to.have.length.greaterThan(0)
        })
    })

})