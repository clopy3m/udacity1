import React from  'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'


class BookList extends React.Component {
	state = {
		books : [],
    }


	moveBook = (book, shelf) => {
		var newBooks = this.state.books.map( el => {
		    if (el.id === book.id)
				return Object.assign({}, el, {shelf: shelf})
			return el
		});
		this.setState({ books : newBooks});
		BooksAPI.update(book, shelf);
    }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books});
		})
    }

	render() {
		const books = this.state.books;
		return <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
					  {books.filter(book => book.shelf === "currentlyReading").map((book) => (
					    <Book book={book} key={book.id} onMove={this.moveBook} />
					 ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {books.filter(book => book.shelf === "wantToRead").map((book) => (
                        <Book book={book} key={book.id} onMove={this.moveBook} />
					 ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter(book => book.shelf === "read").map((book) => (
                        <Book book={book} key={book.id} onMove={this.moveBook} />
					 ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
	}
}

export default BookList