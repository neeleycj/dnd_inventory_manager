
export const fetchContentTypes = async () => {
    const response = await fetch(`https://www.dnd5eapi.co/api/2014/`);
    const data = await response.json();
    return data;
  };
  
export const fetchEquipment = async () => {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/2014/equipment');
      const data = await response.json();
      console.log('Fetched items:', data);
      return data.results;
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  };
  
