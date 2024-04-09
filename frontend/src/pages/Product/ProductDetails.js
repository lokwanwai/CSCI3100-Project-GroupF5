import React, { Component } from "react";
import "./style.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import productsData from "./productsData"
import AddToCartButton from "./AddToCartButton"
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductDetail() = () => {
    const {productId} = useParams()
    const [userEmail, setUserEmail] = useState('');
    const thisProduct = productsData.find(prod => prod.id === productId)
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
    return (
      <>
        {data.map((card,index)=>(
            <div key={index} className="card">
            <h1>{card.title}</h1>
            <img src={card.image} />
            <p>{card.description}</p>
            <Link to={`/cards/${card.title}`}>View More</Link>
           </div>
        ))}
      </>
    );
}

export default ProductDetail
