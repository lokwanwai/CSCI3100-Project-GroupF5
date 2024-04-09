import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './components/ProductItem';
// import CartTotal from './components/CartTotal';
// import PaymentButton from './components/PaymentButton';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ShoppingCart.css';


const Search = () => {
    const [items, setItems] = useState([]);
    const [userInput, setUserInput] = useState('');


    const searchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/products/search/?keyword=${userInput}`);
            setItems(response.data);
            console.log(response.data);
            console.log(items);
        } catch (error) {
            console.error('Error fetching product items:', error);
        }
    };

    useEffect(() => {
        searchProducts();
    }, []);

    return (
        <div className="Search">
            <Header />
            <div>Search Page</div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your search query"
            />
            <button onClick={searchProducts}>Search</button>
            <main className="flex-grow-1">
                <div className="container my-4">
                    <div className="row justify-content-center">
                        {items.map((item) => (
                            <div className="col-lg-4" key={item._id}>
                                <ProductItem item={item} />
                            </div>
                            ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Search;