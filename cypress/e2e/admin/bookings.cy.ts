describe('Admin Bookings Management', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userRole', 'admin')
    })
    cy.visit('/admin/bookings')
  })

  it('should display bookings list', () => {
    cy.get('h1').should('contain', 'Bookings')
    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should filter bookings', () => {
    cy.get('input[placeholder="Search bookings..."]').type('Business Strategy')
    cy.get('tbody tr').should('have.length', 1)
    cy.contains('Business Strategy Consultation').should('be.visible')
  })

  it('should show booking details', () => {
    cy.contains('View Details').first().click()
    cy.get('dialog').should('be.visible')
    cy.contains('Booking Details').should('be.visible')
    cy.contains('Client Information').should('be.visible')
    cy.contains('Payment Information').should('be.visible')
  })

  it('should handle booking status changes', () => {
    cy.contains('View Details').first().click()
    cy.contains('Confirm').click()
    cy.contains('Booking status updated').should('be.visible')
  })
})