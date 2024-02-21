// eslint-disable-next-line no-unused-vars
import React from 'react'

const Reg = () => {
  return (
         <div className="container d-flex justify-content-around">
		<div>
			<h3>Register:</h3>
			<form action="/register" method="post">
				<div className="form-group">
					<label>User Name:</label>
					<input path="userName" className="form-control" />
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input path="email" className="form-control" />
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input path="password" className="form-control" />
					
				</div>
				<div className="form-group">
					<label>Confirm Password:</label>
					<input path="confirm" className="form-control" />
				
				</div>
				<input type="submit" value="Register" className="btn btn-primary" />
			</form>
		</div>
    </div>
  )
}

export default Reg
