import React from 'react'
import PropTypes from "prop-types";

const Button = props =>{
   const {type, value, submitFunc} = props;
    return(
        <button type={type} onClick={submitFunc}>{value}</button>
    )
}

Button.PropsType = {
    type: PropTypes.string,
    value: PropTypes.string,
    submitFunc: PropTypes.func
}

export default Button
