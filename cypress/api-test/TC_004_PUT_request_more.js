/* 
To test the API using the PUT method with Cypress, you can follow these steps:

Open your Cypress test suite and navigate to the test file where you want to write the test for the API.

Import the cy.request command from Cypress. This command allows you to send HTTP requests from your tests.

Use the cy.request command to send a PUT request to the API endpoint https://jsonplaceholder.typicode.com/posts/1. 
Set the method option to 'PUT' and the body option to a stringified version of the data you want to send with the request. 
You can also set the headers option to specify the content type of the request.

Add an .then block to the cy.request command to handle the response from the API. In this block,
 you can use the response.json() method to parse the response body as JSON. 
 You can then log the response data to the console using console.log(json).
*/
describe('Test PUT method request', () => {
    it('should be able to send a request with PUT method', () => {
        let requestbody = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: {
              id: 1,
              title: 'foo',
              body: 'bar',
              userId: 1,
            },
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then((response) => {
            // You can use the 'response' object to make assertions about the response
            // For example, you can check the status code, the headers, or the body
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(response.body).to.have.property('id', 1);
            expect(response.body).to.have.property('title', 'foo');
            expect(response.body).to.have.property('body', 'bar');
            expect(response.body).to.have.property('userId', 1);
          });
        });

});             