export const moderateEventAdminApi = {
  async publishEvent(id: string) {
    return fetch(`${__BASE_URL__}/event/to-publish/${id}`, {
      method: 'PUT',
      credentials: 'include' as const,
    });
  },

  async rejectEvent(id: string) {
    return fetch(`${__BASE_URL__}/event/to-reject/${id}`, {
      method: 'PUT',
      credentials: 'include' as const,
    });
  },
};
