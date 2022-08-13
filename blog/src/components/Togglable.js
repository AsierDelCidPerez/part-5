import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

    const[visible, setVisible] = useState(props.isShown || false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: !visible ? 'none' : ''}

    const toggleVisible = () => setVisible(!visible)

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div className="togglableContent" style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>Close</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable