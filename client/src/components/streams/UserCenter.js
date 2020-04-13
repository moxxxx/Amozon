import React from 'react'
import { connect } from 'react-redux'


class UserCenter extends React.Component {

    componentDidMount() {
    }

    renderOrder = () =>{
        if (this.props.lastOrder){
            return(
                <div>
                <h5>Your last order number is</h5>
                <h5>{this.props.lastOrder}</h5>
                </div>
            )
        }
    }
    render() {
        if (this.props.isSignIn){
            return (
                <div>
                    User center
                    {this.renderOrder()}
                </div>
            )
        }else{
            return(
                <div>
                  bad thing happened!
                </div>
            )
        }

    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isSignIn: state.auth.isSignIn,
        name: state.auth.name,
        email: state.auth.email,
        lastOrder: state.auth.lastOrder
    }
}
export default connect(mapStateToProps, { })(UserCenter)