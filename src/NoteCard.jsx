import React, { useState, useEffect, useRef } from "react";
import NoteDeleteModal from "./NoteDeleteModal";
import { Modal } from 'bootstrap'; // Import Bootstrap's Modal

const NoteCard = ({ note, onEdit, onDelete }) => {
  const { title, content, tags, createdAt } = note;
  const modalRef = useRef(null); // Ref for the modal DOM element
  const bsModalRef = useRef(null); // Ref for the Bootstrap modal instance

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

  // Initialize Bootstrap modal instance
  useEffect(() => {
    if (modalRef.current) {
      bsModalRef.current = new Modal(modalRef.current);
    }

    // Cleanup: destroy modal instance when component unmounts
    return () => {
      if (bsModalRef.current) {
        // Bootstrap 5.3+ might need dispose() instead of destroy()
        try {
          bsModalRef.current.dispose();
        } catch (e) {
          console.warn("Error disposing modal:", e);
        }
      }
    };
  }, []);

  const handleDelete = () => {
    if (bsModalRef.current) {
      bsModalRef.current.show(); // Show modal programmatically
    }
  };

  const confirmDelete = () => {
    onDelete();
    if (bsModalRef.current) {
      bsModalRef.current.hide(); // Hide modal programmatically
    }
  };

  const cancelDelete = () => {
    if (bsModalRef.current) {
      bsModalRef.current.hide(); // Hide modal programmatically
    }
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
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete} // Use onClick to trigger our function
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal - Render unconditionally */}
      <NoteDeleteModal
        ref={modalRef} // Assign the ref here
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default NoteCard;
