export const settingsApi = {
  async sendSettingProfile(body: FormData) {
    return fetch(`${__BASE_URL__}/user`, {
      method: 'PUT',
      body,
      credentials: 'include' as const,
    });
  },

  async getSettingProfile() {
    return fetch(`${__BASE_URL__}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getInterest() {
    return fetch(`${__BASE_URL__}/interest?limit=101`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },
};
