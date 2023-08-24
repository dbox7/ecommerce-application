import { ICategoriesListProps } from '../../../utils/types';
import { Category } from '@commercetools/platform-sdk';
import './CCategoriesList.css';

export function CCategoriesList({categories, filters, setFilters }: ICategoriesListProps) {

  return (
    <div className="categories-container">
      <div className="categories">
        <ul>
          <li 
            className={ undefined === filters.categoryId ? 'active': '' } 
            onClick={ (e) => {
              
              setFilters({...filters, categoryId: undefined}); 

            } }>
            All
          </li>
          {
            categories.map((cat: Category) => 
              <li key={ cat.id } 
                className={ cat.id === filters.categoryId ? 'active': '' } 
                onClick={ (e) => {

                  setFilters({...filters, categoryId: cat.id}); 

                } }
              >
                { cat.name['en'] }
              </li>
            )
          }
        </ul>
      </div>

    </div>
  );

};