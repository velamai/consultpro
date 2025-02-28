import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  uuid: string;
  role: string;
  exp: number;
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) {
    // Check if we have a userRole in localStorage (for development/testing)
    if (typeof window !== 'undefined' && localStorage.getItem('userRole')) {
      return true;
    }
    return false;
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

export function getUserRole(): string | null {
  const token = getToken();
  if (!token) {
    // For development/testing, check localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function isadmin(): boolean {
  const role = getUserRole();
  return role === 'admin';
}

export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
}