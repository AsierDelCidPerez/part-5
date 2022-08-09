import PropTypes from 'prop-types'

const LoginForm = ({showLoginForm, userFields, handleLogin, actualizarUserFields}) => (
    <form style={showLoginForm}>
    <input type="text" value={userFields.username} onChange={actualizarUserFields('username')} placeholder="Username"/><br/>
    <input type="password" value={userFields.password} onChange={actualizarUserFields('password')} placeholder="Password"/><br/>
    <button type="submit" onClick={handleLogin}>Login</button>
  </form>
)

LoginForm.propTypes = {
  showLoginForm: PropTypes.func.isRequired,
  userFields: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  actualizarUserFields: PropTypes.func.isRequired
}

export default LoginForm