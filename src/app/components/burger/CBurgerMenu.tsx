import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';

import './CBurgerMenu.css';

const CBurgerMenu = ({openMenu, setOpenMenu}:{openMenu: boolean, setOpenMenu: Function}) => {

  const handleClick = () => {

    setOpenMenu(!openMenu);

  };

  return ( 

    <div className="burger-menu">
      <div className="burger-menu__wrap" onClick={handleClick}>
        {
          openMenu ?
            <RxCross2 className="burger-menu__icon"/> 
            :
            <RxHamburgerMenu className="burger-menu__icon"/>
        }
      </div>
    </div>

  );

};
 
export default CBurgerMenu;