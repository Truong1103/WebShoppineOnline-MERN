import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import '../Css/Myorders.css'; 

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/customer/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      // Đưa phần order mới nhất lên đầu
      const sortedOrders = result.sort((a, b) => new Date(b.cdate) - new Date(a.cdate));
      this.setState({ orders: sortedOrders });
    });
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;

    const orders = this.state.orders.map((item) => (
      <tr key={item._id} className="datatable tableRow" onClick={() => this.trItemClick(item)}>
        <td className="tableCell">{item._id}</td>
        <td className="tableCell">{new Date(item.cdate).toLocaleString()}</td>
        <td className="tableCell">{item.customer.name}</td>
        <td className="tableCell">{item.customer.phone}</td>
        <td className="tableCell">{formatPrice(item.total)}</td>
        <td className={
          item.status === 'APPROVED'
            ? 'statusApproved'
            : item.status === 'PENDING'
            ? 'statusPending'
            : 'statusCanceled'
        }>
          {item.status}
        </td>
      </tr>
    ));

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="datatable tableRow">
          <td className="tableCell">{index + 1}</td>
          <td className="tableCell">{item.product._id}</td>
          <td className="tableCell">{item.product.name}</td>
          <td className="tableCellImage">
            <img src={`data:image/jpg;base64,${item.product.image}`} width="70px" height="70px" alt="" />
          </td>
          <td className="tableCell">{formatPrice(item.product.price)}</td>
          <td className="tableCell">{item.quantity}</td>
          <td className="tableCell">{formatPrice(item.product.price * item.quantity)}</td>
        </tr>
      ));
    }

    return (
      <div className="body">
        <div className="orderListContainer">
          <h2 className="text-center detailHeader">ORDER LIST</h2>
          <table className="table" border="1">
            <thead>
              <tr className="tableHeader">
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust. name</th>
                <th>Cust. phone</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
        </div>
        {this.state.order && (
          <div className="orderDetailContainer">
            <h2 className="detailHeader">ORDER DETAIL</h2>
            <table className="table" border="1">
              <thead>
                <tr className="tableHeader">
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Myorders;
