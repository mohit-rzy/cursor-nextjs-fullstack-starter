import { cache } from 'react';

export const pricing = cache(() => {
  return Math.round(Math.random() * 1000);
});
