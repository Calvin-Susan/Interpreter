import React from 'react'; 
import React, { useState, useEffect } from "react";
import "./styles.css"; // Make sure this matches your CSS file name!

// Our hilarious data
const feedbackPairs = [
  {
    id: 1,
    client: "Make it pop!",
    translation: "Could you maybe add... *jazz hands*... somewhere?",
  },
  {
    id: 2,
    client: "Just needs a few tweaks.",
    translation:
      "Prepare for a full refactor based on feedback from my cousin who 'knows computers'.",
  },
  {
    id: 3,
    client: "Can we make the logo bigger?",
    translation: "Forget whitespace, I want my brand visible from orbit.",
  },
  {
    id: 4,
    client: "Let's circle back on this.",
    translation:
      "I have no idea what you just said, and I hope you forget we ever spoke.",
  },
  {
    id: 5,
    client: "We want something really clean and modern.",
    translation:
      "Make it look like Apple's website, but for our dog grooming business.",
  },
  {
    id: 6,
    client: "Can you just squeeze this in?",
    translation: "This is now your top priority, regardless of your schedule.",
  },
  {
    id: 7,
    client: "It shouldn't take too long.",
    translation: "I have absolutely no idea how long this takes.",
  },
  {
    id: 8,
    client: "I trust your expertise.",
    translation: "...but I'm going to question every decision you make.",
  },
  {
    id: 9,
    client: "We're like a family here.",
    translation: "Prepare for unreasonable demands outside of business hours.",
  },
  {
    id: 10,
    client: "Can you send over a few options?",
    translation: "I want you to do three times the work for the price of one.",
  },
  {
    id: 11,
    client: "This should be really simple.",
    translation: "I have vastly underestimated the complexity involved.",
  },
  {
    id: 12,
    client: "My last developer just disappeared.",
    translation: "There's a 90% chance I was the reason they disappeared.",
  },
  {
    id: 13,
    client: "We're looking for a 'rockstar'/'ninja'/'guru'.",
    translation: "We want expert skills at an intern's salary.",
  },
  {
    id: 14,
    client: "Just make it look professional.",
    translation:
      "I have no concrete ideas, but I'll know it when I see it (and probably hate the first version).",
  },
  {
    id: 15,
    client: "Can we hop on a quick call?",
    translation:
      "Block out the next 90 minutes of your life for a call that could have been an email.",
  },
  {
    id: 16,
    client: "What's your hourly rate?",
    translation: "I'm mentally calculating how little I can possibly pay you.",
  },
  {
    id: 17,
    client: "We're agile.",
    translation: "We change our minds constantly and call it a 'process'.",
  },
  {
    id: 18,
    client: "Let's put a pin in that.",
    translation: "We are never, ever going to talk about this again.",
  },
  {
    id: 19,
    client: "Can you make it more 'user-friendly'?",
    translation: "My mother couldn't figure it out in 5 seconds.",
  },
  {
    id: 20,
    client: "I'll get you the content next week.",
    translation: "*Crickets chirp indefinitely*",
  },
  {
    id: 21,
    client: "We need this to be SEO optimized.",
    translation: "Sprinkle some keywords in there. How hard can it be?",
  },
  {
    id: 22,
    client: "Is this responsive?",
    translation: "Does it work on my specific, slightly outdated phone model?",
  },
  {
    id: 23,
    client: "Just use placeholder text for now.",
    translation: "'Lorem Ipsum' will be launching on the live site.",
  },
  {
    id: 24,
    client: "Can we add a carousel/slider here?",
    translation: "I enjoy making users dizzy and hurting conversion rates.",
  },
  {
    id: 25,
    client: "It feels a little... empty.",
    translation: "Please cram more unnecessary elements onto the screen.",
  },
  {
    id: 26,
    client: "Our budget is limited, but there's potential for future work!",
    translation: "Our budget is non-existent, and so is the future work.",
  },
  {
    id: 27,
    client: "Can you just center the text?",
    translation: "My design aesthetic peaked with Microsoft WordArt in 1998.",
  },
];

// Simple component for the client's bubble
function ClientBubble({ text, onClick }) {
  return (
    <div className="bubble client-bubble" onClick={onClick}>
      {text}
    </div>
  );
}

// Simple component for the translation bubble
function TranslationBubble({ translation }) {
  return <div className="bubble translation-bubble">{translation}</div>;
}

// Simple component for the typing indicator

function TypingIndicator() {
  return (
    <div className="bubble typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

// Our main App component
function App() {
  // State to track which translation is visible and which is "typing"
  const [activeId, setActiveId] = useState(null);
  const [typingId, setTypingId] = useState(null);
  const timeoutRef = React.useRef(null); // Ref to store timeout ID

  // Function to handle clicking a client bubble
  const handleClick = (id) => {
    // Clear any existing timeout to prevent race conditions
    clearTimeout(timeoutRef.current);

    if (typingId === id || activeId === id) {
      // If clicking the active/typing one, hide it
      setActiveId(null);
      setTypingId(null);
    } else {
      // Otherwise, start the typing animation for the new one
      setActiveId(null); // Hide previous translation immediately
      setTypingId(id); // Show typing indicator for the new one

      // Wait a bit, then show the translation
      timeoutRef.current = setTimeout(() => {
        setTypingId(null); // Stop typing indicator
        setActiveId(id); // Show the actual translation
      }, 750); // Adjust typing speed (milliseconds)
    }
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="interpreter-container">
      <h1 class="title">The Agency Client Interpreter</h1>
      {feedbackPairs.map((pair) => (
        <div key={pair.id} className="pair-container">
          <ClientBubble
            text={pair.client}
            onClick={() => handleClick(pair.id)}
          />
          {/* Conditionally render typing or translation */}
          {typingId === pair.id && <TypingIndicator />}
          {activeId === pair.id && (
            <TranslationBubble translation={pair.translation} />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
