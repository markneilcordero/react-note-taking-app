import React from "react";
import NoteCard from "./NoteCard";

const PinnedNotes = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) return null;

  return (
    <div className="mb-5">
      <h5 className="mb-3">📌 Pinned Notes</h5>
      <div className="row g-3">
        {notes.map((note) => (
          <div className="col-md-6 col-lg-4" key={note.id}>
            <NoteCard
              note={note}
              onEdit={() => onEdit(note)}
              onDelete={() => onDelete(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedNotes;
