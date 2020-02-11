import React, { Component } from 'react';
import '../../styles/register.css';


export class Register extends Component {
  state = {
    username: "",
    email: "", 
    password: "",
    rePassword: "",
  };


  onSubmit = e => {
    e.preventDefault();
    if(this.state.password === this.state.rePassword) {
      console.log(this.state.username, this.state.email, this.state.password);
    }
    else {
      alert("Password confirmation does not match")
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, email, password, rePassword } = this.state;
    return (
      <div>
          <h1 className="text-center title">Create Account</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group reg-wrapper">
              <label><strong>Username</strong></label>
              <input
                type="text"
                className="form-control round-shape"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group reg-wrapper">
              <label><strong>Email</strong></label>
              <input
                type="email"
                className="form-control round-shape"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group reg-wrapper">
              <label><strong>Password</strong></label>
              <input
                type="password"
                className="form-control round-shape"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group reg-wrapper">
              <label><strong>Re-type Password</strong></label>
              <input
                type="password"
                className="form-control round-shape"
                name="rePassword"
                onChange={this.onChange}
                value={rePassword}
              />
            </div>
            <div className="form-group flexout">
              <button type="submit" className="btn submit-color">Submit</button>
            </div>
          </form>
      </div>
    )
  }
}

export default Register;
