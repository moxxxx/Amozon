import React from 'react'
import { connect } from 'react-redux'
import {  register } from '../../actions'
import {Link} from "react-router-dom";


class ShowBasket extends React.Component {

    componentDidMount() {
        if (this.props.userId){
            try {this.props.register(null)}
            catch(error){
                console.log("new user non record")
            }
        }
    }
    renderBookList = () =>{
        return this.props.basket.map(book => {
            return (
                <div className="item" key={book.id}>
                    <i className="large middle aligned book icon" />
                    <div className="content">
                        <Link to={`/streams/${book.book_id}`} className="header">
                            {book.book_name}
                        </Link>
                        <div className="description">{"Price: " + book.price}</div>
                    </div>
                </div>
            )
        })
    }
    renderCheckout(){
        return(
            <Link to={`/checkout`} className="header">
                <div className="ui left action input">
                    <button className="ui teal labeled icon button">
                        <i className="cart icon"></i>
                        Checkout
                    </button>
                    <input type="text" value={'Your total is '+this.renderTotal()} />
                </div>
            </Link>

        )
    }
    renderTotal(){
        var total = 0.0
        let books = this.props.basket
        for (let book of books){
            total += parseFloat(book.price.substring(1,book.price.length))
        }
        return total

    }


    render() {
        if (this.props.basket.length === 0){
            return (
                <div>
                    Your basket is empty
                </div>
            )
        }else{
            return(
                <div>
                    Your Basket
                <div className="ui celled list">{this.renderBookList()}</div>
                    {this.renderCheckout()}
                </div>
            )
        }

    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isSignIn: state.auth.isSignIn,
        basket: state.basket
    }
}
export default connect(mapStateToProps, { register})(ShowBasket)