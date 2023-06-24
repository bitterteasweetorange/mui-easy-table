describe('Button', () => {
  beforeEach(() => {
    cy.visit('/example-button--primary')
  })
  it('passes', () => {
    cy.get('button').should('contain.text', 'btn')
  })
})
