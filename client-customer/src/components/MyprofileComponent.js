import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FaUser, FaLock, FaIdCard, FaPhone, FaEnvelope } from 'react-icons/fa';

class Myprofile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      hovering: false,
      showPassword: false  // State để xác định liệu mật khẩu có đang được hiển thị hay không
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  btnUpdateClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username, password, name, phone, and email');
    }
  };

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/customer/customers/${id}`, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Update successful!');
        this.context.setCustomer(result);
      } else {
        alert('Update failed!');
      }
    });
  }

  toggleShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const containerStyle = {
      backgroundImage: "url('https://media.tapeko.co.uk/wp-content/uploads/20240202035142/u96041p-1024x682.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      marginTop: '10px',
      borderRadius: '10px'
    };

    const formStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      animation: 'fade-in 0.5s ease-in',
      maxWidth: '400px',
      width: '100%'
    };

    const labelStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      justifyContent: 'center'
    };

    const iconStyle = {
      marginRight: '10px',
      color: '#007bff',
      display: 'flex',
      alignItems: 'center',
      marginTop: '-10px',
      width: '24px', // Width of the icons
      height: '24px' // Height of the icons
    };

    const inputStyle = {
      width: '85%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '15px',
      fontSize: '16px',
      boxSizing: 'border-box',
      outline: 'none'
    };

    const readonlyInputStyle = {
      ...inputStyle,
      backgroundColor: '#f0f0f0', // Light gray background
      cursor: 'not-allowed' // Not-allowed cursor
    };

    const submitStyle = {
      padding: '12px 48px',
      backgroundColor: '#0000EE',
      color: '#fff',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    };

    const submitHoverStyle = {
      backgroundColor: '#007bff'
    };

    const headingStyle = {
      fontSize: '36px',
      color: 'red',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center'
    };
    const showhideStyle = {
        height:"32px",
    }

    const { token } = this.context;
    if (token === '') return (<Navigate replace to='/login' />);

    return (
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={headingStyle} className="text-center">MY PROFILE</h2>
          <form>
            <div style={labelStyle}>
              <FaUser style={iconStyle} />
              <input
                type="text"
                style={readonlyInputStyle}
                value={this.state.txtUsername}
                onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                placeholder="Username"
                readOnly
              />
            </div>
            <div style={labelStyle}>
              <FaLock style={iconStyle} />
              <input
                type={this.state.showPassword ? 'text' : 'password'} // Toggle password visibility
                style={inputStyle}
                value={this.state.txtPassword}
                onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                placeholder="Password"
              />
              <div style={showhideStyle}>
              <span onClick={this.toggleShowPassword} style={{ marginLeft: '-25px', cursor: 'pointer' }}>
                {this.state.showPassword ? (
                  <img src="https://cdn-icons-png.flaticon.com/128/4121/4121492.png" alt="Hide Password" style={{ width: '20px', height: '20px' }} />
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/5817/5817839.png" alt="Show Password" style={{ width: '20px', height: '20px' }} />
                )}
              </span>
              </div>
            </div>
            <div style={labelStyle}>
              <FaIdCard style={iconStyle} />
              <input
                type="text"
                style={inputStyle}
                value={this.state.txtName}
                onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                placeholder="Name"
              />
            </div>
            <div style={labelStyle}>
              <FaPhone style={iconStyle} />
              <input
                type="tel"
                style={inputStyle}
                value={this.state.txtPhone}
                onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                placeholder="Phone"
              />
            </div>
            <div style={labelStyle}>
              <FaEnvelope style={iconStyle} />
              <input
                type="email"
                style={inputStyle}
                value={this.state.txtEmail}
                onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
                placeholder="Email"
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="submit"
                style={{ ...submitStyle, ...(this.state.hovering ? submitHoverStyle : {}) }}
                onMouseEnter={() => this.setState({ hovering: true })}
                onMouseLeave={() => this.setState({ hovering: false })}
                onClick={this.btnUpdateClick}
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Myprofile;
