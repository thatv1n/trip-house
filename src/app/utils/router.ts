import { NormalizedRoutes, RouteConf } from '@/types';

export function normalizeRoutes(routes: RouteConf[]): NormalizedRoutes {
  const result: Partial<NormalizedRoutes> = {};
  function rec(_routes: RouteConf[], parent: RouteConf | null): void {
    _routes.forEach((route) => {
      result[route.name] = {...route, parent, };
      if (route.children && route.children.length) {
        rec(route.children, route);
      }
    });
  }
  rec(routes, null);
  return result as NormalizedRoutes;
}
