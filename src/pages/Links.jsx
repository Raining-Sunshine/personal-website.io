import Breadcrumbs from "../components/navigation/Breadcrumbs";
import { routes } from "../config/routes";
import { ao3Url, githubUrl } from "../config/site";

function Links({ navigate }) {
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
        <a className="directory-card" href={ao3Url} target="_blank" rel="noreferrer">
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>Open page</span>
        </a>
      </section>
    </main>
  );
}

export default Links;
