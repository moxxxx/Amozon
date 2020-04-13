import React from 'react'
import { connect } from 'react-redux'
import  {isAdmin} from '../common'
import SearchOrderForm from './SearchOrderForm'

class UserCenter extends React.Component {

    componentDidMount() {
    }

    renderLastOrder = () =>{
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
        if (this.props.userId && isAdmin(this.props.userId)){
            return<div>{this.renderAdminPage()}</div>
        }else{

            return<div>{this.renderUserPage()}</div>
        }
    }
    renderAdminPage = () =>{
        return(
            <div>
                <h1>Admin Center</h1>
            </div>
        )
    }
    renderGetOrder = () => {
        if (this.props.orderDetail){
            let orderDetail = this.props.orderDetail
            return(
                <div>
                    <div>Order Number : {orderDetail.order_number}</div>
                    <div>Total Value : {orderDetail.total_value}</div>
                    <div>Shipping Status : {orderDetail.status}</div>
                    <div>Total Value : {orderDetail.total_value}</div>
                    <div>Credit Card Numb: {orderDetail.credit_num}</div>
                    {orderDetail.isPaid ? (<div>Is Paid</div>) :  (<div>Has not yet paid</div>)
                    }
                </div>
            )
        }

    }

    renderUserPage = () =>{
        if (this.props.isSignIn){
            return (
                <div>
                    <h1>User center</h1>
                    {this.renderLastOrder()}
                    <SearchOrderForm />
                    {this.renderGetOrder()}
                </div>
            )
        }else
            return <div>bad thing happened!</div>
    }




}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isSignIn: state.auth.isSignIn,
        name: state.auth.name,
        email: state.auth.email,
        lastOrder: state.auth.last_order,
        orderDetail: state.auth.orderDetail
    }
}
export default connect(mapStateToProps, { })(UserCenter)