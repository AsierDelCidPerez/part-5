import React, {useState, useEffect} from 'react'
import blogService from '../services/blog'
import loginService from '../services/loginService'
import Titulo from './Titulo'
const LoginForm = ({setUsuario, setNotification}) => {
    const [userFields, setUserFields] = useState({
        username: '', password: ''
    })

    const updateUserFields = tipo => event => setUserFields({
        ...userFields, [tipo]: event.target.value
    })

    const handleLogin = async event => {
        event.preventDefault()
        try{
            const usuario = await loginService.login(userFields)
            setUsuario(usuario)
            blogService.setToken(usuario.token)
            window.localStorage.setItem('BlogappUserLogin', JSON.stringify(usuario))
        }catch(exception){
            setNotification({
                text:"Username or password are incorrect", isSuccess: false
            })
            setTimeout(() => setNotification({text: null, isSuccess: true}), 5000)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <Titulo text="Login"/>
            <input type="text" value={userFields.username} onChange={updateUserFields('username')} placeholder="username"/><br/>
            <input type="password" value={userFields.password} onChange={updateUserFields('password')} placeholder="password"/><br/>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm