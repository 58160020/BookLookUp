function BookLookUp(AmazonService){
  this.AmazonService = AmazonService
  this.Search = (isbn) => {
    var obj = this.AmazonService(isbn)
    return {
      bookname : obj.title ,
      cover : obj.image ,
      isbn: '0000000000'
    }
  }
}

test('BookLookUp - Amazon-Mock',() => {
  const BookLookUpMock = jest.fn()
  .mockReturnValue({
    title:'One Thousand and One Nights',
    image : ' One Thousand and One Nights ',
    isbn: '0001001000'
  })
  var auth = new BookLookUp(BookLookUpMock)
  var bookname = 'One Thousand and One Nights'
  var isbn = '0001001000'
  var bookInfo = auth.Search(isbn)

  expect(BookLookUpMock).toHaveBeenCalled()
  expect(BookLookUpMock).toHaveBeenCalledWith(isbn)
  expect(bookInfo.bookname).toBe('One Thousand and One Nights')
  expect(bookInfo).toHaveProperty('isbn')
  expect(bookInfo.isbn).toHaveLength(10)
})
