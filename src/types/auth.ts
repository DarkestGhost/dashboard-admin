export interface RegisterDataProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDataProps {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (userData: RegisterDataProps) => Promise<void>;
  login: (userData: LoginDataProps) => Promise<void>;
  logout: () => void;
}
