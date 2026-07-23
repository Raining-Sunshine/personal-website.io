import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import DirectoryCard from "../../components/ui/DirectoryCard";
import { routes } from "../../config/routes";

function BlogDirectory({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blogs" }]} />
      <header className="sub-heading">
        <h1>Blogs</h1>
      </header>
      <section className="directory-grid">
        <DirectoryCard title="Modelling" description="Computational materials, modelling, and simulation notes." onClick={() => navigate(routes.modelling)} />
        <DirectoryCard title="Computer" description="Computer science, security, algorithms, tools, and remote access notes." onClick={() => navigate(routes.computer)} />
        <DirectoryCard title="Life" description="Personal and everyday-life notes." onClick={() => navigate(routes.life)} />
      </section>
    </main>
  );
}

export default BlogDirectory;
