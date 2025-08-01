// Firebase Data Manager for real-time ice cream flavor sync
// Handles all Firebase Realtime Database operations with offline support

import { ref, set, get, onValue, off, push } from 'firebase/database';
import { database } from './firebase.js';

// Storage keys for localStorage fallback
const STORAGE_KEY = 'donde-esta-mi-helado-flavors';
const FILL_LEVELS_KEY = 'donde-esta-mi-helado-fill-levels';

/**
 * Creates a Firebase database reference for a session's data
 * @param {string} sessionId - The session ID
 * @param {string} dataType - Type of data ('flavors' or 'fillLevels')
 * @returns {DatabaseReference} Firebase database reference
 */
function getSessionRef(sessionId, dataType = '') {
  const basePath = `sessions/${sessionId}`;
  return dataType ? ref(database, `${basePath}/${dataType}`) : ref(database, basePath);
}

/**
 * Saves flavor data to Firebase for a session
 * @param {string} sessionId - The session ID
 * @param {Object} flavors - Object with container IDs as keys and flavors as values
 * @returns {Promise} Promise that resolves when data is saved
 */
export async function saveFlavorsToFirebase(sessionId, flavors) {
  try {
    const flavorsRef = getSessionRef(sessionId, 'flavors');
    await set(flavorsRef, flavors);
    
    // Also save timestamp for session activity tracking
    const metadataRef = getSessionRef(sessionId, 'metadata');
    await set(metadataRef, {
      lastUpdated: Date.now(),
      version: '1.0'
    });
    
    console.log(`✅ Flavors saved to Firebase session: ${sessionId}`);
    
    // Save to localStorage as backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flavors));
    
    return true;
  } catch (error) {
    console.error('❌ Error saving flavors to Firebase:', error);
    
    // Fallback to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flavors));
    throw error;
  }
}

/**
 * Saves fill levels to Firebase for a session
 * @param {string} sessionId - The session ID
 * @param {Object} fillLevels - Object with container IDs as keys and fill levels as values
 * @returns {Promise} Promise that resolves when data is saved
 */
export async function saveFillLevelsToFirebase(sessionId, fillLevels) {
  try {
    const fillLevelsRef = getSessionRef(sessionId, 'fillLevels');
    await set(fillLevelsRef, fillLevels);
    
    console.log(`✅ Fill levels saved to Firebase session: ${sessionId}`);
    
    // Save to localStorage as backup
    localStorage.setItem(FILL_LEVELS_KEY, JSON.stringify(fillLevels));
    
    return true;
  } catch (error) {
    console.error('❌ Error saving fill levels to Firebase:', error);
    
    // Fallback to localStorage
    localStorage.setItem(FILL_LEVELS_KEY, JSON.stringify(fillLevels));
    throw error;
  }
}

/**
 * Reads flavor data from Firebase for a session (one-time read)
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} Promise that resolves to flavors object
 */
export async function loadFlavorsFromFirebase(sessionId) {
  try {
    const flavorsRef = getSessionRef(sessionId, 'flavors');
    const snapshot = await get(flavorsRef);
    
    if (snapshot.exists()) {
      const flavors = snapshot.val();
      console.log(`📥 Flavors loaded from Firebase session: ${sessionId}`);
      
      // Save to localStorage as backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flavors));
      
      return flavors;
    } else {
      console.log(`📭 No flavors found in Firebase session: ${sessionId}`);
      return {};
    }
  } catch (error) {
    console.error('❌ Error loading flavors from Firebase:', error);
    
    // Fallback to localStorage
    try {
      const savedFlavors = localStorage.getItem(STORAGE_KEY);
      if (savedFlavors) {
        console.log('📦 Using localStorage fallback for flavors');
        return JSON.parse(savedFlavors);
      }
    } catch (localError) {
      console.error('❌ Error loading from localStorage:', localError);
    }
    
    return {};
  }
}

/**
 * Reads fill levels from Firebase for a session (one-time read)
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} Promise that resolves to fill levels object
 */
export async function loadFillLevelsFromFirebase(sessionId) {
  try {
    const fillLevelsRef = getSessionRef(sessionId, 'fillLevels');
    const snapshot = await get(fillLevelsRef);
    
    if (snapshot.exists()) {
      const fillLevels = snapshot.val();
      console.log(`📥 Fill levels loaded from Firebase session: ${sessionId}`);
      
      // Save to localStorage as backup
      localStorage.setItem(FILL_LEVELS_KEY, JSON.stringify(fillLevels));
      
      return fillLevels;
    } else {
      console.log(`📭 No fill levels found in Firebase session: ${sessionId}`);
      return {};
    }
  } catch (error) {
    console.error('❌ Error loading fill levels from Firebase:', error);
    
    // Fallback to localStorage
    try {
      const savedFillLevels = localStorage.getItem(FILL_LEVELS_KEY);
      if (savedFillLevels) {
        console.log('📦 Using localStorage fallback for fill levels');
        return JSON.parse(savedFillLevels);
      }
    } catch (localError) {
      console.error('❌ Error loading from localStorage:', localError);
    }
    
    return {};
  }
}

/**
 * Sets up real-time listeners for session data changes
 * @param {string} sessionId - The session ID
 * @param {Function} onFlavorsChange - Callback for flavor changes
 * @param {Function} onFillLevelsChange - Callback for fill level changes
 * @returns {Function} Cleanup function to remove listeners
 */
export function setupRealtimeListeners(sessionId, onFlavorsChange, onFillLevelsChange) {
  const flavorsRef = getSessionRef(sessionId, 'flavors');
  const fillLevelsRef = getSessionRef(sessionId, 'fillLevels');
  
  // Set up flavor changes listener
  const flavorsUnsubscribe = onValue(flavorsRef, (snapshot) => {
    if (snapshot.exists()) {
      const flavors = snapshot.val();
      console.log(`🔄 Real-time flavors update received for session: ${sessionId}`);
      
      // Save to localStorage as backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flavors));
      
      // Call the callback function
      if (onFlavorsChange) {
        onFlavorsChange(flavors);
      }
    }
  }, (error) => {
    console.error('❌ Error in flavors listener:', error);
  });
  
  // Set up fill levels listener
  const fillLevelsUnsubscribe = onValue(fillLevelsRef, (snapshot) => {
    if (snapshot.exists()) {
      const fillLevels = snapshot.val();
      console.log(`🔄 Real-time fill levels update received for session: ${sessionId}`);
      
      // Save to localStorage as backup
      localStorage.setItem(FILL_LEVELS_KEY, JSON.stringify(fillLevels));
      
      // Call the callback function
      if (onFillLevelsChange) {
        onFillLevelsChange(fillLevels);
      }
    }
  }, (error) => {
    console.error('❌ Error in fill levels listener:', error);
  });
  
  console.log(`👂 Real-time listeners set up for session: ${sessionId}`);
  
  // Return cleanup function
  return () => {
    console.log(`👋 Cleaning up listeners for session: ${sessionId}`);
    flavorsUnsubscribe();
    fillLevelsUnsubscribe();
  };
}

/**
 * Checks if Firebase is available (for offline detection)
 * @returns {Promise<boolean>} True if Firebase is reachable
 */
export async function isFirebaseAvailable() {
  try {
    // Try to read a simple value from Firebase
    const testRef = ref(database, '.info/connected');
    const snapshot = await get(testRef);
    return true;
  } catch (error) {
    console.log('🔌 Firebase appears to be offline');
    return false;
  }
}

/**
 * Gets session metadata (last updated, etc.)
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} Session metadata
 */
export async function getSessionMetadata(sessionId) {
  try {
    const metadataRef = getSessionRef(sessionId, 'metadata');
    const snapshot = await get(metadataRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {
        lastUpdated: Date.now(),
        version: '1.0'
      };
    }
  } catch (error) {
    console.error('❌ Error getting session metadata:', error);
    return {
      lastUpdated: Date.now(),
      version: '1.0'
    };
  }
}

/**
 * Deletes a session from Firebase (cleanup)
 * @param {string} sessionId - The session ID to delete
 * @returns {Promise} Promise that resolves when session is deleted
 */
export async function deleteFirebaseSession(sessionId) {
  try {
    const sessionRef = getSessionRef(sessionId);
    await set(sessionRef, null);
    console.log(`🗑️ Firebase session deleted: ${sessionId}`);
    return true;
  } catch (error) {
    console.error('❌ Error deleting Firebase session:', error);
    throw error;
  }
}