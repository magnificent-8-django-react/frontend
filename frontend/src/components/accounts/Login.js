import React, { Component } from "react";
import logo from "../../images/food-truck-logo.png"

export default class Login extends Component {
    render() {
        return (
            <div>
            
            <img src={logo} alt="Dine Drive Logo" className="logo"/>

            <h1 className="welcome">Welcome, Sign in to continue</h1>

            <form>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" />
                </div>

                <p className="forgot-password text-right">
                    Forgot password?
                </p>

                <button type="submit" className="btn btn-primary btn-block">Get Started</button>

            </form>
            </div>
        );
    }
}