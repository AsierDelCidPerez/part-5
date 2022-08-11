const LoggedOption = ({user, setUser}) => {

    const logOut = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    return (
        <p>Logged in as {user.username} <button onClick={logOut}>Log out</button></p>
    )

}

export default LoggedOption