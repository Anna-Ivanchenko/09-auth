import css from './Home.module.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'The requested page does not exist',
  openGraph: {
    title: '404 - Page not found',
    description: 'The requested page does not exist',
    url: '/not-found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};
const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};
export default NotFound;