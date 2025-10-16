const LoggedUser = ({ user, logOut }) => {

  return (
    <div>
      <h2>Logged in as {user.username}</h2>
      <button className="button" onClick={logOut}>Log out</button>
    </div>
  )
}

export default LoggedUser