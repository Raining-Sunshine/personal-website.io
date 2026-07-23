import Breadcrumbs from "../components/navigation/Breadcrumbs";
import { routes } from "../config/routes";
import { academicCvUrl } from "../config/site";

function Research({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Research" }]} />
      <header className="sub-heading">
        <h1>Research</h1>
      </header>
      <section className="directory-grid single">
        <a className="directory-card compact" href={academicCvUrl} target="_blank" rel="noreferrer">
          <h2>Academic CV</h2>
          <span>Open page</span>
        </a>
      </section>
    </main>
  );
}

export default Research;
