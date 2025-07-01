
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.81621351de3a4e1abab76ce74b01e9b5',
  appName: 'Ayzgo',
  webDir: 'dist',
  server: {
    url: 'https://81621351-de3a-4e1a-bab7-6ce74b01e9b5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1f2937',
      showSpinner: false
    }
  }
};

export default config;
