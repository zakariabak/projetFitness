import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Middleware pour vérifier la présence et validité du token JWT
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // récupère le token après "Bearer "
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // token manquant => accès refusé
    res.status(401).json({ message: 'Token manquant' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    // vérifie et décode le token
    const decoded = jwt.verify(token, secret) as { id: string; email: string };

    // ajoute l'id user à la requête pour usage ultérieur
    (req as any).user = { id: decoded.id };

    next(); // passe au middleware suivant
  } catch (err) {
    // token invalide => accès refusé
    res.status(403).json({ message: 'Token invalide' });
  }
};
