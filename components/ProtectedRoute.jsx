'use client'
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRoles = [], requiredPermissions = [] }) => {
  const { isAuthenticated, loading, user, hasRole, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
        return;
      }

      // Check role requirements
      if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => hasRole(role));
        if (!hasRequiredRole) {
          router.replace('/unauthorized');
          return;
        }
      }

      // Check permission requirements
      if (requiredPermissions.length > 0) {
        const hasRequiredPermission = requiredPermissions.some(permission => hasPermission(permission));
        if (!hasRequiredPermission) {
          router.replace('/unauthorized');
          return;
        }
      }
    }
  }, [isAuthenticated, loading, user, router, requiredRoles, requiredPermissions, hasRole, hasPermission]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // Check role requirements
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      return null; // Will redirect in useEffect
    }
  }

  // Check permission requirements
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some(permission => hasPermission(permission));
    if (!hasRequiredPermission) {
      return null; // Will redirect in useEffect
    }
  }

  return children;
};

export default ProtectedRoute;
