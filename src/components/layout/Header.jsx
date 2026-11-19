import SiteLink from "../navigation/SiteLink";
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
        <SiteLink route={routes.home} navigate={navigate}>Home</SiteLink>
        <SiteLink route={routes.blog} navigate={navigate}>Blogs</SiteLink>
        <SiteLink route={routes.research} navigate={navigate}>Research</SiteLink>
        <SiteLink route={routes.links} navigate={navigate}>Links</SiteLink>
      </nav>
    </>
  );
}

export default Header;
