describe('Handle the async request in Cypress', () => {
  it('should be able to wait until a request resoulved', async () => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    let header = { 'Content-type': 'application/json; charset=UTF-8' }
    let createdPostBody = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }
    let updatedPostBody = {
      id: 1,
      title: 'foooooooooooooo',
      body: 'bar',
      userId: 1,
    }
    cy.createPost(createdPostBody).then(res => {
      cy.getPost((Number(res.body.id) - 1).toString()).then(res => {
        cy.put((Number(res.body.id))).then(res => {
          cy.delete((Number(res.body.id))).then(res => {
            cy.log(JSON.stringify(res.body))
          })
          })
      })
    })
  });
});
