export const api = {
  get: async () => {
    const response = await fetch(process.env.VUE_APP_API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
};
