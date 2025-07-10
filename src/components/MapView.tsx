import React, { useEffect, useRef, useState } from 'react';
import { useDriver } from '@/contexts/DriverContext';
import { Loader } from '@googlemaps/js-api-loader';
import { config } from '@/config/env';
interface MapViewProps {
  height?: string;
  showCurrentLocation?: boolean;
  showJobLocation?: boolean;
  jobLocation?: {
    lat: number;
    lng: number;
  };
  interactive?: boolean;
}
const MapView: React.FC<MapViewProps> = ({
  height = 'h-[200px]',
  showCurrentLocation = true,
  showJobLocation = false,
  jobLocation,
  interactive = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const {
    driver
  } = useDriver();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use driver's current location or default to LA
  const currentLocation = driver?.currentLocation || {
    lat: 34.0522,
    lng: -118.2437
  };
  useEffect(() => {
    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('MapView: Initializing map...');
        console.log('MapView: API Key configured:', !!config.googleMapsApiKey);
        console.log('MapView: API Key value:', config.googleMapsApiKey ? 'Present' : 'Missing');

        // Check if API key is available
        if (!config.googleMapsApiKey) {
          console.error('MapView: Google Maps API key not configured');
          setError('Google Maps API key not configured');
          setIsLoading(false);
          return;
        }

        // Initialize Google Maps
        console.log('MapView: Creating Google Maps loader...');
        const loader = new Loader({
          apiKey: config.googleMapsApiKey,
          version: 'weekly',
          libraries: ['places']
        });
        
        console.log('MapView: Loading Google Maps API...');
        await loader.load();
        console.log('MapView: Google Maps API loaded successfully');
        if (!mapRef.current) return;
        const mapOptions: google.maps.MapOptions = {
          center: currentLocation,
          zoom: 15,
          disableDefaultUI: !interactive,
          gestureHandling: interactive ? 'auto' : 'none',
          zoomControl: interactive,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        };
        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Add current location marker
        if (showCurrentLocation && currentLocation) {
          new google.maps.Marker({
            position: currentLocation,
            map: map,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24)
            }
          });
        }

        // Add job location marker
        if (showJobLocation && jobLocation) {
          new google.maps.Marker({
            position: jobLocation,
            map: map,
            title: 'Service Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B35"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32)
            }
          });

          // Draw route if both locations exist
          if (currentLocation) {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#FF6B35',
                strokeWeight: 4
              }
            });
            directionsRenderer.setMap(map);
            directionsService.route({
              origin: currentLocation,
              destination: jobLocation,
              travelMode: google.maps.TravelMode.DRIVING
            }, (result, status) => {
              if (status === 'OK' && result) {
                directionsRenderer.setDirections(result);
              }
            });
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.error('MapView: Error loading Google Maps:', err);
        console.error('MapView: Error details:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          apiKey: config.googleMapsApiKey ? 'Present' : 'Missing'
        });
        setError(`Failed to load map: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsLoading(false);
      }
    };
    initializeMap();
  }, [currentLocation, showCurrentLocation, showJobLocation, jobLocation, interactive]);
  if (error) {
    return (
      <div className={`w-full ${height} rounded-lg border overflow-hidden relative flex items-center justify-center bg-muted`}>
        <div className="text-center p-6">
          <div className="text-muted-foreground mb-2">⚠️ Map Error</div>
          <div className="text-sm text-muted-foreground">{error}</div>
          {!config.googleMapsApiKey && (
            <div className="text-xs text-muted-foreground mt-2">
              Set VITE_GOOGLE_MAPS_API_KEY in your environment variables
            </div>
          )}
        </div>
      </div>
    );
  }
  return <div className={`w-full ${height} rounded-lg border overflow-hidden relative`}>
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>}
      <div ref={mapRef} className="w-full h-full" aria-label="Map view showing location" />
    </div>;
};
export default MapView;