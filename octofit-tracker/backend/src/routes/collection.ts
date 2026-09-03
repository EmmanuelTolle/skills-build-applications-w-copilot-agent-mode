import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCollectionRouter(resource: string, collection: Model<any>): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      const data = await collection.find().lean();
      response.json({ resource, data });
    } catch (error) {
      response.status(500).json({ error: `Unable to load ${resource}`, details: error });
    }
  });

  return router;
}