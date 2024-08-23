import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Css/Menu.css'; 

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link to={'/product/category/' + item._id} className="styled-link">{item.name}</Link>
        </li>
      );
    });

    return (
      <div className="border-bottom menu-container">
        <ul className="menu">
          <li className="menu">
            <Link to='/' className="home-style">
              <span className="letter">T</span>
              <span className="letter">e</span>
              <span className="letter">c</span>
              <span className="letter">h</span>
              <span className="letter">Z</span>
              <span className="letter">o</span>
              <span className="letter">n</span>
              <span className="letter">e</span>
            </Link>
          </li>
          {cates}
        </ul>
        <form className="search">
          <input
            type="search"
            placeholder="What do you need to buy today?"
            className="keyword"
            value={this.state.txtKeyword}
            onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
          />
          <button
            type="submit"
            onClick={(e) => this.btnSearchClick(e)}
            className="styled-button"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);
