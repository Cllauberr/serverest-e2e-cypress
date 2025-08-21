describe('API Tests - Products', () => {
    it('should create a product successfully via API', () => {
        cy.fixture('testData').then((testData) => {
            cy.apiCreateProduct().then((response) => {
                // Validações do status da resposta
                expect(response.status).to.eq(201)
                expect(response.statusText).to.eq('Created')

                // Validações do corpo da resposta
                expect(response.body).to.have.property('message')
                expect(response.body).to.have.property('_id')
                expect(response.body.message).to.eq(testData.api.messages.productCreated)
                expect(response.body._id).to.be.a('string')
                expect(response.body._id).to.have.length.greaterThan(0)
            })
        })
    })
    it('should find product via API', () => {
        cy.fixture('testData').then((testData) => {
            cy.apiFindProduct().then((response) => {
                // Validações do status da resposta
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')

                // Validações do corpo da resposta
                expect(response.body).to.have.property('_id')
                expect(response.body).to.have.property('nome')
                expect(response.body).to.have.property('preco')
                expect(response.body).to.have.property('descricao')
                expect(response.body).to.have.property('quantidade')

                // Validações dos valores específicos do fixture
                expect(response.body.nome).to.include(testData.api.productData.nome)
            })
        })
    })
    it('should delete product via API', () => {
        cy.fixture('testData').then((testData) => {
            cy.apiDeleteProduct().then((response) => {
                // Validações do status da resposta
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')

                // Validações do corpo da resposta
                expect(response.body).to.have.property('message')
                expect(response.body.message).to.eq(testData.api.messages.productDeleted)
                
                // Validação adicional para garantir que a resposta é válida
                expect(response.body.message).to.be.a('string')
                expect(response.body.message).to.have.length.greaterThan(0)
            })
        })
    })
})
