import React, { useState } from 'react';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Implement search functionality here
    };

    return (
        <div className="header">
            <h1>Start Searching for a Book.</h1>
            <div className="search">
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
                <input
                    type="text"
                    placeholder="Search for a book..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button>
                {/* Display search results here */}
            </div>
        </div>
    );
}

export default Search;
