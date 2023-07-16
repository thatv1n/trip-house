import { FilterAdminType } from './admin-panel.types';

export const moderateEventApi = {
  async getEvent(data: FilterAdminType | null) {
    const params = `status=${data?.status ? data.status : 'saved'}&${data?.city ? `city=${data.city}&` : ''}${
      data?.dateStart ? `dateStart=${data.dateStart}&` : ''
    }${data?.dateEnd ? `dateEnd=${data.dateEnd}&` : ''}${data?.text ? `text=${data.text}&` : ''}${
      data?.limit ? `limit=${data.limit}&` : ''
    }offset=${data?.offset ? data.offset : 0}`;

    return fetch(`${__BASE_URL__}/event/search-admin?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
    });
  },
};
