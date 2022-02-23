import PropTypes from 'prop-types'

export const AddButton = (props) => {

    return ( 
        <button onClick={props.onClickFunction} style={{backgroundColor:props.color}} className="btn">
            {props.text}
        </button> 
    )
}

AddButton.defaultProps = {
    color:"steelblue",
    text:"Click me"
}

AddButton.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClickFunction: PropTypes.func
}