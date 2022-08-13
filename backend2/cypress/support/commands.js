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
        url: `${url}/api/login`,
        method: 'POST',
        body: {username, password}
    }).then(res => {
        localStorage.setItem('BlogappUserLogin', JSON.stringify(res.body))
        cy.visit(url)
    })
})

Cypress.Commands.add('createBlog', ({title, author, link, likes, url}) => {
    cy.request({
        url: `${url}/api/blogs`,
        method: 'POST',
        body: {title, author, url: link, likes},
        headers: {Authorization: `bearer ${JSON.parse(localStorage.getItem('BlogappUserLogin')).token}`}
    }).then(() => {
        cy.visit(url)
    })
})