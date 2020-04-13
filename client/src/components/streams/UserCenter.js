import React from 'react'
import { connect } from 'react-redux'
import  {isAdmin} from '../common'
import SearchOrderForm from './SearchOrderForm'
import {renderReport, renderGenreReport, getAuthorReport} from '../../actions'
import SearchForm from './SearchForm'

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

                    <h4 className="ui horizontal divider header">
                        <i className="bar chart icon"></i>
                        Report
                    </h4>

                    <table className="ui definition table">
                        <tbody>
                        <tr>
                            <td className="two wide column">Total Sale      </td>
                            <td>{report.total_sale}</td>
                        </tr>
                        <tr>
                            <td>Total Expenditure</td>
                            <td>{report.total_expenditure}</td>
                        </tr>
                        <tr>
                            <td>Last Month Sales</td>
                            <td>{report.sales_last_month}</td>
                        </tr>
                        <tr>
                            <td>Last Month Expenditure</td>
                            <td>{report.expenditure_last_month}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

    }

    handleGenreSubmit = (value) => {
        let modValue = value.trim()
        this.props.renderGenreReport(modValue)
    }

    getGenreReport = () => {
        if (this.props.genreReport){// loaded genre report
            let genre = this.props.genreReport
            return(
                <div>
                    <h4 className="ui horizontal divider header">
                        <i className="bar chart icon"></i>
                        Genre
                    </h4>

                    <table className="ui definition table">
                        <tbody>
                        <tr>
                            <td className="two wide column">Total amount         </td>
                            <td>{genre.genre_amount}</td>
                        </tr>
                        <tr>
                            <td>Total Sales</td>
                            <td>{genre.genre_sales}</td>
                        </tr>
                        <tr>
                            <td>Amount Last Month</td>
                            <td>{genre.genre_last_amount}</td>
                        </tr>
                        <tr>
                            <td>Sales last Month</td>
                            <td>{genre.genre_last_sales}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    getAuthorReport = () => {
        if (this.props.authorReport){// loaded genre report
            let author = this.props.authorReport
            return(
                <div>
                    <h4 className="ui horizontal divider header">
                        <i className="bar chart icon"></i>
                        Genre
                    </h4>

                    <table className="ui definition table">
                        <tbody>
                        <tr>
                            <td className="two wide column">Total amount         </td>
                            <td>{author.author_amount}</td>
                        </tr>
                        <tr>
                            <td>Total Sales</td>
                            <td>{author.author_sales}</td>
                        </tr>
                        <tr>
                            <td>Amount Last Month</td>
                            <td>{author.author_last_amount}</td>
                        </tr>
                        <tr>
                            <td>Sales last Month</td>
                            <td>{author.author_last_sales}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

    }

    handleAuthorSubmit = (value) => {
        let modvalue = value.replace(/\s/g, "_");
        this.props.getAuthorReport(modvalue)
    }

    renderAdminPage = () =>{
        return(
            <div>
                <h1>Admin Center</h1>
                {this.renderTotalReport()}
                <SearchForm placeholder="enter Genre(Novel/Poetry...)" submit = {this.handleGenreSubmit}/>
                {this.getGenreReport()}

                <SearchForm placeholder="enter Author Name" submit = {this.handleAuthorSubmit}/>
                {this.getAuthorReport()}
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
        totalReport: state.reports.totalReport,
        genreReport: state.reports.genreReport,
        authorReport: state.reports.authorReport
    }
}
export default connect(mapStateToProps, {renderReport, renderGenreReport, getAuthorReport })(UserCenter)