
import { Router } from 'express';
import * as ctrl from '../controllers/patient-controller';
import { authenticateToken } from '../middlewares/auth-middleware';
import { validateBody, validateParams } from '../middlewares/validate-middleware';
import {
  signupSchema,
  loginSchema,
  addFamilyMemberSchema,
  healthDetailsSchema,
  memberNameParamSchema
} from '../utils/validation';

const router = Router();



// Auth routes
router.post('/signup', validateBody(signupSchema), ctrl.signup);
router.post('/login', validateBody(loginSchema), ctrl.login);



// Patient profile routes
router.get('/profile', authenticateToken, ctrl.getPatientProfile);
router.patch('/health', authenticateToken, validateBody(healthDetailsSchema), ctrl.updateMainPatientHealth);

// Family member management routes
router.post('/family/add', authenticateToken, validateBody(addFamilyMemberSchema), ctrl.addFamilyMember);
router.delete('/family/:memberName', authenticateToken, validateParams(memberNameParamSchema), ctrl.deleteFamilyMember);
router.get('/family', authenticateToken, ctrl.getFamilyMembers);
router.get('/family/:memberName', authenticateToken, validateParams(memberNameParamSchema), ctrl.getFamilyMemberDetails);
router.patch('/family/:memberName/health', authenticateToken, validateParams(memberNameParamSchema), validateBody(healthDetailsSchema), ctrl.updateFamilyMemberHealth);

export default router;


