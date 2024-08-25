import React, { useState } from 'react';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const RandomCatImage: React.FC = () => {
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomCat = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const [result]: CatImage[] = await response.json();
      setCatImage(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Random Cat Image</h1>
      <button onClick={fetchRandomCat} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Cat'}
      </button>
      {error && <p>Error: {error}</p>}
      {catImage && (
        <div>
          <img src={catImage.url} alt="Random cat" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Image ID: {catImage.id}</p>
        </div>
      )}
    </div>
  );
};

export default RandomCatImage;