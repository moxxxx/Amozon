import React from 'react'
import { Field, reduxForm } from 'redux-form'

class PaymentForm extends React.Component {
    renderInput = ({ label, input, meta }) => {
        //console.log(meta)
        return (
            <div className='field'>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
        // let parent to pass down onSubmit and call it!
    }

    render() {
        return (
            <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="recipients" component={this.renderInput} label="recipients" />
                <Field name="ship_address" component={this.renderInput} label="Address" />
                <Field name="credit_card" component={this.renderInput} label="Credit Card Number" />
                <Field name="phone" component={this.renderInput} label="Phone Number" />
                <button className="ui button primary">Pay</button>
            </form >
        )
    }
}
const validate = formValues => {
    const errors = {}
    if (!formValues.credit_card) {
        // user no entering title
        // console.log('no title')
        errors.credit_card = "you must enter a credict card number"
    }
    if (!formValues.ship_address) {
        // console.log('no desc')
        errors.ship_address = "you must enter a shipping address"
    }
    return errors // empty object meaning is valid
}

export default reduxForm({
    form: 'streamForm',
    validate
})(PaymentForm)