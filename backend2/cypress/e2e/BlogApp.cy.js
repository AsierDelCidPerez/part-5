const url = "http://localhost:3000"

describe('Blog App', () => {
  beforeEach(() => {
    cy.request({
      url: `${url}/api/test/reset`,
      method: 'POST'
    })
    const user = {
      name: 'Global Administrator',
      username: 'root',
      password: 'root'
    }
    cy.request({
      url: `${url}/api/users`,
      method: 'POST',
      body: user
    })
    cy.visit(url)
  })

  it('Login form is auto-open', () => {
    cy.get('form').should('contain', 'Login')
  })

  it('a user can correctly login', () => {
    cy.get('#usernameFieldBlogLoginForm').type('root')
    cy.get('#passwordFieldBlogLoginForm').type('root')
    cy.get('#submitButtonBlogLoginForm').click()

    cy.contains('Logged in as root')
  })

  it('Login fails with incorrect password', () => {
    cy.get('#usernameFieldBlogLoginForm').type('root')
    cy.get('#passwordFieldBlogLoginForm').type('1234')
    cy.get('#submitButtonBlogLoginForm').click()

    cy.get('html').contains('Username or password are incorrect')
      .should('have.css', 'border-style', 'solid')
      .and('have.css', 'background-color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({username: 'root', password: 'root', url})
      cy.contains('new blog').click()
    })
    it('user can create a blog', () => {
      cy.createBlog({
        title: 'Cypress blog',
        author: 'Cypress Inc.',
        link: 'https://docs.cypress.io/guides/overview/why-cypress',
        likes: '12',
        url
      })
      cy.contains('new blog').click()
      cy.contains('Cypress blog')
    })

    describe('when a blog is created', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Cypress blog',
          author: 'Cypress Inc.',
          link: 'https://docs.cypress.io/guides/overview/why-cypress',
          likes: '12',
          url
        })
        cy.contains('new blog').click()
      })
      it('user can like a blog', () => {
        //cy.contains('new blog').click()
        let likes = cy.contains('Likes')
        cy.contains('Likes').parent().find('button').as('myButton')
        cy.get('@myButton').click()
        cy.get('@myButton').parent().contains('Likes: 13')
      })

      it('user can delete a blog', () => {
        //cy.contains('new blog').click()
        cy.contains('Remove').click()
        cy.should('not.contain', 'Cypress blog')
      })

      it('blogs are sorted by likes >', () => {
        cy.createBlog({
          title: 'Marian Blog',
          author: 'Marian',
          link: 'themarianblog.com',
          likes: '5',
          url
        })
        cy.createBlog({
          title: 'F.1 Blog',
          author: 'Formula 1',
          link: 'https://www.caranddriver.com/es/formula-1/',
          likes: '527',
          url
        })

        cy.contains('new blog').click()

        cy.get('.blogSimplxum:first').contains('F.1 Blog')
        cy.get('.blogSimplxum:last').contains('Marian Blog')
      })

      it('a not logged user CAN NOT delete a blog', () => {
        cy.contains('Log out').click()
        cy.contains('Cypress blog')
      })

    })

  })

})