// SortComponent.js
import React, { useState } from "react";

const SortComponent = ({ onSort }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    onSort(newSortOrder);
  };

  return (
    <div className="mt-6 ml-8">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Oldest first</option>
        <option value="desc">Newest first</option>
      </select>
    </div>
  );
};

export default SortComponent;
