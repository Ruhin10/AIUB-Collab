export interface AuthUser {
  id: string;
  username?: string;
  email?: string;
  roles: string[];
  admin_level?: string | null;
}
