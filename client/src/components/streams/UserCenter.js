import React from 'react'
import { connect } from 'react-redux'
import  {isAdmin} from '../common'
import SearchOrderForm from './SearchOrderForm'
import {renderReport} from '../../actions'

class UserCenter extends React.Component {

    componentDidMount() {
        if (isAdmin(this.props.userId)){
            this.props.renderReport()
        }
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

    renderTotalReport = () => {
        if (this.props.totalReport){
            let report =  this.props.totalReport
            return(
                <div>
                    <h5>Here is the report: </h5>
                    <div>Total Sale : {report.total_sale}</div>
                    <div>Total Expenditure : {report.total_expenditure}</div>
                    <div>Last Month Sales : {report.sales_last_month}</div>
                    <div>Last Month Expenditure : {report.expenditure_last_month}</div>
                </div>
            )
        }

    }

    renderAdminPage = () =>{
        return(
            <div>
                <h1>Admin Center</h1>
                {this.renderTotalReport()}
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
                    <div>Credit Card Numb: {orderDetail.credit_num}</div>
                    {orderDetail.isPaid ? (<div>Order is Paid</div>) :  (<div>Order has not yet paid</div>)}
                </div>
            )
        }
    }

    renderUserPage = () =>{
            return (
                <div>
                    <h1>User center</h1>
                    {this.renderLastOrder()}
                    <SearchOrderForm />
                    {this.renderGetOrder()}
                </div>
            )
    }

}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isSignIn: state.auth.isSignIn,
        name: state.auth.name,
        email: state.auth.email,
        lastOrder: state.auth.last_order,
        orderDetail: state.auth.orderDetail,
        totalReport: state.reports.totalReport
    }
}
export default connect(mapStateToProps, {renderReport })(UserCenter)