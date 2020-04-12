import React from 'react'
import { connect } from 'react-redux'
import { fetchStream , addToBasket} from '../../actions'

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    addTo(){
        console.log("add this to basket")
        this.props.addToBasket(this.props.stream)

    }
    render() {
        if (!this.props.stream) {
            return (
                <div>Loading...</div>
            )
        }
        else {
            const book = this.props.stream
            console.log(book)
            return (
                <div>
                    <h1>{book.book_name}</h1>
                    <h5>{"by: "+ book.author_name}</h5>
                    <h5>{"price : " + book.price}</h5>
                    <h5>{"royalty_rate: " + book.royalty_rate}</h5>
                    <h5>{"ISBN: " + book.isbn}</h5>
                    <h5>{"num of pages: " + book.num_page}</h5>
                    <h5>{"ISBN: " + book.isbn}</h5>
                    <h5>{"inventory: " + book.inventory}</h5>
                    <h5>{"genre_name: " + book.genre_name}</h5>
                    <button onClick={() => { this.addTo()}} className="ui button">Add to Basket</button>
                </div>
            )
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.books[ownProps.match.params.book_id]
    }
}
export default connect(mapStateToProps, { fetchStream , addToBasket})(StreamShow)