import React from "react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const { title, content, tags, createdAt } = note;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h5 className="card-title">{title}</h5>

        {/* Content Preview */}
        <p className="card-text flex-grow-1">{content}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <small className="text-muted d-block mb-2">
          Created: {formatDate(createdAt)}
        </small>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
            <i className="bi bi-pencil"></i> Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
