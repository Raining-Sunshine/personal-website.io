import SiteLink from "./SiteLink";
function Breadcrumbs({ items, navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <i>/</i>}
          {item.route ? (
            <SiteLink route={item.route} navigate={navigate}>{item.label}</SiteLink>
          ) : (
            <b>{item.label}</b>
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
