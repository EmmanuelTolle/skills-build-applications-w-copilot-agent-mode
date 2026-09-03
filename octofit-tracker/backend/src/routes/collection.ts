import { Router } from 'express';

export function createCollectionRouter(resource: string): Router {
  const router = Router();

  router.get('/', (_request, response) => {
    response.json({ resource, data: [] });
  });

  return router;
}