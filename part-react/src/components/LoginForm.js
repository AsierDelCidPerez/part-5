import PropTypes from 'prop-types'

const LoginForm = ({ showLoginForm, userFields, handleLogin, actualizarUserFields }) => (
  <form style={showLoginForm}>
    <input type="text" value={userFields.username} id="usernameFieldLoginForm" onChange={actualizarUserFields('username')} placeholder="Username"/><br/>
    <input type="password" value={userFields.password} id="passwordFieldLoginForm" onChange={actualizarUserFields('password')} placeholder="Password"/><br/>
    <button type="submit" id="buttonSubmitLoginForm" onClick={handleLogin}>Login</button>
  </form>
)

LoginForm.propTypes = {
  showLoginForm: PropTypes.func.isRequired,
  userFields: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  actualizarUserFields: PropTypes.func.isRequired
}

export default LoginForm