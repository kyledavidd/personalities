import { useState } from 'react';
import { goatList } from './data';  
import './App.css'

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const hasNext = index < goatList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0); 
    }
  }

  function handleBackClick() {
    if (index === 0) {
      setIndex(goatList.length - 1);  
    } else {
      setIndex(index - 1);  
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let goat = goatList[index];  
  return (
    <>
      <h1>Yhuan Kyle David</h1>
      <button onClick={handleBackClick}>
        Back
      </button>
      <button onClick={handleNextClick}>
        Next
      </button>

      <h2>
        <i>{goat.name} </i>  
      </h2>
      <h3>
        ({index + 1} of {goatList.length})  
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{goat.description}</p>}  
      <img
        src={goat.url}  
        alt={goat.alt}  
      />
    </>
  );
}
