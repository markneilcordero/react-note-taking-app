import React, { forwardRef } from "react";

// Use forwardRef to accept the ref from the parent
const NoteDeleteModal = forwardRef(({ onConfirm, onCancel }, ref) => {
  return (
    // Assign the ref to the top-level modal div
    <div ref={ref} className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      {/* Add modal-dialog-centered to center the modal vertically */}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this note? This action cannot be undone.
          </div>
          <div className="modal-footer">
            {/* Add data-bs-dismiss to the cancel button to ensure it closes the modal */}
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel}>Cancel</button>
            {/* No need for data-bs-dismiss on confirm, as we handle hide programmatically */}
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NoteDeleteModal;