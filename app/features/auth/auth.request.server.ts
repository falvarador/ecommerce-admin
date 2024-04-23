export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address?: string | null;
  avatar?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}
