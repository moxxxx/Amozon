import React from 'react'
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'
class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues) // will print out the value in the Field
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <h3>Add a book</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default connect(null, { createStream })(StreamCreate)