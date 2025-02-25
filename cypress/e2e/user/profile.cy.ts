describe('User Profile Management', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userRole', 'user')
    })
    cy.visit('/settings')
  })

  it('should display profile settings', () => {
    cy.get('h1').should('contain', 'Account Settings')
    cy.get('form').should('exist')
  })

  it('should update profile information', () => {
    cy.get('input[name="name"]').clear().type('Updated Name')
    cy.get('input[name="email"]').clear().type('updated@example.com')
    cy.get('input[name="phone"]').clear().type('9876543210')
    cy.contains('Save Changes').click()
    cy.contains('Settings updated successfully').should('be.visible')
  })

  it('should toggle notification preferences', () => {
    cy.get('label').contains('Email Notifications').parent().find('button').click()
    cy.get('label').contains('SMS Notifications').parent().find('button').click()
    cy.contains('Save Changes').click()
    cy.contains('Settings updated successfully').should('be.visible')
  })
})