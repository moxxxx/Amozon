import React from 'react'
import { connect } from 'react-redux'
import { emptyBasket } from '../../actions'
import PaymentForm from './PaymentForm'
class Checkout extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues) // will print out the value in the Field
        //this.props.createStream(formValues)
        this.props.emptyBasket()
    }

    render() {
        return (
            <div>
                <h3>Make a Payment</h3>
                <PaymentForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default connect(null, {emptyBasket })(Checkout)