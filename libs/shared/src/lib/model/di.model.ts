import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const getRouteQueryParam = (key: string): string => {
  return inject(ActivatedRoute).snapshot.queryParams[key];
};

