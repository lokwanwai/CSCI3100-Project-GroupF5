import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import './loginStyle.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavigateAfterLogin({ isAdmin }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const path = isAdmin ? "/admin" : "/";
    setTimeout(() => {
      navigate(path);
    }, 3000);
  }, [isAdmin, navigate]);

  return null; // This component does not render anything
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginSuccess: false,
      isAdmin: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
      event.preventDefault();
      const { username, password } = this.state;
  
      try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
            password: password
          }),
          credentials: 'include',
        });
  
        const data = await response.json();
        
        if (response.status === 200) {
          toast.success('Logged in successfully.');
          toast.success('Redirecting....');
          this.setState({
            loginSuccess: true,
            isAdmin: data.isAdmin,
          });
        } else {
          toast.error(data.message || 'Login failed');
        }
      } catch (error) {
        toast.error('Network error. Please try again later.');
      }
  };

  render() {
    const { loginSuccess, isAdmin } = this.state;
    return (
      <div>
        <ToastContainer />
        <div className="unique-login-form-container">
          <form className="unique-login-form" onSubmit={this.handleSubmit}>
            <h2>Sign in</h2>
            <div className="unique-form-group">
              <label htmlFor="username">Registered Email</label>
              <input
                id="username"
                type="text"
                name="username"
                className="unique-input" // Added class for input
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="unique-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="unique-input" // Added class for input
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit" className="unique-submit-button">Sign in</button> {/* Added class for button */}
            <div className="unique-registration-prompt">
              <span className="unique-text">Don't have an account?</span> <a href="/register" className="unique-link">Register</a>
            </div>
          </form>
        </div>
        {loginSuccess && <NavigateAfterLogin isAdmin={isAdmin} />}
      </div>
    );
  }
}

const Login = () => {
    return (
        <div className="unique-login-page">
            <Header />
            <SignIn />
            <Footer />
        </div>
    );
};

export default Login;
