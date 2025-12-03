import Link from "next/link";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.hero}>
      <div className="container">
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.link}>
          View Now
        </Link>
      </div>
    </section>
  );
}