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
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="desc" component={this.renderInput} label="Enter Description" />
                <Field name="price" component={this.renderInput} label="Enter Price" />
                <button className="ui button primary">Submit</button>
            </form >
        )
    }
}
const validate = formValues => {
    const errors = {}
    if (!formValues.title) {
        // user no entering title
        // console.log('no title')
        errors.title = "you must enter a title"
    }
    if (!formValues.desc) {
        // console.log('no desc')
        errors.desc = "you must enter a description"
    }
    return errors // empty object meaning is valid
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)