describe('template spec', () => {
  it('have a Navbar', () => {
    cy.visit('http://localhost:5173/')
    cy.contains("Lofi Plans").should("be.visible");
  })
  it ('have a Title',() => {
    cy.visit('http://localhost:5173/')
    cy.contains("Welcome").should("be.visible");
  })
  it('can click button', () =>{
    cy.visit("http://localhost:5173/")
    cy.get('button')
    
  })
  it('has an about page', () =>{
    cy.visit("http://localhost:5173/about")
  })
  it('has an event page', () =>{
    cy.visit("http://localhost:5173/event")
  })
  it('has buttons', () =>{
    cy.visit("http://localhost:5173/event#/users/")
    cy.get('button').first().click()
    cy.get('button').contains('create new event')
    
  })

  
  
}) 