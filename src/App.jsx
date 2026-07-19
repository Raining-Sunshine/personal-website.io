import React, { useEffect, useState } from "react";
import "./App.css";

const keinsciUrl = "http://bbs.keinsci.com/thread-42564-1-1.html";
const githubUrl = "https://github.com/Raining-Sunshine";
const ao3Url = "https://archiveofourown.org/users/Diotima_Chang";

const routes = {
  home: "home",
  blog: "blog",
  simulation: "simulation",
  life: "life",
  computer: "computer",
  article: "article",
  fanfiction: "fanfiction",
  links: "links",
};

function Header({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <>
      <header className="hero-header">
        <img src={`${assetBase}header.png`} alt="Site header" className="hero-image" />
        <div className="hero-overlay">
          <div className="site-title">Diotima Chang</div>
        </div>
      </header>
      <div className="thin-strip" aria-hidden="true" />
      <nav className="main-nav" aria-label="Main navigation">
        <button onClick={() => navigate(routes.home)}>Home</button>
        <button onClick={() => navigate(routes.blog)}>Blog</button>
        <button onClick={() => navigate(routes.fanfiction)}>Fanfiction</button>
        <button onClick={() => navigate(routes.links)}>Links</button>
      </nav>
    </>
  );
}

function Breadcrumbs({ items, navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <i>/</i>}
          {item.route ? (
            <button onClick={() => navigate(item.route)}>{item.label}</button>
          ) : (
            <b>{item.label}</b>
          )}
        </span>
      ))}
    </nav>
  );
}

function DirectoryCard({ title, description, onClick }) {
  return (
    <button className="directory-card" onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Open directory</span>
    </button>
  );
}

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
          <h2>Blog</h2>
          <p>Simulation, life, and computer-related notes.</p>
          <button onClick={() => navigate(routes.blog)}>Open blog</button>
        </article>
        <article className="section-card">
          <h2>Links</h2>
          <p>GitHub and Archive of Our Own.</p>
          <button onClick={() => navigate(routes.links)}>Open links</button>
        </article>
        <article className="section-card">
          <h2>Fanfiction</h2>
          <p>A directory for fanfiction and fandom writing.</p>
          <button onClick={() => navigate(routes.fanfiction)}>Open fanfiction</button>
        </article>
        <article className="section-card">
          <h2>Other</h2>
          <p>Miscellaneous notes, announcements, contact details, and site updates.</p>
        </article>
      </section>
    </main>
  );
}

function BlogDirectory({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blog" }]} />
      <header className="sub-heading">
        <h1>Blog</h1>
      </header>
      <section className="directory-grid">
        <DirectoryCard title="Simulation" description="Computational materials, modeling, and simulation notes." onClick={() => navigate(routes.simulation)} />
        <DirectoryCard title="Life" description="Personal and everyday-life notes." onClick={() => navigate(routes.life)} />
        <DirectoryCard title="Computing" description="Computer science, security, algorithms, and related topics." onClick={() => navigate(routes.computer)} />
      </section>
    </main>
  );
}

function CategoryPage({ category, navigate, children }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blog", route: routes.blog },
          { label: category },
        ]}
      />
      <header className="sub-heading">
        <h1>{category}</h1>
      </header>
      <section className="entry-list">{children}</section>
    </main>
  );
}

function Entry({ title, label, onClick }) {
  return (
    <article className="entry-card">
      <div>
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
      {onClick ? <button onClick={onClick}>Open</button> : <span className="pending">To be filled</span>}
    </article>
  );
}

function ArticleTemplate({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blog", route: routes.blog },
          { label: "Life", route: routes.life },
          { label: "Article draft" },
        ]}
      />
      <article className="article-template">
        <div className="article-cover">Image placeholder</div>
        <div className="article-content">
          <p className="article-meta">Date / Category</p>
          <h1>Article title</h1>
          <p className="article-subtitle">Article subtitle</p>
          <h2>Section heading</h2>
          <p>Write the article body here.</p>
          <figure>
            <div className="article-image">Image placeholder</div>
            <figcaption>Image caption</figcaption>
          </figure>
          <h2>Section heading</h2>
          <p>Write the article body here.</p>
        </div>
      </article>
    </main>
  );
}

function Fanfiction({ navigate, openEmbed }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Fanfiction" }]} />
      <header className="sub-heading">
        <h1>Fanfiction</h1>
      </header>
      <section className="directory-grid single">
        <button className="directory-card" onClick={openEmbed}>
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>Open embedded view</span>
        </button>
      </section>
    </main>
  );
}

function Links({ navigate, openAo3 }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Links" }]} />
      <header className="sub-heading">
        <h1>Links</h1>
      </header>
      <section className="directory-grid links-directory">
        <a className="directory-card" href={githubUrl} target="_blank" rel="noreferrer">
          <h2>GitHub</h2>
          <p>Raining-Sunshine</p>
          <span>Open page</span>
        </a>
        <button className="directory-card" onClick={openAo3}>
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>Open embedded view</span>
        </button>
      </section>
    </main>
  );
}

function ExternalMask({ title, url, embedded, close }) {
  useEffect(() => {
    const handler = (event) => event.key === "Escape" && close();
    addEventListener("keydown", handler);
    return () => removeEventListener("keydown", handler);
  }, [close]);

  return (
    <div
      className="mask-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <div className="mask-panel">
        <header>
          <strong>{title}</strong>
          <div>
            <a href={url} target="_blank" rel="noreferrer">Open original page</a>
            <button onClick={close} aria-label="Close">x</button>
          </div>
        </header>
        {embedded ? (
          <div className="iframe-wrap">
            <iframe src={url} title={title} />
            <p>If the page blocks embedding, use "Open original page".</p>
          </div>
        ) : (
          <div className="link-mask">
            <h2>{title}</h2>
            <p>This external link uses HTTP, so it cannot be safely embedded inside an HTTPS page.</p>
            <a href={url} target="_blank" rel="noreferrer">Go to original page</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(routes.home);
  const [mask, setMask] = useState(null);

  useEffect(() => {
    const sync = () => {
      const next = location.hash.replace("#/", "") || routes.home;
      setRoute(Object.hasOwn(routes, next) ? next : routes.home);
    };

    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);

  const navigate = (next) => {
    location.hash = `#/${next}`;
    scrollTo({ top: 0, behavior: "smooth" });
  };

  let content;
  if (route === routes.blog) {
    content = <BlogDirectory navigate={navigate} />;
  } else if (route === routes.simulation) {
    content = (
      <CategoryPage category="Simulation" navigate={navigate}>
        <Entry title="Computational Chemistry Forum Blog" label="External link" onClick={() => setMask({ title: "Computational Chemistry Forum Blog", url: keinsciUrl, embedded: false })} />
      </CategoryPage>
    );
  } else if (route === routes.life) {
    content = (
      <CategoryPage category="Life" navigate={navigate}>
        <Entry title="Article draft" label="Site article" onClick={() => navigate(routes.article)} />
      </CategoryPage>
    );
  } else if (route === routes.computer) {
    content = (
      <CategoryPage category="Computing" navigate={navigate}>
        <Entry title="Article draft" label="Site article" />
      </CategoryPage>
    );
  } else if (route === routes.article) {
    content = <ArticleTemplate navigate={navigate} />;
  } else if (route === routes.fanfiction) {
    content = <Fanfiction navigate={navigate} openEmbed={() => setMask({ title: "AO3 / Diotima_Chang", url: ao3Url, embedded: true })} />;
  } else if (route === routes.links) {
    content = <Links navigate={navigate} openAo3={() => setMask({ title: "AO3 / Diotima_Chang", url: ao3Url, embedded: true })} />;
  } else {
    content = <Home navigate={navigate} />;
  }

  return (
    <>
      <Header navigate={navigate} />
      {content}
      {mask && <ExternalMask {...mask} close={() => setMask(null)} />}
    </>
  );
}
