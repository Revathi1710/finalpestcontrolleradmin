import React, { Component } from 'react';
import Slider from 'react-slick';
import loginSlider1 from '../icons/loginbg1.png';
import loginSlider2 from '../icons/login600ban.png';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';


// Custom Previous Arrow
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

// Custom Next Arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    console.log(email, password);
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data, "userLogin");
      if (data.status === "ok") {
        alert("Login successful");
        window.localStorage.setItem("token", data.data.token);
        window.localStorage.setItem("userId", data.data.userId);
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }


  render() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    return (
      <div className="toppage2">
        <Navbar />
        <div className="backgroundLogin">
          <div className="formbox">
            {/* Left Side Slider */}
            <div className="imagesignup col-md-6">
              <Slider {...sliderSettings}>
                <div>
                  <img src={loginSlider1} alt="Slide 1" className="slider-image" />
                </div>
                <div>
                  <img src={loginSlider2} alt="Slide 2" className="slider-image" />
                </div>
              </Slider>
            </div>

            {/* Right Side Form */}
            <div className="form-container col-md-6">
              <h3 className="login-title text-center">Login</h3>
              {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control signupinput"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3 input-group">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control signupinput"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                  />
                </div>
                <div className="text-end">
                  <Link to="/ForgetPassword">Forgot Password?</Link>
                </div>
                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary btn-login">
                    Login
                  </button>
                </div>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/vendor/Signup">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
