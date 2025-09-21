import { Request, Response, NextFunction } from 'express';
import * as patientService from '../services/patient-service';

export const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await patientService.createPatient(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

export const getPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const doc = await patientService.findPatientById(id);
    if (!doc) return res.status(404).json({ message: 'Patient not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

export const listPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, village, limit, skip } = req.query;
    const result = await patientService.findPatients({
      q: typeof q === 'string' ? q : undefined,
      village: typeof village === 'string' ? village : undefined,
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const doc = await patientService.updatePatient(id, req.body);
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const doc = await patientService.softDeletePatient(id);
    res.json({ ok: true, doc });
  } catch (err) {
    next(err);
  }
};
