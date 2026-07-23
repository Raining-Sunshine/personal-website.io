import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import Entry from "../../components/ui/Entry";
import { routes } from "../../config/routes";

function BlogCategory({ category, entries, navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: category },
        ]}
      />
      <header className="sub-heading">
        <h1>{category}</h1>
      </header>
      <section className="entry-list">
        {entries.map((entry) => (
          <Entry
            key={entry.title}
            title={entry.title}
            label={entry.label}
            href={entry.href}
            onClick={entry.route ? () => navigate(entry.route) : undefined}
          />
        ))}
      </section>
    </main>
  );
}

export default BlogCategory;
