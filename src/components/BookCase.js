import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from  'prop-types'

class BookCase extends Component{

  static propTypes = {
    books : PropTypes.array.isRequired
  }

  handleChangeBookShelf = (book, newShelf) => { this.props.onChangeBookShelf(book, newShelf) }

	render() {
    console.log('currentlyReading do BookCase',this.props.books.filter(bs => bs.shelf === 'currentlyReading'))
		return (
            			
            <div className="list-books-content">
              <div>

                  <BookShelf 
                      title = 'Currently Reading'
                      keySehlf = 'currentlyReading'
                      books={this.props.books.filter(bs => bs.shelf === 'currentlyReading')}
                      onChangeBookShelf = {this.props.onChangeBookShelf}// passando a função direto para o BookShelf
                  />
                  
                  <BookShelf
                      title = 'Want to Read'
                      keySehlf = 'wantToRead'
                      books={this.props.books.filter(bs => bs.shelf === 'wantToRead')}
                      onChangeBookShelf = {this.handleChangeBookShelf}
                  />

                  <BookShelf
                      title = 'Read'
                      keySehlf = 'read'
                      books={this.props.books.filter(bs => bs.shelf === 'read')}
                      onChangeBookShelf = {this.handleChangeBookShelf}

                  />
              </div>
            </div>         

		)
	}
}
export default BookCase