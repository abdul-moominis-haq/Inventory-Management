'use client'
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Auth State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        loading: false, 
        error: action.payload 
      };
    case AUTH_ACTIONS.LOGOUT:
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        loading: false, 
        error: null 
      };
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Auth Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('fh_user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.token && user.expiry && new Date(user.expiry) > new Date()) {
            dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
          } else {
            localStorage.removeItem('fh_user');
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
          }
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('fh_user');
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Temporary hardcoded authentication for testing
      const TEMP_USERNAME = "admin";
      const TEMP_PASSWORD = "admin2211";

      if (credentials.email === TEMP_USERNAME && credentials.password === TEMP_PASSWORD) {
        const userData = {
          token: "temp-auth-token-" + Date.now(),
          user: {
            id: 1,
            email: TEMP_USERNAME,
            name: "Administrator",
            roles: ["admin"],
            permissions: ["read", "write", "delete"]
          },
          expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        localStorage.setItem('fh_user', JSON.stringify(userData));
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userData });
        
        router.push('/');
        return { success: true };
      }

      // If not hardcoded credentials, try API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const userData = await response.json();
      
      // Add expiry time (24 hours from now)
      const userWithExpiry = {
        ...userData,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('fh_user', JSON.stringify(userWithExpiry));
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userWithExpiry });
      
      router.push('/');
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('fh_user');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    router.push('/login');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.roles?.includes(role) || false;
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return state.user?.permissions?.includes(permission) || false;
  };

  const value = {
    ...state,
    login,
    logout,
    hasRole,
    hasPermission,
    clearError: () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
