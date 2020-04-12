import React from 'react'
import { connect } from 'react-redux'


class UserCenter extends React.Component {

    componentDidMount() {
    }

    render() {
        if (this.props.isSignIn){
            return (
                <div>
                    User center
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
        email: state.auth.email
    }
}
export default connect(mapStateToProps, { })(UserCenter)