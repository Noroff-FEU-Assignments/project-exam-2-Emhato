// Source: https://www.youtube.com/watch?v=x7niho285qs
import React, { useState } from 'react'

export default function SearchBar({placeholder, data}) {
    const [searchTerm, setSearchTerm] = useState([]);

    const handleSearch = (event) => {
        const searchWord = event.target.value;
        const newSearch = data.filter((value) => {
            return value.attributes.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setSearchTerm([]);
        } else {
            setSearchTerm(newSearch);
        }
        
    }

    return (
        <div className="search">
            <div className="search__inputs">
                <input className="search__input" type="text" placeholder={placeholder} onChange={handleSearch} aria-label="Search"></input>
                <div className="search__icon">
                    <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="25.362" height="25.362" viewBox="0 0 25.362 25.362">
                        <g id="Ellipse_4" data-name="Ellipse 4" fill="none" stroke="#ffffff" strokeWidth="3">
                            <circle cx="10.56" cy="10.56" r="10.56" stroke="none"/>
                            <circle cx="10.56" cy="10.56" r="9.06" fill="none"/>
                        </g>
                        <line id="Line_22" data-name="Line 22" x2="8" transform="translate(17.584 17.584) rotate(45)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="3"/>
                    </svg>
                </div>
            </div>
            { searchTerm.length !== 0 && (
                <div className="search__result">
                    {searchTerm.slice(0, 8).map((value, key) => {
                        return <a key={value.id} className="search__item" href={`/spesific/${value.id}`} target="_blank"><p>{value.attributes.name}</p></a>
                    })}
                </div>
            )}
        </div>
    )
}
