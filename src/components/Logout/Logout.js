import React from 'react'
import Button from "../Button";

const Logout = props => {
    const logout = () =>{
        fetch('https://tager.dev.ozitag.com/api/user/profile/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization':'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        })
            .then((resData) => {
                if(resData.success){
                    localStorage.clear();
                    document.location.reload(true);
                }
            })
    }

    return (
        <div>
        <Button type='submit' value='Выйти' submitFunc={logout} />
        </div>
    )
}

export default Logout
