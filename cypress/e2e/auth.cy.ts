describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  it('should handle login flow', () => {
    cy.visit('/auth/login')
    
    // Test form validation
    cy.get('button[type="submit"]').click()
    cy.contains('Please enter a valid email address').should('be.visible')
    
    // Test invalid credentials
    cy.get('input[name="email"]').type('invalid@test.com')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')
    
    // Test successful login
    cy.get('input[name="email"]').clear().type('admin@test.com')
    cy.get('input[name="password"]').clear().type('Admin@123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/admin/dashboard')
  })

  it('should handle signup flow', () => {
    cy.visit('/auth/signup')
    
    // Test form validation
    cy.get('button[type="submit"]').click()
    cy.contains('Name must be at least 2 characters').should('be.visible')
    
    // Test password requirements
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('weak')
    cy.contains('Password must be at least 8 characters').should('be.visible')
    
    // Test successful signup
    cy.get('input[name="password"]').clear().type('StrongPass123!')
    cy.get('input[name="confirmPassword"]').type('StrongPass123!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})