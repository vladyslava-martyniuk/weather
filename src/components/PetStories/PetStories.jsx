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
  const [usingMock, setUsingMock] = useState(false); 

  // Fallback-новини
  const mockStories = [
    { title: "Hero Dog Saves Family From Fire", url: "#", image: "https://images.unsplash.com/photo-1558788353-f76d92427f16" },
    { title: "Cat Travels 200 Miles To Return Home", url: "#", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" },
    { title: "Pet Therapy Helps Kids In Hospitals", url: "#", image: null },
    { title: "Golden Retriever Becomes Internet Star", url: "#", image: "https://images.unsplash.com/photo-1552053831-71594a27632d" },
    { title: "Rescue Puppy Finds Forever Home", url: "#", image: null },
  ];

  useEffect(() => {
    const fetchPetStories = async () => {
      if (!API_KEY_NEWS) {
        setError({ message: "API key missing" });
        setPetStories(mockStories);
        setHasMore(false);
        setUsingMock(true);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=(pet OR dog OR cat)&lang=en&max=5&page=${page}&token=${API_KEY_NEWS}`
        );
        const data = await response.json();

        if (!response.ok || data.errors) {
          throw new Error(data.errors?.[0] || "API error / limit reached");
        }

        if (data.articles && data.articles.length > 0) {
          setPetStories(prev => {
            const merged = [...prev, ...data.articles];
            const unique = Array.from(new Map(merged.map(a => [a.url, a])).values());
            return unique;
          });
          setHasMore(data.articles.length >= 5);
          setUsingMock(false); // Ми отримали реальні новини
        } else {
          if (!usingMock) setPetStories(mockStories);
          setHasMore(false);
          setUsingMock(true);
        }
      } catch (err) {
        console.log("API error:", err);
        if (!usingMock) setPetStories(mockStories);
        setError(err);
        setHasMore(false);
        setUsingMock(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPetStories();
  }, [page, API_KEY_NEWS]);

  const handleLoadMore = () => {
    if (!loading && hasMore) setPage(prev => prev + 1);
  };

  return (
    <section className={style.petStories}>
      <Container>
        <h2 className={style.petStories__title}>Pet Stories</h2>

        {loading && page === 1 && <p>Loading...</p>}

        {error && usingMock && (
          <p className={style.error}>
            Не вдалося завантажити новини 😢 <br />
            Показані тестові історії
          </p>
        )}

        {!loading && petStories.length === 0 && !error && (
          <p>No stories found</p>
        )}

        {petStories.length > 0 && (
          <div className={style.petStories__grid}>
            {petStories.map((story, index) => (
              <div key={`${story.url}-${index}`} className={style.petStories__item}>
                {story.image ? (
                  <img src={story.image} alt={story.title} />
                ) : (
                  <div className={style.placeholder}>
                    <img src="/placeholder.png" alt="No image available" />
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