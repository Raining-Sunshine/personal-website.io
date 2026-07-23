function DirectoryCard({ title, description, onClick }) {
  return (
    <button className="directory-card" onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Open directory</span>
    </button>
  );
}

export default DirectoryCard;
