import { Router } from 'express';
import * as ctrl from '../controllers/patient-controller';
import { validateBody } from '../middlewares/validate-middleware';
import { createPatientSchema, updatePatientSchema } from '../utils/validation';

const router = Router();


router.post('/', validateBody(createPatientSchema), ctrl.createPatient);
router.get('/', ctrl.listPatients);
router.get('/:id', ctrl.getPatient);
router.patch('/:id', validateBody(updatePatientSchema), ctrl.updatePatient);
router.delete('/:id', ctrl.deletePatient);

export default router;
