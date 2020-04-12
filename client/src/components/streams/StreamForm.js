import React from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends React.Component {
    renderInput = ({ label, input, meta }) => {
        // console.log(formProps);
        /*
        return <input
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        />
        */
        // console.log(meta)
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
                <Field name="book_name" component={this.renderInput} label="Enter Title(book name)" />
                <Field name="inventory" component={this.renderInput} label="Enter inventory" />
                <Field name="num_page" component={this.renderInput} label="Enter number of page" />
                <Field name="author_name" component={this.renderInput} label="Enter author" />
                <Field name="genre_name" component={this.renderInput} label="Enter genre name" />
                <Field name="royalty_rate" component={this.renderInput} label="Enter royalty rate" />
                <Field name="pub_date" component={this.renderInput} label="Enter published date   ('3/12/1994', ‘4/29/2020’) " />
                <Field name="pub_id" component={this.renderInput} label="Enter pub_id (1~5)" />
                <Field name="price" component={this.renderInput} label="Enter price" />
                <Field name="isbn" component={this.renderInput} label="Enter isbn" />
                <Field name="on_shelf" component={this.renderInput} label="Enter shelf (1/0)" />
                <button className="ui button primary">Submit</button>
            </form >
        )
    }
}
const validate = formValues => {
    const errors = {}
    if (!formValues.book_name) {
        // user no entering title
        // console.log('no title')
        errors.book_name = "you must enter a title"
    }
    if (!formValues.inventory) {
        // console.log('no desc')
        errors.inventory = "you must enter a description"
    }
    if (!formValues.public_name) {
        // console.log('no desc')
        errors.public_name = "you must enter a description"
    }
    if (!formValues.num_page) {
        // console.log('no desc')
        errors.num_page = "you must enter a description"
    }
    if (!formValues.author_name) {
        // console.log('no desc')
        errors.author_name = "you must enter a description"
    }
    return errors // empty object meaning is valid
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)