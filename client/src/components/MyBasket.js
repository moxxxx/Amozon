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
                <Link to="/basket" className="item ">
                    <div className="ui vertical animated button" tabIndex="0">
                        <div className="hidden content">{this.props.content}</div>
                        <div className="visible content">
                            <i className="shop icon" style={{width:'50px'}}></i>
                        </div>
                    </div>
                </Link>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return { isSignin: state.auth.isSignIn }
}
export default connect(mapStateToProps)(MyBasket)