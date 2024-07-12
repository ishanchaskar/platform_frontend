import React, { useState } from 'react';
import { Box, Heading, VStack, Radio, RadioGroup, Button, SimpleGrid, Flex, Text } from '@chakra-ui/react';

const Question = ({ question, options, onNextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const correctAnswer = options[0]; // Assuming options[0] is the correct answer

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    onNextQuestion(selectedOption);
    setShowExplanation(true); // Show explanation after submitting answer
  };

  const handleExplain = () => {
    setShowDetails(!showDetails); // Toggle showDetails
  };

  return (
    <Flex flex="1" direction="column" p="6">
      <VStack spacing="6" align="stretch">
        <Heading as="h3" size="lg" mb="4">
          {question}
        </Heading>
        <RadioGroup onChange={handleOptionChange} value={selectedOption}>
          <SimpleGrid columns={2} spacing={4}>
            {options.map((option, index) => (
              <Radio key={index} value={option} size="lg" fontSize="xl" fontWeight="medium">
                {option}
              </Radio>
            ))}
          </SimpleGrid>
        </RadioGroup>
        <Button onClick={handleNextQuestion} size="lg" fontSize="xl" fontWeight="medium" colorScheme="blue" mt="4">
          Submit
        </Button>
        {showExplanation && (
          <Box mt="4" p="4" bg="gray.100" borderWidth="1px" borderRadius="md" textAlign="center">
            <Text fontSize="lg" fontWeight="bold">Correct Answer:</Text>
            <Text fontSize="xl" mt="2">{correctAnswer}</Text>
            <Button onClick={handleExplain} size="lg" fontSize="xl" fontWeight="medium" colorScheme="blue" mt="4">
              Explain
            </Button>
          </Box>
        )}
        {showDetails && (
          <Box mt="4" p="4" bg="gray.200" borderWidth="1px" borderRadius="md" textAlign="center">
            <Text fontSize="lg" fontWeight="bold">Explanation:</Text>
            <Text fontSize="xl" mt="2">Explanation text goes here...</Text>
          </Box>
        )}
        {showDetails && (
          <Box mt="4" p="4" bg="gray.200" borderWidth="1px" borderRadius="md" textAlign="center">
            <Text fontSize="lg" fontWeight="bold">Shortcut:</Text>
            <Text fontSize="xl" mt="2">Shortcut information goes here...</Text>
          </Box>
        )}
      </VStack>
    </Flex>
  );
};

export default Question;
