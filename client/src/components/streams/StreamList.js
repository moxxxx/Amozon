import React from 'react'
import { connect } from 'react-redux'
import { fetchStreams, deleteStream } from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams()
    }
    state = { renderModal: false, selectedStream: null }


    renderList() {
        return this.props.streams.map(book => {
            return (
                <div className="item" key={book.id}>
                    {this.renderAdmin(book)}
                    <i className="large middle aligned book icon" />
                    <div className="content">
                        <Link to={`/streams/${book.id}`} className="header">
                            {book.title}
                        </Link>
                        <div className="description">{book.desc}</div>
                        <div className="description">{"Price: " + book.price}</div>
                    </div>
                </div>
            )
        })
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <button
                        className="ui button negative" onClick={
                        () => {
                            this.setState({ selectedStream: stream })
                            this.setState({ renderModal: true })
                        }}
                    >Delete</button>
                </div>
            )
        }else{ //customer!
            return(
                <div className="right floated content">
                    <button
                        className="ui button" onClick={
                        () => {
                            this.setState({ selectedStream: stream })
                            this.setState({ renderModal: true })
                        }}
                    >Add to Basket</button>
                </div>
            )

        }
    }
    renderCreate() {
        // console.log(this.props.isSignin)
        if (this.props.isSignIn) {
            return (
                <div>
                    <Link to="/streams/new" className="ui button primary">
                        create stream
                    </Link>
                </div>
            )
        }
    }
    restModal = () => {
        this.setState({ renderModal: false })
        console.log('reset')
    }
    renderModal = () => {
        if (this.state.renderModal === true) {
            if (this.state.selectedStream) {
                const title = this.state.selectedStream.title
                return <Modal
                    onDismiss={this.restModal}
                    title="Delete Stream"
                    content={`Are you sure you want to delete ${title}?`}
                    actions={this.renderAction()}
                />
            }
        }
    }
    deleteThis = () => {
        if (this.state.selectedStream) {
            this.props.deleteStream(this.state.selectedStream.id)
        }
    }
    renderAction = () => {
        return (
            <>
                <button onClick={() => {
                    this.deleteThis()
                    this.restModal()
                }} className="ui button negative">Delete</button>
                <button onClick={() => { this.restModal() }} className="ui button">cancel</button>
            </>
        )
    }


    render() {
        return (
            <div>
                <h2>Recommended</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
                {this.renderModal()}
            </div>

        )
    }

}
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignIn: state.auth.isSignIn
    }
}

export default connect(mapStateToProps, { fetchStreams, deleteStream })(StreamList)