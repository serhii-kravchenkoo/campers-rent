import css from "./Header.module.css";
import Link from "next/link";


export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.navigation}>
          <Link href="/" className={css.logo}>
            <svg width={136} height={16}>
              <use href="/icons.svg#icon-Logo"></use>
            </svg>
          </Link>
          <ul className={css.navList}>
            <li>
              <Link href="/" className={css.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={css.navLink}>
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}