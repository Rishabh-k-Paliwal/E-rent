import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <div className="no-image">📦</div>
        )}
        {!product.availability && (
          <div className="unavailable-badge">Not Available</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">
          {product.description.substring(0, 80)}
          {product.description.length > 80 && '...'}
        </p>
        <div className="product-location">
          📍 {product.location?.address || 'Location not specified'}
        </div>
        <div className="product-footer">
          <div className="product-price">₹{product.pricePerDay}/day</div>
          <button className="btn-view-details">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;