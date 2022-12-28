describe('Handle the async request in Cypress', function()  {
    it('should be able to wait until a request resoulved', async function()  {
        // trước khi sử dung  let response= await thì trước dầu () cần có async vì await k đứng riêng 1 mình được
        // chờ cho khúc response xong thì mới lấy kq được
       let response= await cy.request({    
            url:'https://jsonplaceholder.typicode.com/posts',
            method:'GET'
        })// Single request thay vì mình dùng .then ở chỗ này như TC_001_GET_request thì m dùng support request cho verification
        // Giả sử bỏ await ra thì khúc  verify k được vì lúc này response giống như 1 promise life vì nó thực sự k phải là real promise
        expect(response.status).to.equal(200) 
        expect(response.body.length).to.eq(100)
    });
    // Bên trên là Single
});