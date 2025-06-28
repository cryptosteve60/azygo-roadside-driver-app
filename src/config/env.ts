
export const config = {
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_AIzaSyB1OqXUwauWo10wiPjJmiRdqhnIT-1j9Ug || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Helper to check if required environment variables are set
export const checkRequiredEnvVars = () => {
  const missing = [];
  
  if (!config.googleMapsApiKey) {
    missing.push('VITE_GOOGLE_MAPS_AIzaSyB1OqXUwauWo10wiPjJmiRdqhnIT-1j9Ug');
  }
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing.join(', '));
  }
  
  return missing.length === 0;
};
