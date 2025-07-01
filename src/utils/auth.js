// auth.js - Client-side only authentication utilities
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => {
    return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
    return Cookies.get('refreshToken');
};

/**
 * Decodes a JWT and returns the decoded payload, or null if decoding fails.
 * @param {string} token - The JWT to decode.
 * @returns {object | null} The decoded token payload or null.
 */
export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

/**
 * Checks if a token is expired.
 * @param {object} decodedToken - The decoded JWT.
 * @returns {boolean} True if the token is not expired, false otherwise.
 */
const isTokenNotExpired = (decodedToken) => {
    if (!decodedToken || typeof decodedToken.exp !== 'number') {
        return false; // Token or expiration time is invalid
    }
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp > currentTime;
};

/**
 * Client-side authentication check using only token validation
 * No backend calls - relies entirely on JWT validation
 */
export const isAuthenticated = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return false;
    }
    const decodedToken = decodeToken(accessToken);
    return isTokenNotExpired(decodedToken);
};

/**
 * Get token expiration time
 * @param {string} token - The JWT token
 * @returns {Date | null} Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.exp) {
        return new Date(decodedToken.exp * 1000);
    }
    return null;
};

/**
 * Check if token will expire within given minutes
 * @param {string} token - The JWT token
 * @param {number} minutes - Minutes to check ahead
 * @returns {boolean} True if token expires within the given time
 */
export const isTokenExpiringSoon = (token, minutes = 5) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
        return true; // Consider invalid tokens as expiring
    }

    const expirationTime = decodedToken.exp * 1000;
    const warningTime = Date.now() + (minutes * 60 * 1000);

    return expirationTime <= warningTime;
};

/**
 * Clear all authentication tokens
 */
export const clearTokens = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};

/**
 * Set access token in cookie
 * @param {string} token - The access token
 * @param {number} expiresInHours - Hours until expiration (default: 1 hour)
 */
export const setAccessToken = (token, expiresInHours = 1) => {
    Cookies.set('accessToken', token, { expires: expiresInHours / 24 });
};

/**
 * Set refresh token in cookie
 * @param {string} token - The refresh token
 * @param {number} expiresInDays - Days until expiration (default: 7 days)
 */
export const setRefreshToken = (token, expiresInDays = 7) => {
    Cookies.set('refreshToken', token, { expires: expiresInDays });
};

// Note: Refresh token functionality removed as requested
// All authentication is now handled client-side through Context API