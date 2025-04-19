import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NoteModal from "./NoteModal";
import NoteList from "./NoteList";
import PinnedNotes from "./PinnedNotes";
import TagFilter from "./TagFilter";
import useLocalStorage from "./useLocalStorage";
import useTheme from "./useTheme";

const LOCAL_STORAGE_KEY = "notes_data";

const App = () => {
  const [notes, setNotes] = useLocalStorage("notes_data", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const { theme, toggleTheme } = useTheme();

  // Handle saving new or updated note
  const handleSaveNote = (note) => {
    setNotes((prevNotes) => {
      const exists = prevNotes.some((n) => n.id === note.id);
      if (exists) {
        return prevNotes.map((n) => (n.id === note.id ? note : n));
      } else {
        return [note, ...prevNotes];
      }
    });
    setEditingNote(null);
  };

  // Delete note
  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  };

  // Edit note
  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  // Pin/unpin note
  const togglePinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // Filtered and searched notes
  const filteredNotes = notes.filter((note) => {
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const otherNotes = filteredNotes.filter((note) => !note.pinned);

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];

  return (
    <div className="container d-flex flex-column min-vh-100">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mt-4">My Notes</h4>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg"></i> New Note
          </button>
        </div>

        <TagFilter
          tags={allTags}
          activeTag={selectedTag}
          onTagSelect={setSelectedTag}
        />

        <PinnedNotes
          notes={pinnedNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />

        <NoteList
          notes={otherNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onPinToggle={togglePinNote}
        />
      </main>

      <NoteModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />

      <Footer />
    </div>

  );
};

export default App;
