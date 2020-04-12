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
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="ui fluid icon input">
                    <input type="text" placeholder="Search a book..." value={this.state.value} onChange={this.handleChange} />
                    <button>
                    <i className="search icon"  >
                    </i>
                    </button>
                </div>
            </form>
        );
    }
}

export default SearchForm