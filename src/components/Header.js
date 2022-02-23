import PropTypes from 'prop-types'
import { AddButton } from './AddButton'
import { useLocation } from 'react-router-dom'

export const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === "/" && 
                <AddButton color={showAdd ? "green" : "red"} text={showAdd ? "Add" : "Close"}
                onClickFunction = {onAdd} ></AddButton>
            }
        </header>
    )
}

// Prop types and default prop

Header.defaultProps = {
    title:"Default title"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

//CSS in js

// const headingStyle = {
//     color:"red",
//     backgroundColor:"black"
// }