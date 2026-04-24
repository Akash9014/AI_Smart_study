const Card = ({ children }) => {
  return (
    <div style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      marginBottom: "20px",
      transition: "0.2s"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      {children}
    </div>
  );
};

export default Card;