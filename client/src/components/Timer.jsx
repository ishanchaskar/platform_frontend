import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Timer = ({ currentQuestion, totalQuestions }) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Time elapsed (starts from 0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1); // Increment timeElapsed
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Run effect only once on component mount

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return (
    <Box textAlign="center" p="4" bg="white" borderWidth="1px" borderRadius="md" boxShadow="base">
      <Text fontSize="xl" fontWeight="bold">Question {currentQuestion} of {totalQuestions}</Text>
      <Text fontSize="2xl" fontWeight="semibold" mt="2">
        Time Elapsed: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </Box>
  );
}

export default Timer;
