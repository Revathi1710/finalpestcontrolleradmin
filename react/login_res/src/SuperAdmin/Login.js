import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email === 'admin' && this.state.password === 'admin') {
      this.setState({ redirect: true });
    } else {
      alert('Invalid username or password');
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/Dashboard" />;
    }

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Admin Panel Login</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
         
        </div>
      </div>
    );
  }
}

export default Login;
