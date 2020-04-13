import React from 'react'


class SearchForm extends React.Component {
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
        var keywords = this.state.value
        this.props.submit(keywords)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="ui fluid icon input">
                    <input type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange} />
                    <button>
                    <i className="search icon"  >
                    </i>
                    </button>
                </div>
            </form>
        );
    }
}
//export default connect(null, { searchByName})(SearchForm)
export default (SearchForm)