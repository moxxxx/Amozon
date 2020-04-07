import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={() => { props.onDismiss() }} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">Delete Stream</div>
                <div className="content">Do you sure tou want to delete?</div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#Modal')
    )
}
export default Modal;