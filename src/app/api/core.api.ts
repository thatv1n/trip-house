import { from, Observable } from 'rxjs';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include' as const,
};

async function success<T>(data: Response): Promise<T> {
  try {
    const response = await data.json();
    if (response.success) {
      return response.data;
    }
    throw response.error;
  } catch (err) {
    throw err;
  }
}

export class CoreApi {
  get<R>(url: string): Observable<R> {
    return from(
      fetch(`${__BASE_URL__}${url}`, {
        ...defaultOptions,
        method: 'GET',
      }).then<R>(success),
    );
  }

  delete<R>(url: string): Observable<R> {
    return from(
      fetch(`${__BASE_URL__}${url}`, {
        ...defaultOptions,
        method: 'DELETE',
      }).then<R>(success),
    );
  }

  post<R, D>(url: string, data?: D): Observable<R> {
    return from(
      fetch(`${__BASE_URL__}${url}`, {
        ...defaultOptions,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }).then<R>(success),
    );
  }

  postFiles<R, D>(url: string, data?: D): Observable<R> {
    return from(
      fetch(`${__BASE_URL__}${url}`, {
        method: 'POST',
        credentials: 'include' as const,
        body: data,
      }).then<R>(success),
    );
  }

  putFiles<R>(url: string, data?: FormData): Observable<R> {
    return from(
      fetch(`${__BASE_URL__}${url}`, {
        method: 'PUT',
        credentials: 'include' as const,
        body: data,
      }).then<R>(success),
    );
  }

  put<R, D>(url: string, data?: D): Observable<R> {
    return from(
      fetch(`${__BASE_URL__}${url}`, {
        ...defaultOptions,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }).then<R>(success),
    );
  }
}
