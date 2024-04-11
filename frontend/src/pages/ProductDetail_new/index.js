import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if user is logged in
        fetch('http://localhost:5001/api/auth/authenticate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Token validation failed');
                }
                return response.json();
            })
            .then(data => {
                setUserEmail(data.email);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Fetch product data
        fetch(`http://localhost:5001/api/products/getdetails/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                // console.log('Product details:', data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);

    const handleQuantityChange = (event) => {
        if (event.target.value < 0) {
            setQuantity(1);
            return;
        }
        if (event.target.value > product.productStorage) {
            setQuantity(product.productStorage);
            return;
        }
        setQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = () => {
        if (!userEmail) {
            alert('Please log in to add items to the cart.');
            return;
        }
    
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }
    
        // Check if there is enough stock before adding to the cart
        if (quantity > product.productStorage) {
            alert('Not enough stock available. Please adjust your quantity.');
            return; // Exit the function as we cannot proceed with the addition
        }
    
        // Make an API call to add the item to the cart
        fetch('http://localhost:5001/api/cart/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail,
                productId: product.productID,
                name: product.productName,
                price: product.productPrice,
                quantity,
                stock: product.productStorage, // Consider if you really need to send stock info to your endpoint
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item added to the cart:', data);
                alert('Item added to the cart successfully');
                // Optionally, you can show a success message or update the UI
            })
            .catch(error => {
                console.error('Error adding item to the cart:', error);
                // Handle the error, show an error message, or update the UI
            });
    };
    

    return (
        <>
            <Header />
            <div className="container mt-5">
                {product && (
                    <div className="row">
                        <div className="col-md-6">
                            <div className="product-image-container">
                                <img
                                    src={`http://localhost:5001/api/products/image/${product.productID}`}
                                    alt="Product"
                                    className="img-fluid rounded product-image"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2 className="product-name">{product.productName}</h2>
                            <p className="product-price lead">Price: ${product.productPrice}</p>
                            <p className="product-description">{product.productDescription}</p>
                            <p className="product-storage">Storage: {product.productStorage}</p>
                            <div className="d-flex align-items-center mb-3">
                                <label htmlFor="quantity" className="mr-2">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control quantity-input"
                                    min="1"
                                    max={product.productStorage}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            <button className="btn btn-dark add-to-cart-btn" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;