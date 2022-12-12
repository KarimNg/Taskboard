import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import Settings from './Settings';

const Header: React.FC = () => {
  const [ openSettingsMenu, setOpenSettingsMenu ] = React.useState<boolean>(false);

  return (
    <header>
      <div className="wrapper displayContainer">
        <div className="header__text">
          <h1>TaskBoard</h1>
        </div>
        <div className="header__buttons">
            <h2 onClick={() => setOpenSettingsMenu(openSettingsMenu => !openSettingsMenu)}>
              <span>Settings </span>
              <span className="header__menuToggleIcon"><FontAwesomeIcon icon={openSettingsMenu ? faTimes : faChevronDown} /></span>
            </h2>
          {
            openSettingsMenu
            &&
            <Settings />
          }

        </div>
      </div>
    </header>
  )
}


export default Header;