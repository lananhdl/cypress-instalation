/* 
The DELETE method is used to delete a resource from a server. 
In this example, the fetch() function is used to send a DELETE request to the JSON placeholder API at the URL https://jsonplaceholder.typicode.com/posts/1. 
This request will delete the resource with the ID of 1 from the server.

Note that the fetch() function returns a Promise, so you will need to use the then() method to handle the response from the server.
*/

import { DEFAULFT } from '../utils/Method'
describe('Testing Delete method', () => {
    it('Should be able send a Delete method reques', () => {
        cy.request({
            mothod: DEFAULFT.delete,
            url: 'https://jsonplaceholder.typicode.com/posts/1',

        }).then(res => {
            // do something with the response
            cy.log(JSON.stringify(res.body));
        })

    });

});