'use client';

import { useEffect } from 'react';
import { MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

import { Point, Track } from '@/_types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export interface Props {
  center: Point;
  zoom?: number;
  tracks: Track[];
  fixed?: boolean;
}

const defaults = {
  zoom: 6,
};

const Map = (props: Props) => {
  const { zoom = defaults.zoom, fixed = false, center, tracks } = props;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      dragging={!fixed}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tracks.map((t, i) => (
        <Polyline
          key={i}
          pathOptions={{ fillColor: 'blue' }}
          positions={t.points}
        />
      ))}
      <MapDragEnabler {...props} />
      <MapFitBounds {...props} />
    </MapContainer>
  );
};

function MapDragEnabler({ fixed }: Props) {
  const map = useMap();
  if (fixed && map.dragging.enabled()) {
    map.dragging.disable();
  }
  if (!fixed && !map.dragging.enabled()) {
    map.dragging.enable();
  }
  return null;
}

function MapFitBounds({ tracks }: Props) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      if (tracks.length > 0) {
        const bounds = new LatLngBounds([]);
        tracks.forEach(({ points }) => points.forEach((p) => bounds.extend(p)));

        map.invalidateSize();
        map.fitBounds(bounds);
        // TODO: animate with
        // map.flyToBounds(bounds, { duration: 0.5 })
      }
    }, 500);
  }, [tracks, map]);

  return null;
}

export default Map;
