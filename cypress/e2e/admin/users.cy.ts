describe('Admin Users Management', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userRole', 'admin')
    })
    cy.visit('/admin/users')
  })

  it('should display users list', () => {
    cy.get('h1').should('contain', 'Users')
    cy.get('table').should('exist')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should filter users', () => {
    cy.get('input[placeholder="Search users..."]').type('John')
    cy.get('tbody tr').should('have.length', 1)
    cy.contains('John Doe').should('be.visible')
  })

  it('should show user details', () => {
    cy.contains('View Details').first().click()
    cy.get('dialog').should('be.visible')
    cy.contains('User Details').should('be.visible')
  })

  it('should edit user information', () => {
    cy.contains('View Details').first().click()
    cy.contains('Edit User').click()
    cy.get('input[name="name"]').clear().type('Updated Name')
    cy.contains('Save Changes').click()
    cy.contains('User updated successfully').should('be.visible')
  })

  it('should handle user deletion', () => {
    cy.contains('View Details').first().click()
    cy.contains('Delete User').click()
    cy.contains('Are you sure').should('be.visible')
    cy.contains('button', 'Delete').click()
    cy.contains('User deleted successfully').should('be.visible')
  })
})