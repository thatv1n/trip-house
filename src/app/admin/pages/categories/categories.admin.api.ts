export const categoriesAdminApi = {
  async addCategory(body: FormData) {
    return fetch(`${__BASE_URL__}/category`, {
      method: 'POST',
      body,
      credentials: 'include' as const,
    });
  },

  async editCategory(body: FormData, id: string) {
    return fetch(`${__BASE_URL__}/category/${id}`, {
      method: 'PUT',
      body,
      credentials: 'include' as const,
    });
  },

  async delCategory(id: string) {
    return fetch(`${__BASE_URL__}/category/${id}`, {
      method: 'DELETE',
      credentials: 'include' as const,
    });
  },
};
