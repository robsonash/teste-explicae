export const api = {
  get: async (url) => {
    const response = await fetch(`http://localhost:3000${url}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
};
