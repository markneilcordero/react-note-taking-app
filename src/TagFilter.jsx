import React from "react";

const TagFilter = ({ tags, activeTag, onTagSelect }) => {
  if (tags.length === 0) return null;

  return (
    <div className="mb-4">
      <h6 className="mb-2">Filter by Tag:</h6>
      <div className="d-flex flex-wrap gap-2">
        {/* All Tags */}
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              activeTag === tag ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => onTagSelect(tag)}
          >
            #{tag}
          </button>
        ))}

        {/* Clear Filter */}
        {activeTag && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onTagSelect(null)}
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
