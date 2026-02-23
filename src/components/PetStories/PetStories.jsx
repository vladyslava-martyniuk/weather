import { useState, useEffect } from "react";
import style from "./PetStories.module.css";
import Container from "../Container/Container";

export default function PetStories() {
  const [petStories, setPetStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [after, setAfter] = useState(null); // для Reddit пагінації
  const [hasMore, setHasMore] = useState(true);

  const localFallback = [
    { title: "Local Cat Story", url: "#", image: "https://placekitten.com/305/200" }
  ];

  const fetchStories = async () => {
    setLoading(true);

    try {
      // Reddit API
      const url = `https://www.reddit.com/r/cats/top.json?limit=5${
        after ? `&after=${after}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      const newStories = data.data.children.map(post => ({
        title: post.data.title,
        url: "https://reddit.com" + post.data.permalink,
        image: post.data.preview?.images[0]?.source?.url.replace(/&amp;/g, "&")
               || `https://placekitten.com/300/200`
      }));

      setPetStories(prev => [...prev, ...newStories]);
      setAfter(data.data.after);
      setHasMore(Boolean(data.data.after));

    } catch (err) {
      console.log("Reddit failed, fallback to backend...", err);

      try {
        const backendRes = await fetch("http://127.0.0.1:5000/api/pet-stories");
        const backendData = await backendRes.json();
        setPetStories(prev => [...prev, ...backendData]);
        setHasMore(false);
      } catch {
        console.log("Backend unavailable, showing local fallback");
        setPetStories(prev => [...prev, ...localFallback]);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <section className={style.petStories}>
      <Container>
        <h2 className={style.petStories__title}>Cat Stories 🐱</h2>

        {loading && petStories.length === 0 && <p>Loading...</p>}

        <div className={style.petStories__grid}>
          {petStories.map((story, i) => (
            <div key={i} className={style.petStories__item}>
              <img src={story.image} alt={story.title} />
              <h3>
                <a href={story.url} target="_blank" rel="noopener noreferrer">
                  {story.title}
                </a>
              </h3>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            className={style.petStories__btn}
            onClick={fetchStories}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </Container>
    </section>
  );
}