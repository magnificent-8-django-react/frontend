import React, { Component } from 'react';
import '../../styles/register.css';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";


export class Register extends Component {
  state = {
    username: "",
    email: "", 
    password: "",
    rePassword: "",
    justRegister: false
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.setState({justRegister: false});
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.password === this.state.rePassword) {
      const { username, email, password } = this.state;
      const newUser = {
          username,
          password,
          email
      };
      this.props.register(newUser);
      this.setState({justRegister: true});
    }
    else {
      alert("Password confirmation does not match")
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if(this.state.justRegister) {
      return <Redirect to="/login"/>;
    }
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { register })(Register);