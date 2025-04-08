import React, { useState, useEffect } from "react";

const NoteForm = ({ onSave, editingNote, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // Pre-fill the form when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setTags(editingNote.tags.join(", "));
    } else {
      setTitle("");
      setContent("");
      setTags("");
    }
  }, [editingNote]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    const newNote = {
      id: editingNote ? editingNote.id : Date.now(),
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdAt: editingNote ? editingNote.createdAt : new Date().toISOString(),
    };

    onSave(newNote); // Pass note to parent
    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">{editingNote ? "Edit Note" : "Add New Note"}</h5>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
            />
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your note"
              required
            />
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. work, ideas, coding"
            />
          </div>

          {/* Action buttons */}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editingNote ? "Update Note" : "Add Note"}
            </button>

            {editingNote && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
