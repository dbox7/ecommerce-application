import { FC } from 'react';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';

import './CBurgerMenu.css';

interface IBurgerMenuProps {
  openMenu: boolean,
  setOpenMenu: Function
}

const CBurgerMenu: FC<IBurgerMenuProps> = ({openMenu, setOpenMenu}) => {

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