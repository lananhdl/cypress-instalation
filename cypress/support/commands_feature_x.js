let header = { 'Content-type': 'application/json; charset=UTF-8' }

Cypress.Commands.add("getPost", postNumber => {
    cy.request({
        url: Cypress.env("baseUrl") + "/" + postNumber,
        method: 'GET'
    })
})

Cypress.Commands.add("put", postNumber => {
    cy.request({
        method: "PUT",
        url: Cypress.env("baseUrl") + "/" + postNumber,
        header: header,
        body: updatedPostBody
      })
})
Cypress.Commands.add("delete", postNumber => {
    cy.request({
        method: "DELETE",
        url: Cypress.env("baseUrl") + "/" + postNumber
      })
})
