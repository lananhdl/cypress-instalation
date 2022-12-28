//by defaul create by mocha framework
describe('Test POST request', () => {
    //từ khóa describe (nhận vô 2 thông số: 1 là string , 2 là callback function ) 
    //callback function có thể viết 2 cách là : function(){ } hoặc () =>{} cach thứ 2 này là around function 

    // it block cũng nhận y chang 2 tham số của describe
    it('should be able to send POST request and get the response', () => {
        let header = { 'Content-type': 'application/json; charset=UTF-8' }
        let requestBody = {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        let url ='https://jsonplaceholder.typicode.com/posts'
        let requestObject ={
            method: 'POST',
            url: url,
            header: header,
            body: requestBody
        }
        cy.request(requestObject)
        .then(res => {
           cy.log(JSON.stringify(res.body));
           let{status, body} = res
           let responseBody= body.body
           let{userId, id, title} = body
           
           //verifycation
           expect (status).to.eq(201,'Status is not 201')
            expect(userId).to.eq(requestBody.userId, 'UserId is not correct')
            expect(title).to.eq(requestBody.title, 'title is not correct')
            expect(responseBody).to.eq(requestBody.body, 'body is not correct')
        
        })
    })
})