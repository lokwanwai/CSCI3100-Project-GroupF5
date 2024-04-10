import React, { useState, useEffect } from "react";
import "./style.css";
import axios from 'axios';
import AddToCart from "./AddToCart"
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Product = () => {
    const [userEmail, setUserEmail] = useState('');
    
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
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/products`);
                setProducts(response.data);
                //console.log(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/cart/?user=${userEmail}`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        if (userEmail) {
            fetchCartItems();
        }
    }, [userEmail]);
    
    const handleAddtoCart = async (product, newQuantity) => {
        try {
            await axios.post(`http://localhost:5001/api/cart/add-item/${productId}`);
            setProducts(product, newQuantity);
            window.location.reload();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    
    return (
        <div className="productdetail">
            <Header />
            <main>
                <div class="container">
                    <div class="title">PRODUCT DETAIL</div>
                    <div class="detail">
                        <tr>
                            <td>{product.productPhoto}</td>
                        </tr>
                            <td>{product.productName}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productDescription}</td>
                        </tr>
                    </div>
                    <div class="addtocart">
                        {products.map(product => (
                            <AddToCart 
                                key={product._id} 
                                product={product}
                                onAddtocart={handleAddtoCart}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Product
