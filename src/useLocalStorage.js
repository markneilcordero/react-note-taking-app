import { useState, useEffect } from "react";

// Sample data for notes - Tutorial
const sampleNotes = [
  {
    id: "tutorial-1",
    title: "Welcome to Your Note App!",
    content: "This is a simple note to get you started. You can create, edit, pin, tag, search, and delete notes.",
    tags: ["tutorial", "welcome"],
    pinned: true
  },
  {
    id: "tutorial-2",
    title: "Creating a New Note",
    content: "Click the 'Add Note' button (usually a '+' icon or similar) to open the note form. Fill in the title, content, and optional tags, then save!",
    tags: ["tutorial", "create"],
    pinned: false
  },
  {
    id: "tutorial-3",
    title: "Viewing and Editing Notes",
    content: "Click on any note card to open it in a modal view. From there, you can read the full content or click an 'Edit' button to make changes.",
    tags: ["tutorial", "view", "edit"],
    pinned: false
  },
  {
    id: "tutorial-4",
    title: "Pinning Important Notes",
    content: "Want to keep a note at the top? Click the pin icon on the note card or in the note view. Pinned notes appear in a separate section.",
    tags: ["tutorial", "pin"],
    pinned: false
  },
  {
    id: "tutorial-5",
    title: "Using Tags for Organization",
    content: "Add tags (like 'work', 'personal', 'ideas') to your notes when creating or editing. You can then filter your notes by clicking on a tag in the filter area.",
    tags: ["tutorial", "tags", "filter"],
    pinned: false
  },
  {
    id: "tutorial-6",
    title: "Searching Your Notes",
    content: "Use the search bar at the top to quickly find notes. It searches through titles and content.",
    tags: ["tutorial", "search"],
    pinned: false
  },
  {
    id: "tutorial-7",
    title: "Deleting Notes",
    content: "No longer need a note? Click the delete icon (usually a trash can) on the note card or in the note view. You'll be asked to confirm.",
    tags: ["tutorial", "delete"],
    pinned: false
  }
];

/**
 * useLocalStorage Hook
 * @param {string} key - The localStorage key to use
 * @param {*} initialValue - Default value if no existing value found
 */
const useLocalStorage = (key, initialValue) => {
  // Load value from localStorage (or use initialValue)
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (key === "notes_data" && !stored) {
        return sampleNotes; // Use sample data if no existing value
      }
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("useLocalStorage error:", error);
      return initialValue;
    }
  });

  // Save to localStorage on value change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
