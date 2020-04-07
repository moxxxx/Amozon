import React from 'react'
import { connect } from 'react-redux'
//import { getBakset } from '../../actions'


class StreamCreate extends React.Component {
    componentDidMount() {
        //this.props.getBakset()
    }

    render() {
        return (
            <div>
                <h3>Basket</h3>

            </div>
        )
    }
}

export default connect(null, { })(StreamCreate)