// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductItem from './components/ProductItem';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import './Search.css';

// const Search = () => {
//     const [items, setItems] = useState([]);
//     const [userInput, setUserInput] = useState('');
//     const [productIdInput, setProductIdInput] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');


//     const searchProducts = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5001/api/products/search/?keyword=${userInput}`);
//             setItems(response.data);
//             console.log(response.data);
//             console.log(items);
//         } catch (error) {
//             console.error('Error fetching product items:', error);
//         }
//     };

//     useEffect(() => {
//         searchProducts();
//     }, []);

//     const searchProductById = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5001/api/products/searchByID/?id=${productIdInput}`);
//             setItems([response.data]);
//             console.log(response.data);
//             console.log(items);
//         } catch (error) {
//             console.error('Error fetching product by ID:', error);
//         }
//     };

//     const filterProducts = () => {
//         if (minPrice === '' || maxPrice === '') {
//           return;
//         }
      
//         const filteredItems = items.filter((item) => {
//             if (item.price) {
//                 const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
//                 return itemPrice >= minPrice && itemPrice <= maxPrice;
//             }
//             return false;
//         });
//         setItems(filteredItems.slice());
//       };

//     return (
//         <div className="Search">
//             <Header />
//             <div>Search Page</div>
//             <input
//                 type="text"
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 placeholder="Enter your search query"
//             />
//             <button onClick={searchProducts}>Search</button>
//             <br />
//             <input
//                 type="text"
//                 value={productIdInput}
//                 onChange={(e) => setProductIdInput(e.target.value)}
//                 placeholder="Search by product ID"
//             />
//             <button onClick={searchProductById}>Search by ID</button>
//             <br />
//             <input 
//                 type="number"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 placeholder="Min Price"
//             />
//             <input
//                 type="number"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 placeholder="Max Price"
//             />
//             <button onClick={filterProducts}>Filter</button>
//             <br />
//             <main className="flex-grow-1">
//                 <div className="container my-4">
//                     <div className="row justify-content-center">
//                         {items.map((item) => (
//                             <div className="col-lg-4" key={item._id}>
//                                 <ProductItem item={item} />
//                             </div>
//                             ))}
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default Search;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './components/ProductItem';
import './Search.css';

const Search = () => {
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [productIdInput, setProductIdInput] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async (url) => {
    try {
      const response = await axios.get(url);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchProducts = () => {
    const url = `http://localhost:5001/api/products/search/?keyword=${userInput}`;
    fetchProducts(url);
  };

  useEffect(() => {
    searchProducts();
  }, []);

  const searchProductById = () => {
    const url = `http://localhost:5001/api/products/searchByID/?id=${productIdInput}`;
    fetchProducts(url);
  };

  const filterProducts = () => {
    if (minPrice === '' || maxPrice === '') {
      return;
    }
  
    const filteredItems = items.filter((item) => {
      console.log(item);
      if (item.productPrice) {
        const itemPriceStr = String(item.productPrice); // Convert to string to ensure .replace works
        const itemPrice = parseFloat(itemPriceStr.replace(/[^0-9.-]+/g, ''));
        return (itemPrice >= parseFloat(minPrice)) && (itemPrice <= parseFloat(maxPrice));
      }
      return false;
    });
  
    setItems(filteredItems);
  };

  return (
    <div className="Search">
      <div>
        <h2>Search any product</h2>
      </div>

      <div className='input'>  
        <input className='searchQuery'
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your search query"
        />
        <button className='btn btn-outline-secondary btn-sm' onClick={searchProducts}>Search</button>
      </div>

      <div className='input'>
        <input className='searchId'
          type="text"
          value={productIdInput}
          onChange={(e) => setProductIdInput(e.target.value)}
          placeholder="Search by product ID"
        />
        <button className='btn btn-outline-secondary btn-sm' onClick={searchProductById}>Search</button>
      </div>

      <div className='input'>
        <input className='searchPrice'
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
        /> 
        <h2>-</h2>
        <input className='searchPrice'
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
        />
        <button className='btn btn-outline-secondary btn-sm' onClick={filterProducts}>Filter</button>
      </div>

      <br />
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
    </div>
  );
};

export default Search;