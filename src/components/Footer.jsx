function Footer() {
  return (
    <>
      <div
        style={{
          marginTop: "15px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          className="text-decoration-none"
          href="https://github.com/steverova"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style={{ width: "30px" }}
            className="ms-3"
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg"
            alt=""
          />
        </a>
      </div>
    </>
  );
}

export default Footer;
