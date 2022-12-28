//by defaul create by mocha framework
describe('Test GET request', () =>{ 
    //từ khóa describe (nhận vô 2 thông số: 1 là string , 2 là callback function ) 
    //callback function có thể viết 2 cách là : function(){ } hoặc () =>{} cach thứ 2 này là around function 

    it('should be able to send GET request and verify the response',() =>{ 
        // it block cũng nhận y chang 2 tham số của describe
        cy.request({ 
            // để gọi thì cy.request (nhận vào 1 object)
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET'
        }).then(response => {    
            // khi request như vậy nó sẽ return về cho mình 1 cái  promised
            cy.log(JSON.stringify(response.body)) 
            // chuyển object thành dạng string và có thể in ra
            expect(response.status).to.equal(200) // expect để verify (doc them tai https://www.chaijs.com/)
            expect(response.body.length).to.eq(100)
        })    
    })
})