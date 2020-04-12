import React from 'react'
import { connect } from 'react-redux'
import { createBook } from '../../actions'
import StreamForm from './StreamForm'
class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues) // will print out the value in the Field
        this.props.createBook(formValues)
    }

    render() {
        return (
            <div>
                <h3>Add a book</h3>
                <StreamForm onSubmit={this.onSubmit} initialValues={{
                    price: '10.9',
                    book_name: 'Lily',
                    author_name: 'jojo',
                    pub_date : '4/29/2020',
                    royalty_rate: '0.3',
                    inventory: '100',
                    num_page:'100',
                    on_shelf:'1'
                }} />
            </div>
        )
    }
}

export default connect(null, { createBook })(StreamCreate)