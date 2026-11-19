import SiteLink from "../navigation/SiteLink";
function Entry({ title, label, onClick, href, route, navigate }) {
  return (
    <article className="entry-card">
      <div>
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">Open page</a>
      ) : route ? (
        <SiteLink route={route} navigate={navigate}>Open</SiteLink>
      ) : onClick ? (
        <button onClick={onClick}>Open</button>
      ) : (
        <span className="pending">To be filled</span>
      )}
    </article>
  );
}

export default Entry;
