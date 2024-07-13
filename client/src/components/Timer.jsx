import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Timer = ({ resetTimer, stopTimer }) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Time elapsed (starts from 0)

  useEffect(() => {
    let timer;
    if (resetTimer) {
      setTimeElapsed(0); // Reset time elapsed
    } else {
      timer = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1); // Increment timeElapsed
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resetTimer]); // Reset timer on prop change

  const handleStopTimer = () => {
    clearInterval(Timer); // Stop the timer
    stopTimer(timeElapsed); // Save the elapsed time value
  };

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return (
    <Box textAlign="center" p={{ base: "2", md: "4" }} bg="white" borderWidth="1px" borderRadius="md" boxShadow="base" position="absolute" right={{ base: "5%", md: "5%" }} w={{ base: "20%", md: "auto" }}>
      <Text fontSize="xl" fontWeight="bold">Time Elapsed:</Text>
      <Text fontSize="2xl" fontWeight="semibold" mt="2">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </Box>
  );
}

export default Timer;