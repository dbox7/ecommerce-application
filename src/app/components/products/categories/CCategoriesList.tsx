import { Category } from '@commercetools/platform-sdk';
import { useState, memo } from 'react';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';

import './CCategoriesList.css';


export const CCategoriesList = memo(({callback}: {callback: Function}) => {

  const [chosenCategory, setChosenCategory] = useState<string | undefined>(undefined);
  const { categories } = useTypedSelector(state => state.products);

  const handleClick = (id: string | undefined) => {

    setChosenCategory(id);
    callback({categoryId: id});

  };

  return (
    <div className="categories-container">
      <div className="categories">
        <ul>
          <li 
            className={ chosenCategory === undefined ? 'active': '' } 
            onClick={ (e) => handleClick(undefined) }>
            All
          </li>
          {
            categories.map((cat: Category) => 
              <li key={ cat.id } 
                className={ cat.id === chosenCategory ? 'active': '' } 
                onClick={ (e) => handleClick(cat.id)}
              >
                { cat.name['en'] }
              </li>
            )
          }
        </ul>
      </div>

    </div>
  );

});