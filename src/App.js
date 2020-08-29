import React, {useState, useEffect} from 'react';
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Login from "./components/Login/Login";

function App() {

    const [auth, authState] = useState(localStorage.getItem('accessToken'))
    const [profile, profileState] = useState('')

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetch('https://tager.dev.ozitag.com/api/user/profile', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json();
            })
                .then((resData) => {
                    console.log(resData);
                    // alert(data);
                    profileState(resData.data)
                })

        }

    }, []);

    return (
        <div className='App '>
            {!auth ?
                <Login authState={authState} profileState={profileState}/> : <div>
                    <Logout/>
                    <Profile user={profile}/>
                </div>
            }
        </div>
    );
}

export default App;
