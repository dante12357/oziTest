import React from 'react'
import PropTypes from "prop-types";

const Profile = props =>{
    const {user} = props
    return(
        <div>
            <div>Ваше имя: {user.name}</div>
            <div>Ваше email: {user.email}</div>
        </div>
    )
}


Profile.PropsType = {
    user: PropTypes.array
}

export default Profile;
