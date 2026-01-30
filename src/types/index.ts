declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        user_role: UserRole;
        photo_url?: string | undefined;
      };
    }
  }
}

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
  provider = 'PROVIDER',
}

export interface MealData {
  provider_id: string;
  category_id: string;
  meal_name: string;
  image_url?: string;
  description?: string;
  price: number;
  is_available: boolean;
}
