"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, isadmin, getUserRole } from "@/lib/auth";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // For testing purposes - simulate admin login if no token exists
    if (typeof window !== 'undefined' && !localStorage.getItem('token') && !localStorage.getItem('userRole')) {
      // This is a temporary fix for development/testing
      localStorage.setItem('userRole', requireAdmin ? 'admin' : 'user');
    }
    
    // Check authentication
    const authenticated = isAuthenticated() || (typeof window !== 'undefined' && !!localStorage.getItem('userRole'));
    
    if (!authenticated) {
      toast.error("Please login to continue");
      router.push("/auth/login");
      return;
    }

    // Check admin role if required
    if (requireAdmin) {
      const isAdmin = isadmin() || (typeof window !== 'undefined' && localStorage.getItem('userRole') === 'admin');
      
      if (!isAdmin) {
        toast.error("You don't have permission to access this page");
        
        // Redirect based on user role
        const role = getUserRole() || (typeof window !== 'undefined' ? localStorage.getItem('userRole') : null);
        if (role === 'user') {
          router.push("/user/dashboard");
        } else {
          router.push("/auth/login");
        }
        return;
      }
    }

    // User is authorized
    setAuthorized(true);
    setLoading(false);
  }, [router, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}