import React, { useEffect, useRef, useState } from 'react';
import { useDriver } from '@/contexts/DriverContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { driver } = useDriver();
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
        
        console.log('MapView: Initializing Leaflet map...');
        
        if (!mapRef.current) return;

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'data:image/png;base64,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',
          iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbXNfN1+5844zYyFq2l7EttWBg7E61VIbw0K9+tl64iyIcLIqyAUE7gYIEFtpYZFEEOv9LtdVYG1t9yJLp2T+mC4BiW6VrFa65u2F3ggwXggoEFtrnTxLnqN1jk2A0hDhKJQVAQSJEMEgB7PUW7LFsH+T7SnfPZOTJBfJqoKKNhU6ZKm0rKVdQs6kSEBqUYXgVgA9UApwUo8wl+GH2YHJ/BL8ZS0XYk4EGG9NopJKqiHMLK1DEVb6Sb8HrIjJFSUlYYUq8c5ZsJECKbLNJUFkmYEeGiwtQqJNqSDZ7o5+4d+OOqhMDAdNqHoJyOtLKmKSkJt5uFqWgAJMdmOobQfBX7yq0I2/OMHgOaZCcJmzLSoOjqKZcHbgr1FEdBJFcJLhXXiogIZqt4GJ8Hu/TyJDqJ6p3dX3WkPY7RuWYFKhKx+YjUZQRV8tAwZfPpwVSjFRxWmE4eAmTpVt/EUBQ3FyB4VqJtKZSJ+gCN+cLJQLFhgLJfhSpOTi5sLKfzTlbhITACqaGLYAJc9J7FQGSxMzKFVOKNyZiPqOXAwzCsGGlBhcDRyEICqlKBWGNjNyP3qVLiZMIKT6E6t7Bek8DXUA4rFb7H6OfUBMV8q1ABqN6fNZWVzVk0JTFQH1RM6UZYrJhk8U8aw7DGJUxgB2b7Hh5mTMAKZFlhcqB/jJAojhYTGNzqKs5Vy1HTBzWEGjhJnHBIz1ZgWqLSgGZFhyNGNhzWbZkTjHWjA6qWy5D7y8u1iBwWlLYVlNMKvlVpVOHy6NYZTYGACJmf1MvLIwqGXsQj6HIcJEJYHwqHYXB0p3KdcJYnQH1VfZQKKj7KZYyOEqhSLiY8BHYFi7RfJEZyFCTBKADZhRKnmKYPcIlTKoVOCQZqeOGNyOvFzMPFBQGGQV8xgKiHhqVKZSqWQBPyCUgvJApKqCFlJJdaqyZLnAU4kKKJ0IIOOEOJJJa4vy/RNKGhpD7XYBDk0UVQyYH1ABLNfGWFhwRAGjOKJIuGXlELfGdnfqAHf4/bGDtK7XTHU+s4HfTpNPczOe3Ym8zT5v/CzBzPM+p9zeBj8pBJmLM8q6TZeSNLLe9QbLXe+a/xhQ3V1f8JiKYOzTkgftKOQmWIWI5/LwcuXlpXWM6Qv9wc0NxtLjbfVfz8YkWLQ5a5s/TFbVnV4dSJQfZT+LNgf8zX0DHPCwNPp8h7qVdFtmDtjTnUVfCROYO5dqEKaFmNNY0KhQsBMKhyOm0HpT2DsQDrN8B4m7hZ8dxJlT9JtDqBJF0cj7FJhLahjfVMBb2KlBisDGJHpZOOBhEHKZShbKJBJpHvSBIDFnTyLv5bnL2P4nJZDJbUBh4WLZOKxSbchhCNy9vGIJNGKLWWWM8M7WPYHxGbFWKFJJJTEPeAD0HlJPJ4B8bnLOt5nSJVGFDOOhQLBnHaIUVrZKANDp8o0MfEQNI+s/HNwkSgvFQRz+xz+J4uqYhOKc5PJLzOSYHjCCPd7pYGN8TlBGIHhNTOqAQTwgKJGYpNzYFJQQJ4YPQ0BYpI0PTDMBjwJFP/HfPPXEsJDCyCvR7XY34xkkYaKKZVMlpJJsZrShU6SxtGwBnDy0jSECKm0FYj4RBfKvNJQyDuE7HbzOyqHvRcvOKYaATMRJALgwCAcZuJaUV8S2o/IHQqzNwU7F5zYNGLGQ4lN7SqbM0JcjcOj5Zh4lsWKRGvzk5P6F3KE7ydB7gF6a+jcKH8WVDGFyGOxCq8lSFhqVqn0JHwqcmGF8GmOZ0k5+dKhNMdYOXJdcDceMC1qQFt8J4A8h9nP8xd8vJ3v/3LXLfZUj7Rf8UZFJk3zOBN6vOhOW8+HFDyYKlJ8WcEZJj5VkPJC7b6qj8q3ZRxzxklYwzCvG6CbC8WYpAAXSJE6YzVHZwIl4PzKO+TtCZCTUDtOLMZNYzr0dqGc+zMlTSL/HBNUDSoUnWJBK2kNjRn9KrIHUW8tJmNPBaA8xfaTgF3rGvJ4L3LF9EGf4vW0m/TqvFJGd7TW5LdGVjJ+dN9GhgQnGj6PySLVF6h3x/GyRfhGr/XU9Xez5VSDiZMRKCq/K5/1WKFVAmVK7LLbJL1YbX4RfXWLjKrXb4LgFXBOBFjpvJZJvmJrTJmCFOVeQnJKfrmgA/GnlIGcGE3yLLPSVy6dWAe8h3T8vxCF6rN6F4EWUJw+AcSwcSBARl3eEQGzgCRxmGGIY74LJBEUn6Z4/JzhjF/HpUCJcGfqKOiKl1YZ1PfSkXGW3PFKXuQn7R2Cp0aFyKQwBnUO+KZ1J1T6FADKDUrNhkT1A+LcZOQ1Y4gEgJPfmJJRvQ+Cc/kgdh8HCt5vNu3K5gQ2cZhGv2vQJKNKlPTvFKJKjzHXNsKPxrZKVkKKhPGFhG7Mh4zJ8qoIwvPfMPeE7o/h6QaGQ4Kz3v1JW1kcMYgdJCG7LjP5IrU5DkjOVJ6JAJPgvUP/CBg0r9q4Bz+Kh+GZh1lA8s/H7XqO6HWfRq6LfQGU/j8g9+h7DnoCOH5F/GZhRE0vS1jgQAZf3yqcCT3rQUOUYJe7ZOr+jdBLhgaKFB4W0PdFCYr/Bhe7XP1Gh8HZgBZs7hfmUZjvG6k9VBmCUJCgr0HA6J5xzf5uLAG3YfAhqwp7cUJy9KeX1tGEQ1k9CACbIkdQpSBJT4pPT5YOe4CYTqZDy3hBbQ7IQnNAv3Mzg',
          shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rI7CuODGGhNOQLE1DbmLq3qCH9d3QKP7Db8HgcDDt7QVWKhp9Bd2LMu2EUX7XVl0lHBhWlYhiOJNJUfBNlNW5sOp0uHiA5ObC2NdvbcNqoY8PCjhTcOPGmZoJ8vlRAaJODAU1RtOJd6OtZVR3YhXb5Y8dv1TMaMNHh+jLfr9FeqDG6JQXGFzxD8X/VkN+Xqfr8FdHZPpnhh0XwYAKYDbm0dv3BO7gKZRmT0lNGOJr0s4JnQOJHpShtlZR5xhRhR7xGX+4OhKy8/M9VCgD+gWQtHmb2YJJgKq4pZkuLGYllkuKxVE/WpQ4CVnO1p0EfrnKjsAOvPHNXHdfA6oGl0C4qJUlxLLyfhNmLn9lIBW+XXFGxYdQVgm7YIqNFjWhG6jgA6Gt3X96T3Lj8OKfVBQP7J0x1qmgfaKPpBCtNzjGwFU1ZhWCz5oH7V3gtOtj2FW9bXNXfZNKWlKFtE5EfUdwh5jmhYPvxtPH2NvlDAhJaFz3L6k4r8C5RRRxaOeJLJ9h2JhKJFdaJhKCjdZNK/HJa8VaMpfF4YE6WL4cD2u8oSGIvzpVMRgGNpBvCQN8jrctDgtFHTj+8cw6rztLUX8KIGjDo04hOzGj1J8tVlMJacfSXfcMPYzNs/k6jO9f3IXgLK2tYKKIUgv+8VfcU0RGXBtU2/uBYLp+x9K5aFJ4K2zZbzK9IJrX+xmcv8XclGrK8/nH7f6tG5rP9aPn3eNzvLxmLKNhYfPZkYyVaS6CqNrCDHEQf/68gMv8VL5V1Z8X9KGPMQqhfFM7MZeUPY7mFXwsacpAo7xQGXr4WQmrTqeLOgkB+T1iL5UdKmGJGhVQM2+d4Aj4BKD/n8Q4z7c3kGXuUrD3Mn0TvYF7qj6Fw=',
        });

        // Initialize the map
        const map = L.map(mapRef.current, {
          zoomControl: interactive,
          scrollWheelZoom: interactive,
          doubleClickZoom: interactive,
          boxZoom: interactive,
          keyboard: interactive,
          dragging: interactive,
          touchZoom: interactive
        }).setView([currentLocation.lat, currentLocation.lng], 15);

        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add current location marker
        if (showCurrentLocation && currentLocation) {
          const currentLocationIcon = L.divIcon({
            html: `<div style="background: #3B82F6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            className: 'current-location-marker'
          });

          L.marker([currentLocation.lat, currentLocation.lng], { 
            icon: currentLocationIcon 
          }).addTo(map).bindPopup('Your Location');
        }

        // Add job location marker
        if (showJobLocation && jobLocation) {
          const jobLocationIcon = L.divIcon({
            html: `<div style="background: #FF6B35; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
            iconSize: [30, 30],
            className: 'job-location-marker'
          });

          L.marker([jobLocation.lat, jobLocation.lng], { 
            icon: jobLocationIcon 
          }).addTo(map).bindPopup('Service Location');

          // Draw route if both locations exist
          if (currentLocation) {
            // Simple line between points (for routing, you'd need a routing service)
            const routeLine = L.polyline([
              [currentLocation.lat, currentLocation.lng],
              [jobLocation.lat, jobLocation.lng]
            ], {
              color: '#FF6B35',
              weight: 4,
              opacity: 0.8
            }).addTo(map);

            // Fit bounds to show both markers
            const group = L.featureGroup([
              L.marker([currentLocation.lat, currentLocation.lng]),
              L.marker([jobLocation.lat, jobLocation.lng])
            ]);
            map.fitBounds(group.getBounds().pad(0.1));
          }
        }

        setIsLoading(false);
        console.log('MapView: Leaflet map initialized successfully');
      } catch (err) {
        console.error('MapView: Error loading Leaflet map:', err);
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