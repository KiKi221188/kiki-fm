import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="container section">
      <h1 className="page-title">Page not found</h1>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </section>
  );
}
