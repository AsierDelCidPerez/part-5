// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({username, password, url}) => {
    cy.request({
        url : `${url}/api/login`,
        method: 'POST',
        body: {username, password}
    }).then(response => {
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit(url)
    })
})

Cypress.Commands.add('createNote', ({content, important, url}) => {
    cy.request({
        url: `${url}/api/notes`,
        body: {content, important},
        method: 'POST',
        headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
        }
    })
    cy.visit(url)
})