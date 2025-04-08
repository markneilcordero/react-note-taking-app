import React, { useEffect, useRef } from "react";
import NoteForm from "./NoteForm";

const NoteModal = ({ show, onClose, onSave, editingNote }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current && window.bootstrap) {
      modalInstance.current = window.bootstrap.Modal.getOrCreateInstance(modalRef.current);

      // Sync React state when modal is closed (manually or programmatically)
      modalRef.current.addEventListener("hidden.bs.modal", () => {
        onClose();
      });
    }
  }, [onClose]);

  useEffect(() => {
    if (modalInstance.current) {
      if (show) {
        modalInstance.current.show();
      } else {
        modalInstance.current.hide();
      }
    }
  }, [show]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingNote ? "Edit Note" : "Add New Note"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <NoteForm
              onSave={(note) => {
                onSave(note);
                modalInstance.current.hide(); // ✅ Hide modal after save
              }}
              editingNote={editingNote}
              onCancel={() => modalInstance.current.hide()} // ✅ Hide modal on cancel
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
