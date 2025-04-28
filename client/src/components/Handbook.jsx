import React, { useEffect, useState } from 'react';
import { fetchEquipment, fetchContentTypes } from '../services/api';
import SearchBar from './SearchBar';

const Handbook = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [contentTypes, setContentTypes] = useState({});
    const [currentCategory, setCurrentCategory] = useState('/api/2014/equipment');

    // Load all content types (equipment, spells, etc.)
    useEffect(() => {
        const loadContentTypes = async () => {
            const types = await fetchContentTypes();
            setContentTypes(types);
        };
        loadContentTypes();
    }, []);

    // Load items from selected category
    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await fetch(`https://www.dnd5eapi.co${currentCategory}`);
                const data = await response.json();
                setItems(data.results || []);
            } catch (error) {
                console.error('Failed to fetch category items:', error);
                setItems([]);
            }
        };
        if (currentCategory) loadItems();
    }, [currentCategory]);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="character-sheet-section">
            <h2>Handbook Browser</h2>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <select value={currentCategory} onChange={e => setCurrentCategory(e.target.value)}>
                {Object.entries(contentTypes).map(([key, path]) => (
                    <option key={key} value={path}>
                        {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                ))}
            </select>

            <ul>
                {filteredItems.length === 0 ? (
                    <li>No items found.</li>
                ) : (
                    filteredItems.map((item) => (
                        <li key={item.index}>
                            {item.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Handbook;
