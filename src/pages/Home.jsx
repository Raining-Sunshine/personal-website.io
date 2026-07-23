import { routes } from "../config/routes";

function Home({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <main className="home-main">
      <section className="profile-card" aria-label="Profile">
        <div className="avatar-wrap">
          <img src={`${assetBase}avatar.jpg`} alt="Avatar" className="avatar" />
        </div>
        <div className="intro-panel">
          <p className="eyebrow">About me</p>
          <h1>Hi, this is Diotima</h1>
          <p>
            I enjoy materials science and am currently applying for PhD programs. My main focus is computational materials science, and I work with tools such as COMSOL and Gaussian. I also enjoy computer-related topics, including neural networks, cybersecurity, and algorithms.
          </p>
          <p>
            I also write fanfiction on AO3. Most of my works are in Chinese, and I am gradually bringing links and notes back into this site.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <article className="section-card">
          <h2>Blogs</h2>
          <p>Modelling, computer, and life.</p>
          <button onClick={() => navigate(routes.blog)}>Open blogs</button>
        </article>
        <article className="section-card">
          <h2>Research</h2>
          <p>Academic CV and researchs.</p>
          <button onClick={() => navigate(routes.research)}>Open research</button>
        </article>
        <article className="section-card">
          <h2>Links</h2>
          <p>GitHub and AO3.</p>
          <button onClick={() => navigate(routes.links)}>Open links</button>
        </article>
        <article className="section-card">
          <h2>Contact me</h2>
          <p>Latest update: 2026-07-22 16:54 (UTC+8).</p>
          <button onClick={() => navigate(routes.contact)}>Leave a message</button>
        </article>
      </section>
    </main>
  );
}

export default Home;
