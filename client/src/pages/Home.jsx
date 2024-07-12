import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Question from '../components/Question';
import Timer from '../components/Timer';
import { Flex, Box } from '@chakra-ui/react';

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

const Home = () => {
  const { section, questionId } = useParams();
  const questionIndex = questionId ? parseInt(questionId, 10) - 1 : 0;

  const question = section ? mockQuestions[section][questionIndex] : "";
  const options = section ? mockOptions[section][questionIndex] : [];

  const handleNextQuestion = (selectedOption) => {
    // Logic to handle moving to the next question
    console.log(`Selected option: ${selectedOption}`);
    // Update state or perform action to move to next question
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Flex flexGrow={1}>
        <Sidebar />
        <Flex flex="1" direction="column" p="6">
          {section && questionId ? (
            <Question question={question} options={options} onNextQuestion={handleNextQuestion} />
          ) : (
            <Box>Please select a section and question.</Box>
          )}
        </Flex>
        <Box w="250px" p="4" bg="gray.100" borderRadius="md" boxShadow="base">
          <Timer durationInSeconds={300} /> {/* Example duration: 5 minutes */}
          {/* You can add a component here to show questions answered */}
        </Box>
      </Flex>
    </Flex>
  );
}

export default Home;
