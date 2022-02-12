// sample_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { SIGN_IN } from "../constants";
const { beforeEach } = require("mocha")

describe('My First Test', () => {
    it('Visit the Kitchen Site', () => {
        cypress.visit('https://example.cypress.io')
    })
})

describe('Login Test', () => {
    beforeEach(() => {
        cy.visit(SIGN_IN)
    });

    it("Valid Login Test", () => {
        cy.get("[data-test-di=user_email]").type("dracokris123@gmail.com");

        cy.get("[data-test-di=user_password]").type("");

        cy.get("[name=commit]").click()

        cy.contains("Sign Out")
    });
});