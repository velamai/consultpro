describe('User Support System', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userRole', 'user')
    })
    cy.visit('/dashboard/support')
  })

  it('should display support tickets', () => {
    cy.get('h1').should('contain', 'Support')
    cy.contains('Support Tickets').should('be.visible')
  })

  it('should create new support ticket', () => {
    cy.contains('New Ticket').click()
    cy.get('input[name="subject"]').type('Test Support Ticket')
    cy.get('select').select('technical')
    cy.get('textarea[name="description"]').type('This is a test support ticket description')
    cy.contains('Create Ticket').click()
    cy.contains('Support ticket created successfully').should('be.visible')
  })

  it('should view ticket details', () => {
    cy.contains('View Chat').first().click()
    cy.contains('Opening ticket chat').should('be.visible')
  })

  it('should copy ticket ID', () => {
    cy.contains('Copy Ticket ID').first().click()
    cy.contains('Ticket ID copied to clipboard').should('be.visible')
  })
})