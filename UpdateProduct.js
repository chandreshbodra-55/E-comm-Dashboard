import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setCompany(result.company);
    setCategory(result.category);
    setPrice(result.price);
  };
  const dataCollect = async () => {
    let result = await fetch(`http://localhost:4000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    
    <div className="product">
          <h1>Update Product</h1>

      <input
          className="inputbox"
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
       
        <input
          className="inputbox"
          type="text"
          placeholder="Enter Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
  
          <input
          className="inputbox"
          type="text"
          value={category}
          placeholder="Enter Product Category"
          onChange={(e) => setCategory(e.target.value)}
        />
      
        <input
          className="inputbox"
          type="text"
          value={company}
          placeholder="Enter Product Company"
          onChange={(e) => setCompany(e.target.value)}
        />
        
        <button className="btn-signup" type="button" onClick={dataCollect}>
          Update product
        </button>
    </div>
  );
};

export default UpdateProducts;
