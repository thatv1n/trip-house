export const profileEventsApi = {
  async getMyEvents(params: any) {
    const search =
      params &&
      `${params?.text ? `text=${params?.text}&` : ''}${
        params?.limit ? `limit=${params.limit}&offset=${params.offset}` : ''
      }`;
    return fetch(`${__BASE_URL__}/event?${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getIdEvents(id: string, params: any) {
    const search =
      params &&
      `${params?.text ? `text=${params?.text}&` : ''}${
        params?.limit ? `limit=${params.limit}&offset=${params.offset}` : ''
      }`;
    return fetch(`${__BASE_URL__}/event/user-id/${id}?${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },
};
