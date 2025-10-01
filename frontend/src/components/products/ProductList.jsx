import React, { useState, useEffect } from 'react';
import { productAPI } from '../../services/api';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import './Products.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    searchQuery: '',
    location: null,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      let response;
      if (filters.searchQuery || filters.location) {
        // Use search endpoint for text or location search
        const searchParams = {};
        if (filters.searchQuery) searchParams.q = filters.searchQuery;
        if (filters.location) {
          searchParams.lat = filters.location.lat;
          searchParams.lng = filters.location.lng;
          searchParams.radius = filters.location.radius || 50;
        }
        response = await productAPI.search(searchParams);
      } else {
        response = await productAPI.getAll(params);
      }

      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    setFilters({ 
      ...filters, 
      searchQuery: searchData.query || '',
      location: searchData.location || null,
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <SearchBar onSearch={handleSearch} />

      <div className="filters-section">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="laptops">Laptops</option>
          <option value="cameras">Cameras</option>
          <option value="audio">Audio Equipment</option>
          <option value="gaming">Gaming</option>
          <option value="smartphones">Smartphones</option>
          <option value="tablets">Tablets</option>
          <option value="accessories">Accessories</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          className="filter-input"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          className="filter-input"
        />

        <button
          onClick={() =>
            setFilters({
              category: '',
              minPrice: '',
              maxPrice: '',
              searchQuery: '',
              location: null,
            })
          }
          className="btn-clear-filters"
        >
          Clear Filters
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {products.length === 0 ? (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;