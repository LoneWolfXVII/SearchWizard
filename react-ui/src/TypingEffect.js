import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text }) => {
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const textString = String(text);
    const wordsArray = textString.split(' ');
    const interval = setInterval(() => {
      if (wordIndex < wordsArray.length) {
        setWords((prevWords) => [...prevWords, wordsArray[wordIndex]]);
        setWordIndex(wordIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval speed as needed
    return () => clearInterval(interval);
  }, [text, wordIndex]);

  return (words.join(' '));
};

export default TypingEffect;