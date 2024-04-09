import React, { Component } from "react";
import "./style.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToCart = async (req, res) => {
  const { venueid, price, date, desc, price, presenter } = req.body

  let newProducts = new CartItems({
    userEmail,
    productId,
    name,
    price,
    quantity,
    stock,
  })
  await newProducts.save()
  res.status(201).json({})
}

function AddToCart({ userID }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const path = isAdmin ? "/admin" : "/";
    setTimeout(() => {
      navigate(path);
    }, 3000);
  }, [isAdmin, navigate]);

  return null; // This component does not render anything
}

class Product extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product: {},
      productId: '',
      show: false
    }
    console.log(this.props.show)
  }

  componentWillReceiveProps(props) {
    const productId = props.productId;
    const show = props.show;
    this.state.productId = productId;
    this.state.show = show;

    axios.get(`http://localhost:5000/products/${productId}`)
      .then(res => {
        this.setState({ product: res.data });
      })
      .catch(error => { console.log(error); })

    console.log(this.state.product)
    console.log(this.state.show)
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('button clicked');
  }

  render() {
    const { product, show } = this.state
    console.log(this.state.product.ownId);
    return (

      <div id="flyoutMenu" style={{ top: show ? '0vw' : '-300vw' }}
        onMouseDown={this.props.handleMouseDown}>
        <div className="product-container">
          <div className="text-container">

            <h1 id="productName">{product.productName}</h1>
            <span id="price">HK${product.price}
            <div id="description">description: {product.productDescription} </div>
            
            <div onSubmit={this.onSubmit}>
              <Link onClick=>
              <i className="fas fa-comments-dollar"></i>
              
              </Link>
            </div>
          </div>

          <img id="image" src={`/data/${product.productPhoto}`} alt="..."></img>
        </div>
      </div>

    );
  }
}

export default Product;
