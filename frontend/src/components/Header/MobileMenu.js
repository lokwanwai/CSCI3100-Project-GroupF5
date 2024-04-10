import React from 'react';
import styled from 'styled-components';
import MenuContent from '../../pages/Admin/MenuContent';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #333;
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
`;

const MobileMenu = ({ isOpen }) => {
  return (
    <MenuContainer isOpen={isOpen}>
        <MenuContent/>
    </MenuContainer>
  );
};

export default MobileMenu;