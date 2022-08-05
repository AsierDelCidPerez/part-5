import {React, useState, useEffect} from 'react'
import Titulo from './Titulo'
const LoginForm = () => {
    const [userFields, setUserFields] = useState({
        username: '', password: ''
    })

    const updateUserFields = tipo => event => setUserFields({
        ...userFields, [tipo]: event.target.value
    })

    const handleLogin = event => {
        
    }

    return (
        <form>
            <Titulo text="Login"/>
            <input type="text" value={userFields.username} onChange={updateUserFields('username')} placeholder="username"/><br/>
            <input type="password" value={userFields.password} onChange={updateUserFields('password')} placeholder="password"/><br/>
            <button type="submit" value="Login" onSubmit={handleLogin}>Login</button>
        </form>
    )
}

export default LoginForm