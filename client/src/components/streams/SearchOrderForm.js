import React from 'react'
import { checkOrder } from '../../actions'
import { connect } from 'react-redux'

class SearchOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let keywords = this.state.value.trim()
        console.log(keywords)
        this.props.checkOrder(keywords)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="ui fluid icon input">
                    <input type="text" placeholder="enter your order number..." value={this.state.value} onChange={this.handleChange} />
                    <button>
                        <i className="search icon"  >
                        </i>
                    </button>
                </div>
            </form>
        );
    }
}
export default connect(null, { checkOrder})(SearchOrderForm)