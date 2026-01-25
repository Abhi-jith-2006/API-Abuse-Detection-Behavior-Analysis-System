import { Router, Request, Response } from 'express';
import { db } from '../../infrastructure/database/client';
import { withTransaction } from '../../infrastructure/database/transaction';
import {
  IncidentRepository,
  IncidentStatus,
  IncidentEntityType,
} from '../../modules/incidents/repository';

const router = Router();

router.get('/incidents', async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const offset = Number(req.query.offset) || 0;

  const status = req.query.status as IncidentStatus | undefined;
  const entityType = req.query.entity_type as IncidentEntityType | undefined;

  const incidents = await withTransaction(db, async (client) => {
    const repo = new IncidentRepository(client);
    return repo.findMany({
      status,
      entityType,
      limit,
      offset,
    });
  });

  res.json({
    items: incidents.map((i) => ({
      id: i.id,
      entityType: i.entityType,
      entityId: i.entityId,
      incidentType: i.incidentType,
      severity: i.severity,
      status: i.status,
      detectedAt: i.detectedAt,
      window: {
        start: i.windowStart,
        end: i.windowEnd,
      },
    })),
    limit,
    offset,
  });
});

export default router;
