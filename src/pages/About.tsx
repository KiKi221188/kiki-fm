export function About() {
  return (
    <section className="container section about">
      <h1 className="page-title">About KiKi FM</h1>
      <p>
        KiKi FM is a simple directory and player for Tamil radio stations. Search, filter by
        category, and save your favourites — all in your browser, with no account required.
      </p>

      <h2 id="disclaimer" className="station-details__heading">
        Disclaimer
      </h2>
      <p>
        KiKi FM is an independent radio directory and player. We do not host, produce or own any
        of the audio streams listed on this site. Each stream is served directly from its
        station's own broadcast servers, and the browser connects to it directly when you press
        Play. Station names, logos and content remain the property of their respective owners,
        who are solely responsible for the legality and content of their broadcasts. If you are a
        station operator and want a listing changed or removed, please get in touch.
      </p>
    </section>
  );
}
