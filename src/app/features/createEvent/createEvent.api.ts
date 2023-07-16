export const createEventApi = {
  async createEvent(body: FormData) {
    return fetch(`${__BASE_URL__}/event`, {
      method: 'POST',
      body,
      credentials: 'include' as const,
    });
  },
};
