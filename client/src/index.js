import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":section/question/:questionId" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

// Use createRoot from react-dom/client
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
