const LoggedForm = ({user, setUser}) => {
    const logOut = event => {
        window.localStorage.removeItem('BlogappUserLogin')
        setUser(null)
    }
    return (
        <div>
            <p>Logged in as {user.username}</p><button onClick={logOut}>Log out</button>
        </div>
    )
}

export default LoggedForm