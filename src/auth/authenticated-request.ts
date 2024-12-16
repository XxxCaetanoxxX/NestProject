import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // Ajuste o tipo do payload conforme necessário
}
