import React from 'react'
import SearchBook from './components/SearchBook'
import BookCase from './components/BookCase'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'

class BookApp extends React.Component {
  state = {
    
    books: []
    
  }

  componentDidMount(){
   BooksAPI.getAll()
          .then((books) => {
          this.setState(() => ({
              books 
        })) 
      })
    console.log('Books', this.state.books)
  }

  changeBookShelf = (book, newShelf) => {

        book.props.book.shelf = newShelf;

       this.setState( (state) => ({
          books: state.books.filter( (b) => b.id !== book.props.book.id).concat([book.props.book])
      }))

        BooksAPI.update(book.props.book, newShelf)
  }

  render() {
    console.log('Books do App', this.state.books)
    return (
      <div className="app">
        <Route exact path='/' render={ () => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

              <BookCase 
                books = {this.state.books}
                onChangeBookShelf = {this.changeBookShelf}
              />

            <Link to='/search' className="open-search">Add a book</Link>
          </div>

          )}
        />
        <Route path='/search' render={ () => (
            <SearchBook
              books = {this.state.books} 
              onChangeBookShelf = {this.changeBookShelf}
            />
          )}
        />
        
      </div>
    )
  }
}

export default BookApp
