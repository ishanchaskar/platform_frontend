import React, { useState } from 'react';
import { CNavGroup, CNavItem } from '@coreui/react';

const SectionDropdown = ({ section, title, questions, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CNavGroup toggler={
      <div className="nav-link" onClick={toggleDropdown}>
        {title}
      </div>
    }>
      {isOpen && (
        <CNavItem href="#" onClick={() => onClick(section)}>
          {title} - Question 1
        </CNavItem>
      )}
    </CNavGroup>
  );
};

export default SectionDropdown;
