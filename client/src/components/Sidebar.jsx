import React, { useState } from 'react';
import { CSidebar, CSidebarNav, CNavTitle } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SectionDropdown from './SectionDropdown';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section, questionId = 1) => {
    navigate(`/${section}/question/${questionId}`);
  };

  return (
    <>
      <div className="mb-2">
        <button className="btn btn-link" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <CSidebar colorScheme="dark" visible={isOpen}>
        <CSidebarNav>
          <CNavTitle>Nav Title</CNavTitle>
          <SectionDropdown section="physics" title="Physics" questions={5} onClick={handleSectionClick} />
          <SectionDropdown section="chemistry" title="Chemistry" questions={5} onClick={handleSectionClick} />
          <SectionDropdown section="logical_reasoning" title="Logical Reasoning" questions={5} onClick={handleSectionClick} />
          <SectionDropdown section="bio" title="Bio" questions={5} onClick={handleSectionClick} />
        </CSidebarNav>
      </CSidebar>
    </>
  );
};

export default Sidebar;
