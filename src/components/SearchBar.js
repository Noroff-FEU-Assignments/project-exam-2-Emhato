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
                <input className="search__input" type="text" placeholder={placeholder} onChange={handleSearch}></input>
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
