// authUtils.js
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode

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
const decodeToken = (token) => {
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

export const isAuthenticated = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return false;
    }
    const decodedToken = decodeToken(accessToken);
    return isTokenNotExpired(decodedToken);
};

export const isAdmin = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return false;
    }
    const decodedToken = decodeToken(accessToken);
    // Assuming your token has a 'role' claim
    return decodedToken && decodedToken.role === 'admin' && isTokenNotExpired(decodedToken);
};

export const isUser = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return false;
    }
    const decodedToken = decodeToken(accessToken);
    // Assuming your token has a 'role' claim
    return decodedToken && decodedToken.role === 'user' && isTokenNotExpired(decodedToken);
};

// You might also need a function to refresh tokens
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.warn('No refresh token found.');
        return false;
    }
    try {
        // Make an API call to your backend to get a new access token using the refresh token
        // Adjust this API endpoint to your actual backend endpoint
        const response = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.newAccessToken) {
                // Set expiration as per your needs. Example: 1 hour (1/24 of a day).
                // Or better, derive from the newAccessToken's expiry if your backend sends it.
                Cookies.set('accessToken', data.newAccessToken, { expires: 1/24 });
                return true;
            } else {
                console.error('Refresh token successful but no newAccessToken received.');
                return false;
            }
        } else {
            // Handle refresh token failure (e.g., redirect to login, clear tokens)
            console.error('Failed to refresh token. Status:', response.status);
            // Optionally, clear tokens if refresh fails to prevent infinite loops
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            // Consider redirecting to login page here
            return false;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};