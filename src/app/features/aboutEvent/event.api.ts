export const aboutEventApi = {
  async getEvent(id: string) {
    return fetch(`${__BASE_URL__}/event/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async connectEvent(id: string) {
    return fetch(`${__BASE_URL__}/event/add-member/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async membersEvent(id: string) {
    return fetch(`${__BASE_URL__}/event/${id}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async disconnectEvent(id: string) {
    return fetch(`${__BASE_URL__}/event/remove-member/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async complaintEvent(id: string, body: FormData) {
    return fetch(`${__BASE_URL__}/event/feedback/${id}`, {
      method: 'POST',

      body,
      credentials: 'include' as const,
    });
  },
};
