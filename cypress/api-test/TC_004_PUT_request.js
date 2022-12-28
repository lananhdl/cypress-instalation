describe('Test PUT method request', () => {
    it('should be able to send a request with PUT method', () => {
        let requestbody = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
        cy.request({
            method:'PUT',
            url:'https://jsonplaceholder.typicode.com/posts/1',
            header:{'Content-type': 'application/json; charset=UTF-8'},
            body: requestbody
        }).then(res =>{
            let{status} = res
            let resbody =res.body
            expect(status).to.eq(200,' Verify Response header')
            let{userId,id,title,body} =resbody
            expect(userId).to.eq(requestbody.userId,'Verify userID')
            expect(id).to.eq(requestbody.id,'Verify id')
            expect(title).to.eq(requestbody.title,'Verify title')
            expect(body).to.eq(requestbody.body,'Verify body')
            cy.log(JSON.stringify(res));
        })
    });

});             