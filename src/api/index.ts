import { Router } from 'express';
import incidentAdminRoutes from './admin/incidents';

const router = Router();

router.use('/admin', incidentAdminRoutes);

export default router;


