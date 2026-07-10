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
  fanworks: "fanworks",
  links: "links",
};

function Header({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <>
      <header className="hero-header">
        <img src={`${assetBase}header.png`} alt="站点头图" className="hero-image" />
        <div className="hero-overlay">
          <div className="site-title">Diotima Chang</div>
        </div>
      </header>
      <div className="thin-strip" aria-hidden="true" />
      <nav className="main-nav" aria-label="主导航">
        <button onClick={() => navigate(routes.home)}>首页</button>
        <button onClick={() => navigate(routes.blog)}>博客</button>
        <button onClick={() => navigate(routes.fanworks)}>同人</button>
        <button onClick={() => navigate(routes.links)}>相关链接</button>
      </nav>
    </>
  );
}

function Breadcrumbs({ items, navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="面包屑导航">
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
      <span>进入目录</span>
    </button>
  );
}

function Home({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <main className="home-main">
      <section className="profile-card" aria-label="个人简介">
        <div className="avatar-wrap">
          <img src={`${assetBase}avatar.jpg`} alt="头像" className="avatar" />
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
          <p>模拟与仿真、生活、计算机。</p>
          <button onClick={() => navigate(routes.blog)}>进入博客</button>
        </article>
        <article className="section-card">
          <h2>相关链接</h2>
          <p>GitHub、Archive of Our Own。</p>
          <button onClick={() => navigate(routes.links)}>进入目录</button>
        </article>
        <article className="section-card">
          <h2>同人</h2>
          <p>同人创作目录。</p>
          <button onClick={() => navigate(routes.fanworks)}>进入目录</button>
        </article>
        <article className="section-card">
          <h2>其他</h2>
          <p>用于放置杂项内容、公告、联系方式和页面更新记录。</p>
        </article>
      </section>
    </main>
  );
}

function BlogDirectory({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "主站", route: routes.home }, { label: "博客" }]} />
      <header className="sub-heading">
        <h1>博客</h1>
      </header>
      <section className="directory-grid">
        <DirectoryCard title="模拟与仿真" description="计算材料、模拟与仿真相关内容。" onClick={() => navigate(routes.simulation)} />
        <DirectoryCard title="生活" description="生活相关内容。" onClick={() => navigate(routes.life)} />
        <DirectoryCard title="计算机" description="计算机相关内容。" onClick={() => navigate(routes.computer)} />
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
          { label: "主站", route: routes.home },
          { label: "博客", route: routes.blog },
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
      {onClick ? <button onClick={onClick}>打开</button> : <span className="pending">待填充</span>}
    </article>
  );
}

function ArticleTemplate({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "主站", route: routes.home },
          { label: "博客", route: routes.blog },
          { label: "生活", route: routes.life },
          { label: "子页面" },
        ]}
      />
      <article className="article-template">
        <div className="article-cover">插入图片</div>
        <div className="article-content">
          <p className="article-meta">日期 / 分类</p>
          <h1>文章大标题</h1>
          <p className="article-subtitle">文章副标题</p>
          <h2>小标题</h2>
          <p>在这里填写正文。</p>
          <figure>
            <div className="article-image">插入图片</div>
            <figcaption>图片说明</figcaption>
          </figure>
          <h2>小标题</h2>
          <p>在这里填写正文。</p>
        </div>
      </article>
    </main>
  );
}

function Fanworks({ navigate, openEmbed }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "主站", route: routes.home }, { label: "同人" }]} />
      <header className="sub-heading">
        <h1>同人</h1>
      </header>
      <section className="directory-grid single">
        <button className="directory-card" onClick={openEmbed}>
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>嵌入式浏览</span>
        </button>
      </section>
    </main>
  );
}

function Links({ navigate, openAo3 }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "主站", route: routes.home }, { label: "相关链接" }]} />
      <header className="sub-heading">
        <h1>相关链接</h1>
      </header>
      <section className="directory-grid links-directory">
        <a className="directory-card" href={githubUrl} target="_blank" rel="noreferrer">
          <h2>GitHub</h2>
          <p>Raining-Sunshine</p>
          <span>打开网页</span>
        </a>
        <button className="directory-card" onClick={openAo3}>
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>嵌入式浏览</span>
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
            <a href={url} target="_blank" rel="noreferrer">打开原网页</a>
            <button onClick={close} aria-label="关闭">×</button>
          </div>
        </header>
        {embedded ? (
          <div className="iframe-wrap">
            <iframe src={url} title={title} />
            <p>如果网页不允许嵌入，请点击“打开原网页”。</p>
          </div>
        ) : (
          <div className="link-mask">
            <h2>{title}</h2>
            <p>此外链使用 HTTP，无法安全嵌入 HTTPS 页面。</p>
            <a href={url} target="_blank" rel="noreferrer">前往原网页</a>
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
      <CategoryPage category="模拟与仿真" navigate={navigate}>
        <Entry title="计算化学公社博客" label="外链" onClick={() => setMask({ title: "计算化学公社博客", url: keinsciUrl, embedded: false })} />
      </CategoryPage>
    );
  } else if (route === routes.life) {
    content = (
      <CategoryPage category="生活" navigate={navigate}>
        <Entry title="子页面" label="站内文章" onClick={() => navigate(routes.article)} />
      </CategoryPage>
    );
  } else if (route === routes.computer) {
    content = (
      <CategoryPage category="计算机" navigate={navigate}>
        <Entry title="子页面" label="站内文章" />
      </CategoryPage>
    );
  } else if (route === routes.article) {
    content = <ArticleTemplate navigate={navigate} />;
  } else if (route === routes.fanworks) {
    content = <Fanworks navigate={navigate} openEmbed={() => setMask({ title: "AO3 / Diotima_Chang", url: ao3Url, embedded: true })} />;
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
