function formatDate(timestamp: number) {
  if (!timestamp) return "No Date";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(timestamp));
}

export default formatDate;
