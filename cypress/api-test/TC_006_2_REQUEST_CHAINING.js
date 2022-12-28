/* 
cách mình handle request chaining -> request chaining cần khi nào? 
 giả sử mình thực hiện các tác vụ vd giờ mình làm tác vụ: create, read, delete, update,.. 
 tức là mình create item sau đó mình read item đó ra sau đó mình update item đó và mình delete item đó tức là mình gọi là request chaining 1 chuỗi của những request.
Cách handle như thế nao?
Đơn giản trước tiên mình nói đơn giản cách handle 1 single request thôi  bằng sin await (cái này chỉ là single request only thôi, 
  còn nếu chuyển sang request chaining thì phải vô trong then của nó mà dùng)

*/
/*
request chaining là gì? trong cypress
Chaining requests trong Cypress là một tính năng cho phép bạn liên kết các yêu cầu mạng lại với nhau,
 để bạn có thể đảm bảo rằng một yêu cầu được thực hiện trước khi yêu cầu khác được gửi. 
 Điều này có thể rất hữu ích khi bạn muốn kiểm tra một trang web hoặc ứng dụng của bạn, 
 và bạn cần đảm bảo rằng một số hành động đã được thực hiện trước khi bạn thực hiện hành động khác.

Ví dụ, nếu bạn muốn kiểm tra một trang web yêu cầu người dùng đăng nhập trước khi truy cập một số tính năng cụ thể,
 bạn có thể sử dụng chaining requests để đảm bảo rằng yêu cầu đăng nhập được thực hiện trước khi bạn thực hiện yêu cầu truy cập tính năng cụ thể đó.

Để sử dụng chaining requests trong Cypress, 
bạn có thể sử dụng cú pháp .then() sau mỗi yêu cầu mạng. Ví dụ:

*/

/*
cy.request('/login')
 .then(response => {
   // Xử lý kết quả của yêu cầu đăng nhập
 })
 .then(() => {
   // Thực hiện

*/

/*
Request chaining in Cypress refers to the process of making multiple HTTP requests in a row, 
with each request depending on the successful completion of the previous one. 
This can be useful when working with web applications that have complex, 
interconnected APIs or when you need to perform a series of actions that depend on the results of previous actions.
Here's an example of how you might use request chaining in Cypress:
cy.request('POST', '/api/login', { username: 'jane', password: 'password123' })
.then((response) => {
// Save the returned auth token
const authToken = response.body.auth_token;

// Use the auth token to make another request
cy.request({
  method: 'GET',
  url: '/api/items',
  headers: {
    'Authorization': `Bearer ${authToken}`
  }
});
});
In this example, the first request logs the user in and returns an auth token. 
The second request is made with the auth token in the headers, 
which authenticates the user and allows them to access a protected resource.
*/
// Bên TC_006 là single request, vậy trong trường hợp muốn có nhiều cái request
// tức là muốn dùng request chanining () (hay là muốn dùng create- update and delete) buộc mình phải dùng then chaining 
describe('Handle the async request in Cypress', () => {
  it('should be able to wait until a request resoulved', async () => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    let header = { 'Content-type': 'application/json; charset=UTF-8' }
    let createdPostBody = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    let updatedPostBody = {
      id: 1,
      title: 'foooooooooooooo',
      body: 'bar',
      userId: 1,
    }
    cy.request({
      method: "POST",
      url: url,
      header: header,
      body: createdPostBody
    })
      // mình muốn lấy cái mình đã create, lấy thông tin cua nó để mình biết, 
      //hiện tại nó k hiện gì ở back end hết mà nó chỉ tạo API thôi
      // tức là hiện tại nó có 100 posts , sau khi m create thì nó sẽ trả về cho mình result là 101
      // tuy nhiên mình get 101 thì nó k có tại vì nó fake api cho nên mình lấy thằng phía trên về mình trừ đi cho 1
      // thì nó phải trả về cho m là 100 nếu nó đúng 
      //=> lấy về đc và tui muốn dùng kết quả này để làm vậy m dùng cái .then nữa nè
      // res là kq từ bên trên
      .then(res => {
        cy.log(JSON.stringify(res.body)) // id nó ra 101, giờ mình muốn lấy cái response này ra 
        cy.request({
          // để gọi thì cy.request (nhận vào 1 object)
          url: url + "/" + (Number(res.body.id) - 1).toString(), // .toString để nó ra string,  mục đich là : https://jsonplaceholder.typicode.com/posts/100
          method: 'GET'
        })
      }).then(res => {
        cy.log(JSON.stringify(res.body)) // id nó ra 100 
        // Giả sử minh muốn lấy result của GET trên để update tiếp
        cy.request({
          method: "PUT",
          url: url + "/" + res.body.id,
          header: header,
          body: updatedPostBody
        }).then(res => {
          cy.log(JSON.stringify(res.body)) // Đã update cho id 100
          // // Giả sử minh muốn lấy result của PUT trên và delete
          cy.request({
            method: "DELETE",
            url: url + "/" + res.body.id
          }).then(res => {
            cy.log(JSON.stringify(res.body))
          })
        })
      })
  })
});
//Tóm lại có 2 ý chính
// 1: Nếu có 1 single request mà muốn làm cho gọn tức là chờ xong verify OK dùng async - await được
//2: Nếu có multiple request chaining thì quên đi async - await mà sử dung .then lồng nhau như phía trên