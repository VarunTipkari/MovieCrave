// TypingAnimation.js
import { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const TypingAnimation = () => {
  const texts = [
    'Creating something cool...',
    'Fetching your movie list...',
    'Finding your favorites...',
    'Let us inspire you with new movies...',
  ];

  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(50);  // Typing speed

  useEffect(() => {
    let typingTimeout;

    if (isDeleting) {
      typingTimeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, prev.length - 1)); // Deleting faster
      }, 20); // Very fast deletion speed (20ms)
    } else {
      typingTimeout = setTimeout(() => {
        setCurrentText(texts[textIndex].slice(0, currentText.length + 1)); // Typing quickly
      }, speed); 
    }

    if (currentText === texts[textIndex] && !isDeleting) {
      setSpeed(500); // Small delay before deleting text
      setIsDeleting(true);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setSpeed(50); // Reset typing speed after deletion
    }

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, textIndex, speed]);

  return (
    <Box>
      <Text fontSize="xl" color="gray.500">
        {currentText}
      </Text>
    </Box>
  );
};

export default TypingAnimation;
