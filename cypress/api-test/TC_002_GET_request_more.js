//by defaul create by mocha framework
describe('Test GET request', () =>{ //từ khóa describe (nhận vô 2 thông số: 1 là string , 2 là callback function ) callback function có thể viết 2 cách là : function(){ } hoặc () =>{} cach thứ 2 này là around function 
    it('should be able to send GET request and verify the response',() =>{ // it block cũng nhận y chang 2 tham số của describe
        cy.request({ // để gọi thì cy.request (nhận vào 1 object)
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET'
        }).then(response => {    // khi request như vậy nó sẽ return về cho mình 1 cái  promised
           let {status, body} = response
            expect(status).to.equal(200) // expect để verify (doc them tai https://www.chaijs.com/)
            expect(body.length).to.eq(100)
            // get a random element from array object
          let randomIndex =  Math.random() * body.length
           let roundedRandomIndex= Math.floor(randomIndex)
           let randomObject = body[roundedRandomIndex]

           // verifycation
           verifyNotEmpty('userID',randomObject.userId)
           verifyNotEmpty('Id',randomObject.id)
           verifyNotEmpty('title',randomObject.title)
           verifyNotEmpty('userID',randomObject.body)
        })    
    })
})
let verifyNotEmpty = (name, data) =>{
    if(!data){
    expect(true).to.eq(false,`${name} The data is empty`)
    }
}