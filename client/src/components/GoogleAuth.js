import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    state = { name: null }
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '625040578544-6gapikum1dqihd6g2lqhvua4ihppnv34.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                console.log(this.auth)
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })

    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            //console.log(this.auth)
            //refer to :   https://developers.google.com/identity/sign-in/web/reference
            let userInfo = {id: this.auth.currentUser.get().getId(), name: this.auth.currentUser.get().getBasicProfile().getGivenName()}
            this.props.signIn(userInfo)
            //then query from pour database?


        } else {
            this.props.signOut()
        }
    }
    onSignInClick = () => {
        this.auth.signIn()
    }
    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignin === null) {
            return null
        }
        else if (this.props.isSignin) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    sign out
                </button>
            )
        }
        else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon" />
                    sign in with Google
                </button>
            )
        }
    }
    renderName() {
        //console.log(this.state)
        if (this.props.name) {
            return <div>Hello! {this.props.name}</div>
        } else if (this.props.isSignedIn) {
            return <div>Hello!</div>
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
                {this.renderName()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { isSignin: state.auth.isSignIn, name: state.auth.name }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)