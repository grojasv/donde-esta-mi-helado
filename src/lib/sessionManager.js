// Session management for real-time multi-device sync
// Handles session ID generation, validation, and URL management

/**
 * Generates a unique session ID for sharing between devices
 * Uses timestamp + random string for better uniqueness and readability
 * @returns {string} A unique session ID (e.g., "ice2024012715423abc")
 */
export function generateSessionId() {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `ice${timestamp}${randomSuffix}`;
}

/**
 * Validates if a session ID has the correct format
 * @param {string} sessionId - The session ID to validate
 * @returns {boolean} True if valid format
 */
export function isValidSessionId(sessionId) {
  if (!sessionId || typeof sessionId !== 'string') {
    return false;
  }
  
  // Check format: starts with "ice" followed by alphanumeric characters
  const sessionRegex = /^ice[a-zA-Z0-9]{16,}$/;
  return sessionRegex.test(sessionId);
}

/**
 * Gets the current session ID from URL parameters
 * @returns {string|null} Session ID if found and valid, null otherwise
 */
export function getCurrentSessionId() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session');
  
  if (sessionId && isValidSessionId(sessionId)) {
    return sessionId;
  }
  
  return null;
}

/**
 * Updates the browser URL with a new session ID
 * @param {string} sessionId - The session ID to add to URL
 */
export function updateUrlWithSession(sessionId) {
  if (!isValidSessionId(sessionId)) {
    console.error('Invalid session ID provided:', sessionId);
    return;
  }
  
  const newUrl = `${window.location.pathname}?session=${sessionId}`;
  window.history.pushState({ sessionId }, '', newUrl);
  console.log(`🔗 Updated URL with session: ${sessionId}`);
}

/**
 * Clears the session from the URL (for local-only mode)
 */
export function clearSessionFromUrl() {
  window.history.pushState({}, document.title, window.location.pathname);
  console.log('🧹 Cleared session from URL - switched to local mode');
}

/**
 * Generates a shareable URL for the current session
 * @param {string} sessionId - The session ID to share
 * @returns {string} Complete shareable URL
 */
export function generateShareableUrl(sessionId) {
  if (!isValidSessionId(sessionId)) {
    throw new Error('Invalid session ID provided');
  }
  
  return `${window.location.origin}${window.location.pathname}?session=${sessionId}`;
}

/**
 * Gets or creates a session ID for the current app instance
 * Checks URL first, then generates new if needed
 * @returns {string} Session ID for current instance
 */
export function getOrCreateSessionId() {
  // First check if there's a session in the URL
  const urlSessionId = getCurrentSessionId();
  if (urlSessionId) {
    console.log(`📱 Using existing session from URL: ${urlSessionId}`);
    return urlSessionId;
  }
  
  // Generate a new session ID
  const newSessionId = generateSessionId();
  console.log(`🆕 Generated new session ID: ${newSessionId}`);
  updateUrlWithSession(newSessionId);
  
  return newSessionId;
}