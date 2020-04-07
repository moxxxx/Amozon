import React from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
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
                    <h1>{book.title}</h1>
                    <h5>{book.desc}</h5>
                    <h5>{book.price}</h5>

                </div>
            )
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, { fetchStream })(StreamShow)