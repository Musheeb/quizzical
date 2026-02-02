export async function quiz() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple",
  );
  if (!res.ok) {
    throw new Error("Data not found! Please try again...");
  }
  return res.json();
}
