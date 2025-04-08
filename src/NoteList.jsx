import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        No notes found. Try adding some!
      </div>
    );
  }

  return (
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
  );
};

export default NoteList;
