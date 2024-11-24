import React, { useState, useEffect } from 'react';
import './sidebar.css';

const SideBar = ({ onFilterChange, options }) => {
    const [filters, setFilters] = useState({
        searchTitle: '',
        condition: '',
        genre: '',
        publisher: '',
        priceRange: '',
    });

    // Update filters and notify parent
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="sidebar-container">
            <h2>Filters</h2>

            {/* Search Bar */}
            <div className="filter-section">
                <label htmlFor="search-title">Search by Title:</label>
                <input
                    id="search-title"
                    type="text"
                    placeholder="Enter game title"
                    value={filters.searchTitle}
                    onChange={(e) => handleFilterChange('searchTitle', e.target.value)}
                />
            </div>

            {/* Condition Dropdown */}
            <div className="filter-section">
                <label htmlFor="condition">Condition:</label>
                <select
                    id="condition"
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                >
                    <option value="">All</option>
                    {options.conditions.map((cond) => (
                        <option key={cond} value={cond}>
                            {cond}
                        </option>
                    ))}
                </select>
            </div>

            {/* Genre Dropdown */}
            <div className="filter-section">
                <label htmlFor="genre">Genre:</label>
                <select
                    id="genre"
                    value={filters.genre}
                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                >
                    <option value="">All</option>
                    {options.genres.map((gen) => (
                        <option key={gen} value={gen}>
                            {gen}
                        </option>
                    ))}
                </select>
            </div>

            {/* Publisher Dropdown */}
            <div className="filter-section">
                <label htmlFor="publisher">Publisher:</label>
                <select
                    id="publisher"
                    value={filters.publisher}
                    onChange={(e) => handleFilterChange('publisher', e.target.value)}
                >
                    <option value="">All</option>
                    {options.publishers.map((pub) => (
                        <option key={pub} value={pub}>
                            {pub}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price Range Dropdown */}
            <div className="filter-section">
                <label htmlFor="price-range">Price Range:</label>
                <select
                    id="price-range"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                    <option value="">All</option>
                    <option value="0-20">0-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                </select>
            </div>
        </div>
    );
};

export default SideBar;
