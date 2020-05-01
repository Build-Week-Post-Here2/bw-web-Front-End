import { v4 as uuid } from 'uuid'
describe('LoginForm', () => {
   it('can navigate to the site', () => {
        cy.visit('https://post-here-subreddit.herokuapp.com/api/auth/login')  
})

it('can get a userame', () => {
    cy.get('input[name="username"]')
    .type('Michael')
    .should('have.value', 'Michael')
})

it('can get a email', () => {
    cy.get('input[name="email"]')
    .type('mikemackjr1980@gmail.com')
    .should('have.value', 'mikemackjr1980@gmail.com')
})


it('can get a password', () => {
    cy.get('input[name="password"]')
    .type('abcdefg')
    .should('have.value','abcdefg')
})


it('can submit form', () => {
    cy.get('form').submit()
    
    })
    it('check validation message on invalid input', () => {
        cy.get('[type="username"]').type('michael')
        cy.get('input:invalid').should('have.length', 3)
        cy.get('[type="email"]').type('not_an_email')
        cy.get('[type="password"]').type("ab123456")
        cy.get('input:invalid').should('have.length', 3)
        cy.get('[type="email"]').then(($input) => {
          expect($input[0].validationMessage).to.eq('I expect an email!')
        })
      })

})
