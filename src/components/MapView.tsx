
import React, { useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  height?: string;
  showCurrentLocation?: boolean;
  showJobLocation?: boolean;
  jobLocation?: { lat: number; lng: number };
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
  const { currentLocation } = useApp();
  
  useEffect(() => {
    // This is a placeholder for an actual map integration
    // In a real app, you would integrate Google Maps, Mapbox, or another mapping service here
    if (mapRef.current) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = '';
      
      // Create a simple map representation
      const mapContainer = document.createElement('div');
      mapContainer.className = 'relative w-full h-full bg-secondary/50 rounded-lg overflow-hidden';
      
      // Create the map image placeholder
      const mapImage = document.createElement('div');
      mapImage.className = 'absolute inset-0 flex items-center justify-center';
      mapImage.innerHTML = `
        <div class="text-muted-foreground text-center">
          <p class="font-medium">Interactive Map</p>
          <p class="text-xs">${currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : 'Loading location...'}</p>
        </div>
      `;
      
      // Add markers
      if (showCurrentLocation && currentLocation) {
        const currentMarker = document.createElement('div');
        currentMarker.className = 'absolute bg-blue-500 border-2 border-white rounded-full w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse z-10';
        currentMarker.style.left = '50%';
        currentMarker.style.top = '50%';
        mapContainer.appendChild(currentMarker);
      }
      
      if (showJobLocation && jobLocation) {
        const jobMarker = document.createElement('div');
        jobMarker.className = 'absolute bg-primary border-2 border-white rounded-full w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 z-20';
        // Position it slightly offset from center to simulate a nearby location
        jobMarker.style.left = '54%';
        jobMarker.style.top = '48%';
        mapContainer.appendChild(jobMarker);
        
        // Add a line connecting the points
        const connectingLine = document.createElement('div');
        connectingLine.className = 'absolute bg-primary h-0.5 z-0 origin-left';
        connectingLine.style.left = '50%';
        connectingLine.style.top = '50%';
        connectingLine.style.width = '4%';
        connectingLine.style.transform = 'rotate(-15deg)';
        mapContainer.appendChild(connectingLine);
      }
      
      // Add the road/street visual elements
      const road = document.createElement('div');
      road.className = 'absolute bg-gray-300 h-2 w-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0';
      mapContainer.appendChild(road);
      
      // Add road markings
      const roadMarkings = document.createElement('div');
      roadMarkings.className = 'absolute top-1/2 left-0 right-0 flex justify-center items-center z-0';
      roadMarkings.innerHTML = `
        <div class="h-0.5 w-4 bg-white mx-1"></div>
        <div class="h-0.5 w-4 bg-white mx-1"></div>
        <div class="h-0.5 w-4 bg-white mx-1"></div>
        <div class="h-0.5 w-4 bg-white mx-1"></div>
        <div class="h-0.5 w-4 bg-white mx-1"></div>
      `;
      mapContainer.appendChild(roadMarkings);
      
      mapContainer.appendChild(mapImage);
      mapElement.appendChild(mapContainer);
      
      // Add compass in the corner
      const compass = document.createElement('div');
      compass.className = 'absolute top-2 right-2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center';
      compass.innerHTML = 'N';
      mapContainer.appendChild(compass);
    }
  }, [currentLocation, showCurrentLocation, showJobLocation, jobLocation]);
  
  return (
    <div 
      ref={mapRef} 
      className={`w-full ${height} rounded-lg border overflow-hidden`}
      aria-label="Map view showing location"
    ></div>
  );
};

export default MapView;
