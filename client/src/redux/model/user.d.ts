export interface User {
  username: string;
  id: string;
  role: 'user' | 'admin';
  email: string;
}
