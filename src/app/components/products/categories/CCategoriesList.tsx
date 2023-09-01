import { Category } from '@commercetools/platform-sdk';
import { useState, memo } from 'react';

import './CCategoriesList.css';

export const CCategoriesList = memo(({categories, callback}: {categories: Category[], callback: Function}) => {

  const [chosenCategory, setChosenCategory] = useState<string | undefined>(undefined);

  const handleClick = (id: string | undefined) => {

    setChosenCategory(id);
    callback({categoryId: id});

  };

  console.log(`render ${CCategoriesList.displayName}`);

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