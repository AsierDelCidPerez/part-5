describe('Note app', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3001')
      cy.request('POST', 'http://localhost:3001/api/test/reset')
      const user = {
        name: 'Global Administrator',
        username: 'root',
        password: 'root'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3001')
    })

    it('getting the website', () => {
      cy.contains('Notes')
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
    })


    it('login form can be opened', () => {
      cy.contains('login').click()
    })

    it('user can login', () => {
      cy.contains('login').click()
      cy.get('#usernameFieldLoginForm').type('root')
      cy.get('#passwordFieldLoginForm').type('root')
      cy.get('#buttonSubmitLoginForm').click()
    })

    describe('when user logged in', () => {
      beforeEach(() => {
        cy.contains('login').click()
        cy.get('#usernameFieldLoginForm').type('root')
        cy.get('#passwordFieldLoginForm').type('root')
        cy.get('#buttonSubmitLoginForm').click()
      })
      it('a user can create a note', () => {
        cy.contains('new note').click()
        cy.get('#textFieldNoteForm').type('a note created using Cypress')
        cy.get('#buttonSubmitNoteForm').click()
      })
    })

})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})