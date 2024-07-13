import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Timer from '../components/Timer';
import '@coreui/coreui/dist/css/coreui.min.css';
import { Flex, Box } from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Flex flexGrow={1}>
        <Sidebar />
        <Flex flex="1" direction="column" p="6">
          <Outlet /> {/* This will render nested routes */}
        </Flex>
        <Box bg="gray.100" borderRadius="md" boxShadow="base">
          {/* <Timer durationInSeconds={300} /> */}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
