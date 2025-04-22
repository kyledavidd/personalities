import { useState, useEffect } from 'react';
import './App.css';

// Define the type for the data you're fetching
type Personality = {
  name: string;
  description: string;
  url: string;
  alt: string;
};

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const hasNext = index < personalities.length - 1;
  const hasPrevious = index > 0;

  useEffect(() => {
    const fetchPersonalities = async () => {
      try {
        const response = await fetch('http://localhost:8080/david/personalities'); // Updated endpoint if needed
        if (response.ok) {
          const data: Personality[] = await response.json();
          setPersonalities(data);
        } else {
          setError('No data');
        }
      } catch (error) {
        setError('No Data');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalities();
  }, []);

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleBackClick() {
    if (hasPrevious) {
      setIndex(index - 1);
    } else {
      setIndex(personalities.length - 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (personalities.length === 0) return <div>No personalities found.</div>;

  const current = personalities[index];

  return (
    <>
      <h1>Yhuan Kyle David</h1>

      <button onClick={handleBackClick}>Back</button>
      <button onClick={handleNextClick}>Next</button>

      <h2><i>{current.name}</i></h2>
      <h3>({index + 1} of {personalities.length})</h3>

      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{current.description}</p>}

      <img src={current.url} alt={current.alt} />
    </>
  );
}
