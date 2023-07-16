export const galleryApi = {
  async getMyGallery() {
    return fetch(`${__BASE_URL__}/wall/photos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },

  async getIdGallery(id: string) {
    return fetch(`${__BASE_URL__}/wall/photos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },
};
