export const profileApi = {
  async getMyProfile() {
    return fetch(`${__BASE_URL__}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getAnotherProfile(id: string) {
    return fetch(`${__BASE_URL__}/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getWall(id: string) {
    return fetch(`${__BASE_URL__}/wall${id ? `/${id}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async subscribeProfile(body: FormData) {
    return fetch(`${__BASE_URL__}/subscription/subscribe`, {
      method: 'POST',
      body,
      credentials: 'include' as const,
    });
  },

  async unsubscribeProfile(body: FormData) {
    return fetch(`${__BASE_URL__}/subscription/unsubscribe`, {
      method: 'POST',
      body,
      credentials: 'include' as const,
    });
  },
};
