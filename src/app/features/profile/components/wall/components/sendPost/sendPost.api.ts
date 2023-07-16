export const sendPostApi = {
  async createPost(body: FormData) {
    return fetch(`${__BASE_URL__}/wall`, {
      method: 'POST',
      body,
      credentials: 'include' as const,
    });
  },
};
