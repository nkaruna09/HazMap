import React from "react";

interface MapViewProps {
  className?: string;
}

export function MapView({ className = '' }: MapViewProps) {
  return (
    <div className={`relative w-full h-[600px] ${className}`}>
      {/* Embed the Folium map served by Flask */}
      <iframe
        src="http://localhost:5000/api/data"
        className="absolute inset-0 w-full h-full border-0"
        title="Safe Route Map"
      />
    </div>
  );
}
