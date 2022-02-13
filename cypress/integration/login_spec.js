// sample_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { SIGN_IN } from "../constants";

describe('Login', () => {
    beforeEach(() => {
        cy.visit(SIGN_IN)
    });

    it("Valid Login", () => {
        cy.getBySel('email').type('kris@prosoftxp.com')
        cy.getBySel('password').type("prosoft1031*")
        cy.getBySel('login-button').click()
        cy.contains('LOGOUT')
    });

    it("Valid Login with Enter on Email", () => {
        cy.getBySel('password').type("prosoft1031*")
        cy.getBySel('email').type("kris@prosoftxp.com").type("{Enter}")
        cy.contains('LOGOUT')
    })

    it("Valid Login with Enter on Password", () => {
        cy.getBySel('email').type("kris@prosoftxp.com")
        cy.getBySel('password').type("prosoft1031*").type("{Enter}")
        cy.contains('LOGOUT')
    })

    it("Invalid Login with existing email", () => {
        cy.getBySel('email').type("notarealemail@nothing.com")
        cy.getBySel('password').type("password123")
        cy.getBySel('login-button').click()
        cy.contains('Invalid Credentials')
    })

    it("Invalid Login with non-existing email", () => {
        cy.getBySel('password').type("password123")
        cy.getBySel('login-button').click()
        cy.contains('Invalid Credentials')
    })
});

describe('Logout', () => {
    beforeEach(() => {
        cy.visit(SIGN_IN)
        cy.getBySel('email').type("kris@prosoftxp.com")
        cy.getBySel('password').type("prosoft1031*")
        cy.getBySel('login-button').click()
    });

    it("Logout", () => {
        cy.getBySel('logout-button').click()
        cy.contains('LOGIN')
        cy.contains('REGISTER')
    })
})