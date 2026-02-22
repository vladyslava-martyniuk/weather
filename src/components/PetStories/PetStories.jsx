import { useState, useEffect } from "react";
import style from "./PetStories.module.css";
import Container from "../Container/Container";

export default function PetStories() {
  const API_KEY_NEWS = import.meta.env.VITE_GNEWS_API_KEY;

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
          `https://gnews.io/api/v4/search?q=pet OR dog OR cat&lang=en&max=5&page=${page}&token=${API_KEY_NEWS}`
        );

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          setPetStories(prev => {
            const merged = [...prev, ...data.articles];
            // прибираємо дублікати по url
            const unique = Array.from(
              new Map(merged.map(a => [a.url, a])).values()
            );
            return unique;
          });

          // Якщо менше ніж 5 статей — більше новин немає
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
  }, [page, API_KEY_NEWS]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <section className={style.petStories}>
      <Container>
        <h2 className={style.petStories__title}>Pet Stories</h2>

        {loading && page === 1 && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && petStories.length === 0 && <p>No stories found</p>}

        {petStories.length > 0 && (
          <div className={style.petStories__grid}>
            {petStories.map((story, index) => (
              <div
                key={`${story.url}-${index}`}
                className={style.petStories__item}
              >
                {story.image ? (
                  <img src={story.image} alt={story.title} />
                ) : (
                  <div className={style.placeholder}>
                    Image Not Found
                  </div>
                )}

                <h3>
                  <a
                    className={style.petStories__link}
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {story.title}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        )}

        {hasMore && petStories.length > 0 && (
          <button
            className={style.petStories__btn}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </Container>
    </section>
  );
}