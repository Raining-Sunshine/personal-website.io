function Entry({ title, label, onClick, href }) {
  return (
    <article className="entry-card">
      <div>
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">Open page</a>
      ) : onClick ? (
        <button onClick={onClick}>Open</button>
      ) : (
        <span className="pending">To be filled</span>
      )}
    </article>
  );
}

export default Entry;
