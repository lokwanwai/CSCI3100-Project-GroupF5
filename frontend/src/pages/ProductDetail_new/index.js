import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productData = {
            "_id": "123",
            "productName": "Wireless Bluetooth Headphones",
            "productPrice": 11.99,
            "productDescription": "Experience high-quality sound with these wireless Bluetooth headphones. Enjoy your favorite music, podcasts, and more with crystal-clear audio and a comfortable fit.",
            "productImage": "https://example.com/images/headphones.jpg",
            "productStorage": 3
        };
        setProduct(productData);
    }, []);

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
        console.log(`Adding ${quantity} unit(s) of the product to the cart.`);
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                {product && (
                    <div className="row">

                        <div className="col-md-6">
                            <img src={product.productImage} alt="Product" className="img-fluid rounded" />
                        </div>
                        <div className="col-md-6">
                            Test for product id: {productId}
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