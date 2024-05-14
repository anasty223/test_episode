import React from "react";

function ModalComponent({ episode, onClose }) {
  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 max-w-md mx-auto rounded-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">{episode.name}</h2>
        <p>Status: {episode.status}</p>
        <p>Species: {episode.species}</p>
        <p>Gender: {episode.gender}</p>

        <p>Created: {formatDate(episode.created)}</p>
      </div>
    </div>
  );
}

export default ModalComponent;
