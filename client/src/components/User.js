import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class MyBasket extends React.Component {
    render() {
        if (this.props.isSignin === false) {
            return (
                <div> Please sign in </div>
            )
        }
        else{
            return (
                <Link to="/user_center" className="item ">
                    <i className="user icon"></i>
                </Link>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return { isSignin: state.auth.isSignIn }
}
export default connect(mapStateToProps)(MyBasket)