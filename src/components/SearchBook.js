import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import PropTypes from  'prop-types'

class AddBook extends Component{

	static propTypes = {
		books: PropTypes.array.isRequired,
    	onChangeBookShelf : PropTypes.func.isRequired
  	}

  	state = {
  		stateQuery: '',
  		booksQuery: [],
  		searchError: false
  	}

  	handleChangeBookShelf = (book, shelf) => {this.props.onChangeBookShelf(book, shelf)}

	updateQuery = (query) => {

		// handles a invalid search
		if(query.length === 0 && query === ''){

			this.setState( () => ({
				stateQuery: '',
				booksQuery: [],
				searchError: false
			}) )

			return false
		}

		BooksAPI.search(query.trim(), 20).then( (books) => {
			if(books !== undefined && books.error !== "empty query"){
				this.setState({
					stateQuery: query,
					booksQuery : books,
					searchError: false
				})
			}else{
				this.setState({
					stateQuery: '',
					booksQuery: [],
					searchError: true
				})
			}

		} )
	}

	//used to clear query and state on search page exit
	clearQuery = () => {
		this.setState( () => ({
			stateQuery: '',
			booksQuery: [],
			searchError: false
		}) )
	}

	render() {
		let {stateQuery, booksQuery} = this.state

		return(

			<div className="search-books">
            	<div className="search-books-bar">

	              	<Link className='close-search' to='/' onClick={this.clearQuery}>Close</Link>

	              	<div className="search-books-input-wrapper">	              	
	                	<input type="text" 
	                		   placeholder="Search by title or author"
	                		   defaultValue={stateQuery}	                            		   
	                   		   onChange={ (event) => this.updateQuery(event.target.value) }
	                	/>
	              	</div>
           		</div>
	            <div className="search-books-results">

	              <ol className="books-grid">
	   
	              		{
	              			this.state.searchError === true && (
	              				<h2>No Results Found! </h2>
	              			) 
	              		}
	              		{
	              			(this.state.searchError === false && stateQuery !== '') && (
		              			booksQuery.map( (book) =>(
			              			<li key={book.id}>
			              				<Book
			              					book = {book}
			              					books = {this.props.books}
			              					changeBookShelf = {this.handleChangeBookShelf}
			              				/>
			              			</li>
		              			) )
	              			) 
	              		}
	              </ol>
	            </div>
          	</div>			

		)
	}
}

export default AddBook