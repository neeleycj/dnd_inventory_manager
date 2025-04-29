import React, { useEffect, useState } from 'react';
import { fetchContentTypes } from '../services/api';
import SearchBar from './SearchBar';


const Handbook = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentTypes, setContentTypes] = useState({});
  const [currentCategory, setCurrentCategory] = useState('/api/2014/equipment');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadContentTypes = async () => {
      const types = await fetchContentTypes();
      setContentTypes(types);
    };
    loadContentTypes();
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${currentCategory}`);
        const data = await response.json();
        setItems(data.results || []);
        setSelectedItem(null);
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

  const handleItemClick = async (url) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${url}`);
      const data = await response.json();
      setSelectedItem(data);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
    }
  };

  return (
    <div className="handbook-container">
      <h2>Handbook Browser</h2>
      <p>Welcome to the Player Handbook! Here you can find all the resources you need for your D&D adventures.</p>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <select className="category-dropdown" value={currentCategory} onChange={e => setCurrentCategory(e.target.value)}>
        {Object.entries(contentTypes).map(([key, path]) => (
          <option key={key} value={path}>
            {key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </option>
        ))}
      </select>

      <div className="handbook-layout">
        <ul className="item-list">
          {filteredItems.length === 0 ? (
            <li>No items found.</li>
          ) : (
            filteredItems.map((item) => (
              <li
                key={item.index}
                className="item"
                onClick={() => handleItemClick(item.url)}
              >
                {item.name}
              </li>
            ))
          )}
        </ul>

        {selectedItem && (
          <div className="item-details">
            <h3>{selectedItem.name}</h3>

            {selectedItem.desc?.length > 0 && (
              <div>
                <h4>Description:</h4>
                {selectedItem.desc.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}

            {selectedItem.cost && (
              <p><strong>Cost:</strong> {selectedItem.cost.quantity} {selectedItem.cost.unit}</p>
            )}

            {selectedItem.damage && (
              <p>
                <strong>Damage:</strong> {selectedItem.damage.damage_dice} ({selectedItem.damage.damage_type.name})
              </p>
            )}

            {selectedItem.range && (
              <p><strong>Range:</strong> {selectedItem.range.normal} feet</p>
            )}

            {selectedItem.weight && (
              <p><strong>Weight:</strong> {selectedItem.weight} lbs</p>
            )}

            {selectedItem.weapon_category && (
              <p><strong>Weapon Category:</strong> {selectedItem.weapon_category}</p>
            )}

            {selectedItem.properties?.length > 0 && (
              <div>
                <h4>Properties:</h4>
                <ul>
                  {selectedItem.properties.map((prop) => (
                    <li key={prop.index}>{prop.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Handbook;
