describe('Dashboard Features', () => {
  beforeEach(() => {
    // Login before each test
    cy.window().then((win) => {
      win.localStorage.setItem('userRole', 'user')
    })
    cy.visit('/dashboard')
  })

  it('should display user dashboard components', () => {
    cy.get('h1').should('contain', 'Welcome')
    cy.get('.card').should('have.length.at.least', 3)
    cy.contains('Upcoming Sessions').should('be.visible')
    cy.contains('Quick Actions').should('be.visible')
  })

  it('should handle consultation booking', () => {
    cy.contains('Schedule Consultation').click()
    cy.get('input[name="clientName"]').type('John Doe')
    cy.get('input[name="clientEmail"]').type('john@example.com')
    cy.get('input[name="time"]').type('14:00')
    cy.get('input[name="duration"]').type('60')
    cy.contains('Schedule Consultation').click()
    cy.contains('Consultation scheduled successfully').should('be.visible')
  })

  it('should handle payment processing', () => {
    cy.contains('Pay Now').first().click()
    cy.contains('Processing payment').should('be.visible')
  })
})