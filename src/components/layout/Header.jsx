import { routes } from "../../config/routes";

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
        <button onClick={() => navigate(routes.blog)}>Blogs</button>
        <button onClick={() => navigate(routes.research)}>Research</button>
        <button onClick={() => navigate(routes.links)}>Links</button>
      </nav>
    </>
  );
}

export default Header;
