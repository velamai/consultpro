describe('Admin Payments Management', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userRole', 'admin')
    })
    cy.visit('/admin/payments')
  })

  it('should display payments list', () => {
    cy.get('h1').should('contain', 'Payments')
    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should filter payments', () => {
    cy.get('input[placeholder="Search payments..."]').type('PAY-001')
    cy.get('tbody tr').should('have.length', 1)
    cy.contains('PAY-001').should('be.visible')
  })

  it('should export payments', () => {
    cy.contains('Export').click()
    cy.contains('Exporting payments data').should('be.visible')
  })

  it('should show payment details', () => {
    cy.contains('View Details').first().click()
    cy.url().should('include', '/admin/payments/')
  })
})