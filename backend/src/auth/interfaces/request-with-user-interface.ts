import { type Request } from 'express';
import { type User } from '../../users/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
