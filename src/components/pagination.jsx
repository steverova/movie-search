export const Pagination = (totalRes, buttonEvent) => {
  const elements = [];

  for (let i = 1; i < totalRes / 10 + 1; i++) {
    elements.push(<button onClick={() => buttonEvent(i)}>{i}</button>);
  }
  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <ul style={{ display: "flex" }}>{elements}</ul>
    </div>
  );
};
