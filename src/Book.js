import React from  'react';


class MoveForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {value: 'none'};

    this.handleChange = this.handleChange.bind(this);
  }

   handleChange(event) {
    this.setState({value: event.target.value});
	this.props.onMove(event.target.value);
  }

  render() {
	const selected = this.props.selected;
    return (
      <form>
        <div className="book-shelf-changer">
		  <select defaultValue={selected} onChange={this.handleChange}>
			<option value="move" disabled>Move to...</option>
			<option value="currentlyReading">Currently Reading</option>
			<option value="wantToRead">Want to Read</option>
			<option value="read">Read</option>
			<option value="none">None</option>
		  </select>
		</div>
      </form>
    );
  }
}


class Book extends React.Component {

	onMove = (shelf) => {
		this.props.onMove(this.props.book, shelf);
	}

	render() {
		const book = this.props.book;
		return <li key={book.id}>
			<div className="book">
			  <div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
				<MoveForm selected={book.shelf} onMove={this.onMove} />
			  </div>
			  <div className="book-title">{book.title}</div>
			  <div className="book-authors">{book.author}</div>
			</div>
		</li>
	}
}

export default Book