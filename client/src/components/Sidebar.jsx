import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  VStack,
  Box,
  Wrap,
  WrapItem,
  Text,
  Divider,
  Flex,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon ,CloseIcon, MinusIcon } from '@chakra-ui/icons'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Initially open

  const handleClose = () => {
    setIsOpen(false);
  };
 const handleOpen = () =>{
    setIsOpen(true)
 }
  return (
    <>
    <Box>
    
          <Button onClick={handleClose}><MinusIcon boxSize={6} /></Button>
          <Button onClick={handleOpen}><AddIcon boxSize={6} /></Button>
          
      <Box className='main' w="250px" h="100vh" bg={useColorModeValue('gray.100', 'gray.900')} boxShadow="base" p="4" borderRadius="md" overflowY="auto" display={isOpen ? 'block' : 'none'}>
      <VStack spacing="4" align="start">
        <SectionLink section="physics" title="Physics" questions={15} />
        <Divider />
        <SectionLink section="chemistry" title="Chemistry" questions={15} />
        <Divider />
        <SectionLink section="logical_reasoning" title="Logical Reasoning" questions={15} />
        <Divider />
        <SectionLink section="bio" title="Bio" questions={15} />
      </VStack>
    </Box>
    </Box>
    </>
  );
};

const useBoxColorMode = () => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.600');

  return { bgColor, hoverBgColor };
};

const SectionLink = ({ section, title, questions }) => {
  const { bgColor, hoverBgColor } = useBoxColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack spacing="4" align="start">
      <Box w="100%" textAlign="center" cursor="pointer" onClick={handleToggle}>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      </Box>
      {isOpen && (
        <VStack spacing="2" align="start">
          <SubsectionLink section={section} title="Subsection 1" questions={questions} />
          <SubsectionLink section={section} title="Subsection 2" questions={questions} />
          {/* Add more subsections as needed */}
        </VStack>
      )}
    </VStack>
  );
};

const SubsectionLink = ({ section, title, questions }) => {
  const { bgColor, hoverBgColor } = useBoxColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack spacing="2" align="start">
      <Box
        w="100%"
        p="2"
        borderWidth="1px"
        borderRadius="md"
        _hover={{ bg: hoverBgColor }}
        cursor="pointer"
        onClick={handleToggle}
      >
        <Text fontSize="md" fontWeight="bold">
          {title}
        </Text>
      </Box>
      {isOpen && (
        <Wrap spacing="1" justify="center">
          {Array.from({ length: questions }, (_, index) => (
            <WrapItem key={index}>
              <Flex
                p="2"
                borderWidth="1px"
                borderRadius="md"
                w="30px"
                h="30px"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
                bg={bgColor}
                _hover={{ bg: hoverBgColor }}
              >
                <Link to={`/${section}/question/${index + 1}`} style={{ fontSize: 'sm' }}>
                  {index + 1}
                </Link>
              </Flex>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </VStack>
  );
};

export default Sidebar;
