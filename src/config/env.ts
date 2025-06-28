
export const config = {
  googleMapsApiKey: 'AIzaSyDakkuH9lDMSqhH4sO87hXWv9PWij4rr8g',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Helper to check if required environment variables are set
export const checkRequiredEnvVars = () => {
  const missing = [];
  
  if (!config.googleMapsApiKey) {
    missing.push('GOOGLE_MAPS_API_KEY');
  }
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing.join(', '));
  }
  
  return missing.length === 0;
};
