describe('default value', () => {
  beforeEach(() => {
    cy.visit('/easytable-default')
  })
  it('passes', () => {
    cy.get('button').should('contain.text', 'ADD')
  })
})
