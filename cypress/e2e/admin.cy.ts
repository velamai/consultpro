describe("Admin Dashboard", () => {
  beforeEach(() => {
    // Mock admin login
    localStorage.setItem("userRole", "admin")
    cy.visit("/admin/dashboard")
  })

  it("should display admin dashboard when logged in as admin", () => {
    cy.get("nav").should("contain", "Admin Dashboard")
    cy.get("input[placeholder='Search users...']").should("exist")
  })

  it("should redirect to login when logged out", () => {
    cy.get("button").contains("LogOut").click()
    cy.url().should("include", "/auth/login")
  })

  it("should handle search functionality", () => {
    cy.get("input[placeholder='Search users...']").type("test")
    cy.get("button").contains("Search").click()
  })

  it("should display stats cards", () => {
    cy.get(".card").should("have.length", 3)
    cy.contains("Total Users").should("exist")
    cy.contains("Active Sessions").should("exist")
    cy.contains("Revenue").should("exist")
  })
})