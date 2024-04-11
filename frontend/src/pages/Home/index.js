import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import Search from '../../pages/Search';

const Home = () => {
    const [userEmail, setUserEmail] = useState('');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Since the token is stored in cookies, we include credentials in our fetch request.
        // The browser will automatically handle sending the appropriate cookies.
        fetch('http://localhost:5001/api/auth/authenticate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies, including auth tokens, are included in the request
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Token validation failed');
                }
                return response.json();
            })
            .then(data => {
                setUserEmail(data.email); // Set user email if token is valid
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); // The effect runs once after the component mounts

    useEffect(() => {
        // Fetch random products from your backend API
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/products/random`);
                setProducts(response.data);
                //console.log(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);



    return (
        <div className="home">
          <Header />
          <main>
            <h1>Welcome to SuperMall</h1>
            <div className='feature-products'>
              <h2>Featured products</h2>
              <ul className='product-list'>
                {products.map(product => (
                  <li className='product-item' key={product._id}>
                    <Link to={`/product/${product.productID}`}>
                      <div>
                        <img
                          src={`http://localhost:5001/api/products/image/${product.productID}`}
                          alt="Product"
                          className="img-fluid rounded product-image"
                        />
                      </div>
                      <div>
                        <span style={{ textDecoration: 'underline' }}>{product.productName}</span>
                        <br />
                        <span style={{ textDecoration: 'none' }}>${product.productPrice}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Search />
          </main>
          <Footer />
        </div>
      );
};

export default Home;
