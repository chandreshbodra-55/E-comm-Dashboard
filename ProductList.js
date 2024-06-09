import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/products', {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      getProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      try {
        const response = await fetch(`http://localhost:4000/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError('Failed to search products');
        console.error(err);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <ul className="product-list-header">
            <li>S. No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
          </ul>
          {products.length > 0 ? (
            products.map((item, index) => (
              <ul key={item._id} className="product-list-item">
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>$ {item.price}</li>
                <li>{item.category}</li>
                <li>
                  <Link to={`/update/${item._id}`}>
                    <i className="fa-sharp fa-solid fa-pen-to-square" style={{ cursor: 'pointer', marginRight: '15px' }}></i>
                  </Link>
                  <i className="fa-solid fa-trash-can" style={{ cursor: 'pointer' }} onClick={() => deleteProduct(item._id)}></i>
                </li>
              </ul>
            ))
          ) : (
            <h3>No Results Found</h3>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
