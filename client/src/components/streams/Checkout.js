import React from 'react'
import { connect } from 'react-redux'
import { emptyBasket, sendOrder } from '../../actions'
import PaymentForm from './PaymentForm'
import {sumUpBooks} from '../common'

class Checkout extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues) // will print out the value in the Field
        //this.props.createStream(formValues)
        if (this.props.isSignIn && this.props.basket){
            let basket = this.props.basket
            let books = sumUpBooks(basket)
            let orderInfo = {...formValues, ...books, cus_email: this.props.email}
            console.log(orderInfo)
            this.props.sendOrder(orderInfo)
            this.props.emptyBasket()
        }


    }

    render() {
        return (
            <div>
                <h3>Make a Payment</h3>
                <PaymentForm onSubmit={this.onSubmit}  />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isSignIn: state.auth.isSignIn,
        name: state.auth.name,
        email: state.auth.email,
        basket: state.basket
    }
}

export default connect(mapStateToProps, {emptyBasket , sendOrder })(Checkout)