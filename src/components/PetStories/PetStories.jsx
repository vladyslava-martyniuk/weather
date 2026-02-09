import { useState, useEffect } from "react";
import style from "./PetStories.module.css";
import Container from "../Container/Container";

export default function PetStories() {
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  const [petStories, setPetStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPetStories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=pet OR dog OR cat&lang=en&max=5&page=${page}&token=${API_KEY}`
        );

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          setPetStories(prev => [...prev, ...data.articles]);

          if (data.articles.length < 5) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
          if (page === 1) setPetStories([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetStories();
  }, [page, API_KEY]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className={style.petStories}>
      <Container>
        <h2>Pet Stories</h2>

        {loading && page === 1 && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && petStories.length === 0 && <p>No stories found</p>}

        {petStories.length > 0 && (
          <div  className={style.petStories__grid}>
            {petStories.map(story => (
              <div key={story.url} className={style.petStories__item}>
                {story.image && (
                  <img src={story.image} alt={story.title} />
                )}
                <h3>{story.title}</h3>
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  {story.title}
                </a>
             
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <button onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </Container>
    </section>
  );
}
