import { useState, useEffect } from "react";
import style from "./PetStories.module.css";
import Container from "../Container/Container";

export default function PetStories() {
  const BACKEND_URL = "https://weather.up.railway.app/api/pet-stories"; // твій Railway бекенд
  const [petStories, setPetStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const localMockStories = [
    {
      title: "Local Mock Cat Story",
      url: "#",
      image: "https://placekitten.com/302/200",
    },
    {
      title: "Another Local Mock Cat Story",
      url: "#",
      image: "https://placekitten.com/303/200",
    },
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

      const stories = data.data.children.map((post) => ({
        title: post.data.title,
        url: "https://reddit.com" + post.data.permalink,
        image:
          post.data.preview?.images[0]?.source?.url.replace(/&amp;/g, "&") ||
          "https://placekitten.com/300/200", // заглушка котика
      }));

      setPetStories((prev) => [...prev, ...stories]);
      setAfter(data.data.after);
      setHasMore(Boolean(data.data.after));
    } catch (err) {
      console.log("Reddit API не відповів, fetch на бекенд...", err);

      // fallback на бекенд
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        setPetStories((prev) => [...prev, ...data]);
        setHasMore(false);
      } catch (err) {
        console.log("Бекенд недоступний, показуємо локальні моки", err);
        setPetStories((prev) => [...prev, ...localMockStories]);
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

        {petStories.length === 0 && loading && <p>Loading...</p>}

        <div className={style.petStories__grid}>
          {petStories.map((story, i) => (
            <div key={i} className={style.petStories__item}>
              <img src={story.image} alt={story.title} />
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