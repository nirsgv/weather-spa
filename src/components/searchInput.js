import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchInput({ searchVal, setSearchValue, className }) {

    return (
        <>
            {/*<label htmlFor="search">Search:</label>*/}
            <input type="text"
                   id="search" value={searchVal}
                   placeholder="search"
                   className={className}
                   onChange={e => setSearchValue(e.target.value)}
            />
        </>
    )
}

SearchInput.defaultProps = {
    baseClassName: 'list',
};

SearchInput.propTypes = {
    baseClassName: PropTypes.string,
    children: PropTypes.node,
};


export default SearchInput;