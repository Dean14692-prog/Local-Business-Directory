// CategoriesPage.jsx
import React, { useState } from 'react';

const mockBusinesses = [
  { name: 'Joe’s Pizza', category: 'Restaurants' },
  { name: 'Tech World', category: 'Tech' },
  { name: 'Beauty Bliss', category: 'Beauty' },
  { name: 'Fit Gym', category: 'Fitness' },
  { name: 'House Helpers', category: 'Home Services' },
];


  

const categories = [
  'Restaurants',
  'Clothing',
  'Tech',
  'Beauty',
  'Fitness',
  'Home Services',
];

// const CategoriesPage = () => {
//     const [categories, setCategories] = useState([]);
//     const [businesses, setBusinesses] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
  
//     // Fetch categories from backend
//     useEffect(() => {
//       fetch('/api/categories')
//         .then((res) => res.json())
//         .then((data) => setCategories(data))
//         .catch((err) => console.error('Error fetching categories:', err));
//     }, []);
  
//     // Fetch businesses whenever selectedCategory changes
//     useEffect(() => {
//       let url = '/api/businesses';
//       if (selectedCategory) {
//         url += `?category=${encodeURIComponent(selectedCategory)}`;
//       }
  
//       fetch(url)
//         .then((res) => res.json())
//         .then((data) => setBusinesses(data))
//         .catch((err) => console.error('Error fetching businesses:', err));
//     }, [selectedCategory]);
  

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredBusinesses = selectedCategory
    ? mockBusinesses.filter((biz) => biz.category === selectedCategory)
    : mockBusinesses;

  return (
    <div>
      <h2>Filter by Category</h2>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <h3>Businesses:</h3>
      <ul>
        {filteredBusinesses.map((biz, i) => (
          <li key={i}>{biz.name} - {biz.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
