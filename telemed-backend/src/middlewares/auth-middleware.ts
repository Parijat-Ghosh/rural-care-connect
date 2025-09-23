

import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

// Extend Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        phoneNumber: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('🔍 Auth middleware called!');
  console.log('🔍 Auth header raw:', req.headers.authorization);
  
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('❌ No auth header found');
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }
    
    let token: string;
    
    // Handle both cases:
    // 1. "Bearer TOKEN" format (manual headers)
    // 2. "TOKEN" format (Hoppscotch Authorization tab)
    if (authHeader.startsWith('Bearer ')) {
      console.log('🔍 Found Bearer prefix, extracting token');
      token = authHeader.substring(7);
    } else {
      console.log('🔍 No Bearer prefix, treating as direct token');
      token = authHeader;
    }
    
    console.log('🔍 Token extracted, length:', token.length);
    console.log('🔍 Token preview:', token.substring(0, 20) + '...');
    
    if (!token) {
      console.log('❌ Empty token after extraction');
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify token
    const JWT_SECRET = 'my-simple-secret-key-123';
    console.log('🔍 JWT_SECRET exists:', !!JWT_SECRET);
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token decoded successfully:', decoded);
    
    // Check if decoded token has the expected structure
    if (!decoded.userId || !decoded.phoneNumber) {
      console.log('❌ Token missing required fields:', decoded);
      return res.status(401).json({
        success: false,
        message: 'Invalid token structure'
      });
    }
    
    req.user = {
      userId: decoded.userId,
      phoneNumber: decoded.phoneNumber
    };
    
    console.log('✅ User set in request:', req.user);
    next();

    
  } catch (error: any) {
    console.log('❌ JWT verification error:', error.message);
    return res.status(401).json({
      success: false,
      message: `Token verification failed: ${error.message}`
    });
  }
};