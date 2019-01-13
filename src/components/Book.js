import React, { Component } from 'react'
import PropTypes from 	'prop-types'
import imgToCover from '../images/not-found-img.png'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		changeBookShelf: PropTypes.func.isRequired
	}

	shelfChange = (e) => {
		let newShelf = e.target.value
		this.props.changeBookShelf(this, newShelf)
	}

	render(){
		const {title} = this.props.book.title ? this.props.book : 'No title available'
		const {authors} = this.props.book.authors ? this.props.book : 'No authors available'
		const coverImg = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail
			? this.props.book.imageLinks.thumbnail : imgToCover

		const {book, books} = this.props
		let currentShelf = 'none'

		for (let bk of books){
			if(bk.id === book.id){
				currentShelf = bk.shelf
				break
			}
		}

		return(
                 <div className="book">
                    <div className="book-top">
		                <div className="book-cover .not-found-img" style={{ width: 128, height: 193, backgroundImage: `url(${coverImg})` }}></div>   
                            <div className="book-shelf-changer">
	                            <select onChange={this.shelfChange} defaultValue={currentShelf}>
	                                <option value="move" disabled>Move to...</option>
	                                <option value="currentlyReading">Currently Reading</option>
	                                <option value="wantToRead">Want to Read</option>
	                                <option value="read">Read</option>
	                                <option value="none">None</option>
	                            </select>
                            </div>
                    </div>
                	<div className="book-title">{title}</div>
                	<div className="book-authors">{authors}</div>
                </div>
		)
	}
}

export default Book