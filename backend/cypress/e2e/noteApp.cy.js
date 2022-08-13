const url = 'http://localhost:3000'

describe('Note app', () => {
    beforeEach(() => {
      cy.visit(url)
      cy.request('POST', `${url}/api/test/reset`)
      const user = {
        name: 'GAdministrator',
        username: 'root',
        password: 'root'
      }
      cy.request('POST', `${url}/api/users/`, user)
      cy.visit(url)
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
      cy.contains("Logged in as root")
    })

    it('login fails with wrong password', () => {
      cy.contains('login').click()
      cy.get('#usernameFieldLoginForm').type('root')
      cy.get('#passwordFieldLoginForm').type('1234')
      cy.get('#buttonSubmitLoginForm').click()
      cy.get('.error')
        .should('contain', 'Username or password are invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Logged in as root')
    })

    describe('when user logged in', () => {
      beforeEach(() => {
        cy.login({
          username: 'root',
          password: 'root',
          url
        })
        cy.visit(url)
      })
      it('a user can create a note', () => {
        cy.contains('new note').click()
        cy.get('#textFieldNoteForm').type('a note created using Cypress')
        cy.get('#buttonSubmitNoteForm').click()
      })

      describe('when a note is created', () => {
        beforeEach(() => {
          cy.createNote({content: 'first note', important: false, url})
          cy.createNote({content: 'second note', important: false, url})
          cy.createNote({content: 'third note', important: false, url})
          cy.visit(url)
        })
        it('a user can change the importance of a note', () => {
          cy.contains('second note').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('@theButton').should('contain', 'Make NOT important')
        })
      })
    })

})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})