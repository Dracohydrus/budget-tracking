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
        cy.get('input[type="text"]').type("kris@prosoftxp.com")
        cy.get('input[type="password"]').type("prosoft1031*")
        cy.get('button[type="submit"].loginButton').click()
        cy.get('.topRight')
            .contains('LOGOUT')
    });

    it("Valid Login with Enter on Email", () => {
        cy.get('input[type="password"]').type("prosoft1031*")
        cy.get('input[type="text"]').type("kris@prosoftxp.com").type("{Enter}")
        cy.get('.topRight')
            .contains('LOGOUT')
    })

    it("Valid Login with Enter on Password", () => {
        cy.get('input[type="text"]').type("kris@prosoftxp.com")
        cy.get('input[type="password"]').type("prosoft1031*").type("{Enter}")
        cy.get('.topRight')
            .contains('LOGOUT')
    })

    it("Invalid Login with existing email", () => {
        cy.get('input[type="text"]').type("notarealemail@nothing.com")
        cy.get('input[type="password"]').type("password123")
        cy.get('button[type="submit"].loginButton').click()
        cy.contains('Invalid Credentials')
    })

    it("Invalid Login with non-existing email", () => {
        cy.get('input[type="password"]').type("password123")
        cy.get('button[type="submit"].loginButton').click()
        cy.contains('Invalid Credentials')
    })
});

describe('Logout', () => {
    beforeEach(() => {
        cy.visit(SIGN_IN)
        cy.get('input[type="text"]').type("kris@prosoftxp.com")
        cy.get('input[type="password"]').type("prosoft1031*")
        cy.get('button[type="submit"].loginButton').click()
    });

    it("Logout", () => {
        cy.get('li:contains(LOGOUT)').click()
        cy.contains('LOGIN')
        cy.contains('REGISTER')
    })
})