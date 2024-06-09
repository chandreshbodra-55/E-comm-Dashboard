import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/product/${params.id}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch product details');
            console.error(err);
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError("All fields are required");
            return;
        }

        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setError("No authentication token found");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/product/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Update result:', result);
            navigate('/');
        } catch (err) {
            setError("Failed to update product");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='product'>
            <h1>Update Product</h1>
            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        className="inputBox"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter product price"
                        className="inputBox"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter product category"
                        className="inputBox"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter product company"
                        className="inputBox"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <button onClick={updateProduct} className="appButton" disabled={loading}>
                        Update Product
                    </button>
                </>
            )}
        </div>
    );
};

export default UpdateProduct;
