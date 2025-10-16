const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => (
  <div className="individual">
    <h2>LOGIN</h2>
    <hr className="hrStyle"></hr>
    <form onSubmit={handleLogin}>
      <div className="input">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}>
          </input>
        </label>
      </div>
      <div className="input">
        <label>
          Password:
          <input
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            value={password}>
          </input>
        </label>
      </div>
      <button type="submit" className="button">Login</button>
    </form>
  </div>
)

export default LoginForm