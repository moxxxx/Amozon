import React from 'react'
import { connect } from 'react-redux'
import {  deleteBook , getRecommended} from '../../actions'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import {isAdmin} from "../common";
import SearchForm from './SearchForm'


class StreamList extends React.Component {
    componentDidMount() {
        this.props.getRecommended()
    }
    state = { renderModal: false, selectedStream: null }




    renderList() {
        return this.props.streams.map(book => {
            return (
                <div className="item" key={book.book_id}>
                    {this.renderAdmin(book)}
                    <i className="large middle aligned book icon" />
                    <div className="content">
                        <Link to={`/streams/${book.book_id}`} className="header">
                            {book.book_name}
                        </Link>
                        <div className="description">{"Author: "+ book.author_name}</div>
                        <div className="description">{"Price: " + book.price}</div>
                    </div>
                </div>
            )
        })
    }

    renderAdmin(stream) {
        if (isAdmin(this.props.currentUserId)) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.book_id}`} className="ui button primary">Edit</Link>
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
        if (this.props.isSignIn && isAdmin(this.props.currentUserId)) {
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
                const title = this.state.selectedStream.book_name
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
            this.props.deleteBook(this.state.selectedStream.book_id)
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
    renderSearch = () => {
        return (
            <SearchForm/>
        )
    }



    render() {
        return (
            <div>
                {this.renderSearch()}
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
        streams: state.books,
        currentUserId: state.auth.userId,
        isSignIn: state.auth.isSignIn
    }
}

export default connect(mapStateToProps, { deleteBook, getRecommended })(StreamList)