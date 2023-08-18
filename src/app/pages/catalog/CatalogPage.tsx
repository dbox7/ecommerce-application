import cat from '../../assets/cat2.png';
import './CatalogPage.css';

export function CatalogPage() {

  return (
    <div className="catalog">
      <img src={cat} alt="slepping cat" className="cat"></img>
      <h1>Catalog will be here</h1>
    </div>
  );

}