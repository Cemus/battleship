const report = (message) => {
  const container = document.getElementById("reports");
  container.innerHTML = message;
};

export default report;
