export const InfoList = () => {
  const items = [
    "📩 Reportar problema",
    "🚫 No puedo marcar asistencia",
    "🧩 Apoyo usuario",
    "📘 Instructivo de uso",
  ];

  return (
    <div className="card">
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ margin: "10px 0" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
