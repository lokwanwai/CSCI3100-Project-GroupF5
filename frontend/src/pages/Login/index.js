import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './style.css';

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom'; // Import withRouter
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavigateAfterLogin({ isAdmin }) {


  const navigate = useNavigate();
  React.useEffect(() => {
    const path = isAdmin ? "/admin" : "/";
    navigate(path);
  }, [isAdmin, navigate]);

  return null; // This component does not render anything
}


// import './SignIn.css'; // Assume you have a CSS file named SignIn.css
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginSuccess: false, // Indicates if login was successful
      isAdmin: false, // Indicates if the user is an admin
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
          credentials: 'include', // Include credentials in the request
        });
  
        const data = await response.json();
        
        if (response.status === 200) {
          toast.success('Logged in successfully');
          // Update state based on login response
          this.setState({
            loginSuccess: true,
            isAdmin: data.isAdmin, // Use the isAdmin flag from the response
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
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>Sign in</h2>
            <div className="form-group">
              <label htmlFor="username">Registered Email</label>
              <input
                id="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit">Sign in</button>
          </form>
        </div>
        {/* Conditionally render NavigateAfterLogin based on login success */}
        {loginSuccess && <NavigateAfterLogin isAdmin={isAdmin} />}
      </div>
    );
  }
}
// class SignIn extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         username: '',
//         password: ''
//       };
//     }
  
//     handleInputChange = (event) => {
//       const { name, value } = event.target;
//       this.setState({ [name]: value });
//     }
  
//     handleSubmit = (event) => {
//       event.preventDefault();
//       // Handle sign-in logic here
//       console.log('Username: ', this.state.username);
//       console.log('Password: ', this.state.password);
//     }
  
//     render() {
//       return (
//         <div>

  
//           <div className="login-form-container">
//             <form className="login-form" onSubmit={this.handleSubmit}>
//               <h2>Sign in</h2>
//               <div className="form-group">
//                 <label htmlFor="username">Registered Email</label>
//                 <input
//                   id="username"
//                   type="text"
//                   name="username"
//                 //   placeholder="Enter your username"
//                   value={this.state.username}
//                   onChange={this.handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   id="password"
//                   type="password"
//                   name="password"
//                 //   placeholder="Enter your password"
//                   value={this.state.password}
//                   onChange={this.handleInputChange}
//                   required
//                 />
//               </div>
//               <button type="submit">Sign in</button>
//               <div className="signup-text">
//               <span className="text">Don’t have an account?  </span><a href="/registerS" className="signup-link">Sign Up</a>
//             </div>
//             </form>
//           </div>
  

//         </div>
//       );
//     }
//   }


const Login = () => {
    return (
        <div className="Login">
            <Header />
            <SignIn />
            <Footer />
        </div>
    );
};

export default Login;