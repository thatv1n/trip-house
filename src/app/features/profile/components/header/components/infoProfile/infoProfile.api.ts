export const infoProfileApi = {
  async getMySubscribers() {
    return fetch(`${__BASE_URL__}/subscription/subscribers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getIdSubscribers(id: string) {
    return fetch(`${__BASE_URL__}/subscription/subscribers/${id}?userId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getMySubscription() {
    return fetch(`${__BASE_URL__}/subscription/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getIdSubscription(id: string) {
    return fetch(`${__BASE_URL__}/subscription/subscriptions/${id}?userId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },
};
