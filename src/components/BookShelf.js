import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

function BookShelf(props)  {
		
		let handleChangeBookShelf = (book, shelf) => {props.onChangeBookShelf(book, shelf)}

		return(

			<div className="bookshelf">
                <h2 className="bookshelf-title">{props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                     {props.books.map( (book) => (

                     	<li key={book.id}>
                     		
                     		<Book
                     			book = {book}
                     			books = {props.books}
                     			changeBookShelf = {handleChangeBookShelf}
                     		/>

                     	</li>	

                     ) )}
                      
                    </ol>
                </div>
            </div>

		)
	
}

BookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
}

export default BookShelf