import React, { Component } from "react";
import "./style.css";
import axios from 'axios';
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

    const handleAddtoCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/products/delete-product/${productId}`);
            setProducts(products.filter((product) => product.id !== productId));
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
                        {products.map(product => (
                            <ProductItem 
                                key={product._id} 
                                product={product}
                                onDelete={handleAddtoCart}
                            />
                        ))}
                    </div>
                    <div class="title">Similar product</div>
                    <div class="listProduct"></div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProductDetail
