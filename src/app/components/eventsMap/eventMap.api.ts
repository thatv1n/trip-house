export const eventMapApi = {
  async getGeo(lat: number, lng: number) {
    return fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&lang=ru`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  },
};
