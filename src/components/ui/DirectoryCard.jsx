import SiteLink from "../navigation/SiteLink";
function DirectoryCard({ title, description, route, navigate }) {
  return (
    <SiteLink className="directory-card" route={route} navigate={navigate}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Open directory</span>
    </SiteLink>
  );
}

export default DirectoryCard;
