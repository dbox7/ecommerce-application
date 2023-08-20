import './CSearchProduct.css';

export function CSearchProduct() {

  return (
    <div className="search-container">
      <input type="text" placeholder="Search.." name="search" />
      <button type="submit" className="search-btn">yes!</button>
    </div>
  );

}