import React from 'react'

const Log = () => {
  return (
    <div className="login-reg-main border-round">

    <h3>Login:</h3>
    <form action="/login" method="post">
        <div className="form-group">
            <label>Email:</label>
            <input path="email" className="form-control" />
        </div>
        <div className="form-group">
            <label>Password:</label>
            <input path="password" className="form-control" />
        </div>
        <input type="submit" value="Login" className="btn btn-success" />
    </form>
</div>
  )
}

export default Log
