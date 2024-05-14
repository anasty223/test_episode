import React, { useState } from "react";

const FilterComponent = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");

  const handleFilterChange = () => {
    const filter = {};
    if (name) filter.name = name;
    if (status) filter.status = status;
    if (species) filter.species = species;
    if (type) filter.type = type;
    if (gender) filter.gender = gender;

    onFilter(filter);
  };

  return (
    <div className="mt-6 ml-8">
      <h2 className="text-lg font-semibold mb-2">Filter characters</h2>
      <div className="flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="species">Species:</label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleFilterChange}
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterComponent;
