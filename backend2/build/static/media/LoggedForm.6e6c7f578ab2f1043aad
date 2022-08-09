const LoggedForm = ({usuario, setUsuario}) => {
    const logOut = event => {
        window.localStorage.removeItem('BlogappUserLogin')
        setUsuario(null)
    }
    return (
        <div>
            <p>Logged in as {usuario.username}</p><button onClick={logOut}>Log out</button>
        </div>
    )
}

export default LoggedForm