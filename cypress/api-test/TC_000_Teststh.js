describe('Print something out',() =>{
    it('Test sth ...',() =>{
        cy.log('Hello')
        
    })
})
// có thể thay đổi đường dẫn để run trong cypress.config.js
// để run thì gõ trong terninal : yarn test => Nó chạy hết tất cả các test cases
// Nếu như chỉ muốn run cái m vừa develop thì yarn test --spec cypress/api-test/Tên test case cần chạy

//Hoặc nếu mình để evn để run trong CI hoặc terminal thì 
// vd bài 6 đi: mình sửa chỗ khai báo: let url = 'https://jsonplaceholder.typicode.com/posts' là 
// let url = Cypress.env("baseURL")
// khi run mình dùng : yarn test --spec cypress/api-test/Tên test case cần chạy --evn baseURL=https://jsonplaceholder.typicode.com/posts
