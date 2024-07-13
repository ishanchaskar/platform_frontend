import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack, Radio, RadioGroup, Button, SimpleGrid, Flex, Text } from '@chakra-ui/react';
import Timer from './Timer'; // Import Timer component

const mockQuestions = {
  physics: [
    "What is the capital of France?",
    "What is the speed of light?",
    // Add more questions
  ],
  chemistry: [
    "What is the chemical symbol for water?",
    "What is the atomic number of helium?",
    // Add more questions
  ],
  logical_reasoning: [
    // Add questions for logical reasoning
  ],
  bio: [
    // Add questions for bio
  ]
};

const mockOptions = {
  physics: [
    ["Paris", "London", "Berlin", "Madrid"],
    ["299,792,458 m/s", "150,000,000 m/s", "1,000,000 m/s", "None of the above"],
    // Add more options
  ],
  chemistry: [
    ["H2O", "O2", "CO2", "H2"],
    ["2", "4", "1", "3"],
    // Add more options
  ],
  logical_reasoning: [
    // Add options for logical reasoning
  ],
  bio: [
    // Add options for bio
  ]
};

const Question = () => {
  const { section, questionId } = useParams();
  const [timeElapsed, setTimeElapsed] = useState(0); // Time elapsed (starts from 0)
  const [resetTimer, setResetTimer] = useState(false); // State to reset timer
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(questionId ? parseInt(questionId, 10) - 1 : 0);
  const totalQuestions = section ? mockQuestions[section].length : 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Effect to start the timer and reset it when needed
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

  const questionText = section ? mockQuestions[section][currentQuestionIndex] : null;
  const options = section ? mockOptions[section][currentQuestionIndex] : null;

  const [selectedOption, setSelectedOption] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [answerSectionColor, setAnswerSectionColor] = useState('gray.100'); // Default color for answer section

  const correctAnswer = options ? options[0] : ''; // Assuming options[0] is the correct answer

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleStopTimer = () => {
    setResetTimer(true); // Trigger timer reset
  };

  const handleSubmitAnswer = () => {
    // Logic to handle submitting the answer for the current question
    console.log(`Selected option: ${selectedOption}`);
    setShowExplanation(true);

    if (selectedOption !== correctAnswer) {
      setAnswerSectionColor('red.100');
    } else {
      setAnswerSectionColor('green.100');
    }

    handleStopTimer(); // Reset the timer for the next question
  };

  const handleNextQuestion = () => {
    // Logic to handle moving to the next question
    setShowExplanation(false); // Hide explanation for the next question
    setSelectedOption(''); // Reset selected option for the next question

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setResetTimer(false); // Ensure timer starts for the next question
    }
  };

  const handlePreviousQuestion = () => {
    // Logic to handle moving to the previous question
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setResetTimer(false); // Ensure timer starts for the previous question
    }
  };

  const handleExplain = () => {
    setShowDetails(!showDetails);
  };

  const handleFinalSubmit = () => {
    // Logic to handle final submission (e.g., submit answers, show results)
    console.log('Final submission logic goes here');
  };

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return questionText ? (
    <Flex flex="1" direction="column" p="6" alignItems="center">
      <Timer resetTimer={resetTimer} handleStopTimer={handleStopTimer} />
      <VStack spacing="66" align="stretch" w="100%" mt="4">
        <Heading as="h3" size="lg" mb="4" fontWeight="normal">
          {questionText}
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

        <Flex justify="center">
          <Button
            id="submitButton"
            onClick={handleSubmitAnswer}
            size="lg"
            fontSize="xl"
            fontWeight="medium"
            colorScheme="blue"
            mt="4"
            mr="2"
            disabled={!selectedOption} // Disable if no option selected
          >
            Submit
          </Button>
        </Flex>

        <Flex justify="space-between">
          <Button
            id="previousButton"
            onClick={handlePreviousQuestion}
            size="lg"
            fontSize="xl"
            fontWeight="medium"
            colorScheme="blue"
            mt="4"
            mr="2"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            id={isLastQuestion ? 'finalSubmitButton' : 'nextButton'}
            onClick={isLastQuestion ? handleFinalSubmit : handleNextQuestion}
            size="lg"
            fontSize="xl"
            fontWeight="medium"
            colorScheme="blue"
            mt="4"
            ml="2"
            disabled={!selectedOption && !showExplanation} // Disable if no option selected and explanation not shown
          >
            {isLastQuestion ? 'Submit All' : 'Next'}
          </Button>
        </Flex>

        {showExplanation && (
          <Box mt="4" p="4" bg={answerSectionColor} borderWidth="1px" borderRadius="md" textAlign="center" w="100%">
            <Text fontSize="lg" fontWeight="bold">
              Correct Answer:
            </Text>
            <Text fontSize="xl" mt="2">
              {correctAnswer}
            </Text>
            <Button onClick={handleExplain} size="lg" fontSize="xl" fontWeight="medium" colorScheme="blue" mt="4">
              Explain
            </Button>
          </Box>
        )}

        {showDetails && (
          <>
            <Box mt="4" p="4" bg="gray.200" borderWidth="1px" borderRadius="md" textAlign="center" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                Explanation:
              </Text>
              <Text fontSize="xl" mt="2">
                Explanation text goes here...
              </Text>
            </Box>
            <Box mt="4" p="4" bg="gray.200" borderWidth="1px" borderRadius="md" textAlign="center" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                Shortcut:
              </Text>
              <Text fontSize="xl" mt="2">
                Shortcut information goes here...
              </Text>
            </Box>
          </>
        )}
      </VStack>
    </Flex>
  ) : (
    <Box>Welcome! Select a section from the sidebar to begin.</Box>
  );
};

export default Question;
