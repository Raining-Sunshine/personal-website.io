import React from "react";
import "./App.css";

const navItems = [
  { label: "博客", href: "#blog" },
  { label: "相关链接", href: "#links" },
  { label: "同人", href: "#fanworks" },
  { label: "其他", href: "#others" },
];

export default function App() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <div className="site-shell">
      <header className="hero-header">
        <img
          src={`${assetBase}header.png`}
          alt="站点头图"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="site-title">Diotima Chang</div>
        </div>
      </header>

      <div className="thin-strip" aria-hidden="true" />

      <nav className="main-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="nav-link">
            {item.label}
          </a>
        ))}
      </nav>

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
          <article id="blog" className="section-card">
            <h2>Blogs</h2>
            <p>http://bbs.keinsci.com/thread-42564-1-1.html</p>
          </article>

          <article id="links" className="section-card">
            <h2>相关链接</h2>
            <p>https://github.com/Raining-Sunshine, https://archiveofourown.org/users/Diotima_Chang</p>
          </article>

          <article id="fanworks" className="section-card">
            <h2>同人</h2>
            <p>用于整理同人创作、图片、设定、短文、收藏或专题页面。</p>
          </article>

          <article id="others" className="section-card">
            <h2>其他</h2>
            <p>用于放置杂项内容、公告、联系方式和页面更新记录。</p>
          </article>
        </section>
      </main>
    </div>
  );
}
