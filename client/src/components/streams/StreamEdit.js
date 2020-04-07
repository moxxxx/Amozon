import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'
import pick from 'lodash/pick'

class StreamEdit extends React.Component {
    componentDidMount() {
        // console.log(this.props.match.params.id)
        this.props.fetchStream(this.props.match.params.id)
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.editStream(this.props.match.params.id, formValues)
    }
    render() {
        if (!this.props.stream) {
            return (<div>loading</div>)
        } else if (this.props.userId === this.props.stream.userId) {
            return (<div>
                <h3>eidt</h3>
                <StreamForm initialValues={pick(this.props.stream, 'title', 'desc')} onSubmit={this.onSubmit} />
            </div>)
        } else if (!this.props.userId) {
            return (<div>you have to login to edit!</div>)
        } else {
            return (
                <div>
                    Stream Edit
                </div>
            )
        }
    }
}
const mapStateToProps = (state, props) => {
    // console.log(props)
    return { stream: state.streams[props.match.params.id], userId: state.auth.userId }
} // props can access all props in the StreamEdit component
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)