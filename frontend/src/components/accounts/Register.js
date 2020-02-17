import React, { Component } from 'react';
import '../../styles/register.css';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import axios from 'axios';

export class Register extends Component {
  state = {
    username: "",
    email: "", 
    password: "",
    rePassword: "",
    justRegister: false,
    users: [],
    usernameValid: false,
    usernameUnique: false,
    usernamePass: false
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.setState({
      justRegister: false,
      usernameValid: true,
      usernameUnique: true,
      usernamePass: false
    });
    axios
      .get('http://127.0.0.1:8000/users/')
      .then( res => {
        this.setState({ users: res.data.results });
        console.log(res.data.length)
      })
      .catch( err => { console.log(err) })
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

  onChangeUser = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      usernameValid: true,
      usernameUnique: true,
      usernamePass: true
    });
    for(let j=0; j<this.state.users.length; j++) {
      if(e.target.value === this.state.users[j].username) {
        this.setState({ usernameUnique: false });
        this.setState({ usernamePass: false });
        break;
      }
    }
    for(let i=0; i<e.target.value.length; i++) {
      if(e.target.value[i] === " ") {
        this.setState({ usernameValid: false });
        this.setState({ usernamePass: false });
        console.log(this.state.users);
        break;
      }
    }
    if(e.target.value.length === 0) {
      this.setState({ usernamePass: false });
    }
  }

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
            <div className="form-group reg-wrapper relative">
              <label><strong>Username</strong></label>
              <input
                type="text"
                className="form-control round-shape"
                name="username"
                onChange={this.onChangeUser}
                value={username}
                required
              />
              {this.state.usernameValid ? "" : <p className="valid-text">Username cannot contain spaces</p>}
              {this.state.usernameUnique ? "" : <p className="valid-text">Username is already taken</p>}
              {this.state.usernamePass ? <span className="valid">&#10004;</span> : ""}
            </div>
            <div className="form-group reg-wrapper">
              <label><strong>Email</strong></label>
              <input
                type="email"
                className="form-control round-shape"
                name="email"
                onChange={this.onChange}
                value={email}
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group flexout">
              {this.state.usernamePass ? 
                <button type="submit" className="btn submit-color">Submit</button>
                :
                <button type="submit" className="btn submit-disable" disabled>Submit</button>
              }
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