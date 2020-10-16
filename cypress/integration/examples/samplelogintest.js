Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('Test Login Process', () => {
    it('should be able to log in the Test Site and show correct information', () => {
        cy.visit('https://hunt2020.herokuapp.com/Login');

        const Email = Cypress.env('Email');
        const password = Cypress.env('password');
        // cy.get('input#Email').clear().type(Email);
        cy.get('[type="text"]')
            .type('s538295@nwmissouri.edu').clear().type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')
        cy.get('[type="password"]').clear().type('passwod')
        cy.get('#login')
        cy.get('[class="btnText"]').click()
        cy.get('#register').click()

    });
});