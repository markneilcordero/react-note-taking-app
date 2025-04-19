import { useState, useEffect } from "react";

// Sample data for notes
const sampleNotes = [
  {
    id: "1713500000001",
    title: "Meeting Notes - Project Alpha",
    content: "Discussed project milestones for Q2. Key decisions: Finalize UI mockups by next week. Assign tasks for backend integration.",
    tags: ["work", "meeting", "project alpha"],
    pinned: true
  },
  {
    id: "1713500000002",
    title: "Grocery List",
    content: "Milk (2L), Whole Wheat Bread, Eggs (dozen), Cheddar Cheese, Apples, Bananas, Spinach.",
    tags: ["personal", "shopping"],
    pinned: false
  },
  {
    id: "1713500000003",
    title: "React Learning: Hooks",
    content: "Review useState for state management, useEffect for side effects (data fetching, subscriptions), useContext for global state.",
    tags: ["react", "coding", "javascript", "learning"],
    pinned: true
  },
  {
    id: "1713500000004",
    title: "Book Idea: Chronoscape",
    content: "Concept: A sci-fi thriller where time travelers accidentally unravel the fabric of reality. Need to develop main characters and plot points.",
    tags: ["writing", "ideas", "sci-fi"],
    pinned: false
  },
  {
    id: "1713500000005",
    title: "Weekly Workout Plan",
    content: "Monday: Chest & Triceps\nTuesday: Back & Biceps\nWednesday: Legs & Shoulders\nThursday: Rest\nFriday: Full Body\nSat/Sun: Active Recovery/Cardio",
    tags: ["health", "fitness"],
    pinned: false
  },
  {
    id: "1713500000006",
    title: "Recipe: Simple Tomato Pasta",
    content: "Ingredients: Pasta, Canned Tomatoes, Garlic, Onion, Olive Oil, Basil, Salt, Pepper. Sauté garlic/onion, add tomatoes, simmer, cook pasta, combine.",
    tags: ["cooking", "recipe", "food"],
    pinned: false
  },
  {
    id: "1713500000007",
    title: "Gift Ideas - Mom's Birthday",
    content: "Ideas: Spa voucher, nice scarf, gardening tools, photo album.",
    tags: ["personal", "gifts", "family"],
    pinned: false
  },
  {
    id: "1713500000008",
    title: "CSS Layout Techniques",
    content: "Flexbox: Great for 1D layouts (rows or columns). Grid: Ideal for 2D layouts (rows and columns). Remember box-sizing: border-box!",
    tags: ["coding", "css", "webdev"],
    pinned: true
  },
  {
    id: "1713500000009",
    title: "Summer Vacation Planning",
    content: "Destination: Italy (Rome, Florence, Venice). Book flights by end of April. Research hotels and train tickets. Check passport validity.",
    tags: ["travel", "personal", "planning"],
    pinned: false
  },
  {
    id: "1713500000010",
    title: "Tech Learning Goals Q2",
    content: "1. Deep dive into TypeScript with React.\n2. Explore state management with Zustand.\n3. Build a small project using Next.js.",
    tags: ["coding", "learning", "react", "typescript", "nextjs"],
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
