/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from '@emotion/styled';
import L from 'leaflet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { EventMapMarkers } from './components';

import markerPurple from '#/img/marker-color.png';
import markerGray from '#/img/marker-gary.png';

import { getEventsSelector } from '@/features/home/home.page.selector';
import 'leaflet/dist/leaflet.css';
import { eventMapApi } from './eventMap.api';
import './popup.style.css';

const WrapMap = styled.div<{ url: string[] }>(({ url }) => {
  return {
    maxWidth: '100%',
    background: '#fff',
    marginTop: '2rem',
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 0,
    '@media (max-width: 768px)': {
      marginTop: '-1rem',
      borderRadius: url[0] === 'events' ? 0 : 20,
    },
  };
});

const iconPurple = L.icon({
  iconUrl: markerPurple,
  popupAnchor: [210, 60],
});

const iconGray = L.icon({
  iconUrl: markerGray,
  popupAnchor: [210, 60],
});

const defaultProps = {
  range: '0',
  createEvent: false,
  position: [0, 0],
  setPosition: (item: any) => {
    return item;
  },
  setAddress: (item: any) => {
    return item;
  },
};
type TypeProps = {
  range?: string | null;
  createEvent?: boolean;
  position?: L.LatLngExpression;
  center: L.LatLngExpression;
  setPosition?: (value: any) => void;
  setAddress?: (value: any) => void;
} & typeof defaultProps;

export const EventsMap = ({ range, createEvent, position, center, setPosition, setAddress }: TypeProps) => {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const events = useSelector(getEventsSelector);

  const [isViewed, setIsViewed] = useState(false);

  const checkedEvent = useRef<any>();
  const mapRef = useRef<any>(null);

  const { pathname } = useLocation();
  const path = pathname.split('/').filter((item) => !!item);
  const handlerMarker = (id: string): void => {
    setActiveMarker(id);
  };
  console.log(path);

  const isActiveMarker = useMemo(() => {
    return (id: string): L.Icon<L.IconOptions> => {
      if (activeMarker) {
        return activeMarker === id ? iconPurple : iconGray;
      }
      return iconPurple;
    };
  }, [activeMarker]);

  const LocationFinderDummy = () => {
    useMapEvents({
      click: async (e) => {
        const { latlng } = e;
        setAddress({
          country: '',
          city: '',
          detail: `Получаем точное местоположение...`,
        });
        try {
          const data = await eventMapApi.getGeo(latlng.lat, latlng.lng);
          const detail = [
            data.address.shop,
            data.address.leisure,
            data.address.tourism,
            data.address.building,
            data.address.amenity,
            data.address.road,
            data.address.house_number,
          ]
            .filter(Boolean)
            .join(', ');

          setAddress({
            country: data.address.country,
            city: data.address.city || data.address.state,
            detail,
          });
          setPosition([latlng.lat, latlng.lng]);
        } catch (error) {
          console.error(error);
        }
      },
    });
    return null;
  };

  function LocationMarker() {
    const mMap: L.Map = useMap();
    mMap.whenReady(() => {
      mapRef.current = mMap;
    });
    return null;
  }

  const onClickShowMarker = useCallback(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const marker = checkedEvent.current;

    if (marker) {
      map.flyTo(marker._latlng, 14);
      marker.openPopup();
      setIsViewed(true);
    }
  }, []);

  useEffect(() => {
    if (path[1] === 'find-event' && !isViewed) {
      handlerMarker(path[2]);
      onClickShowMarker();
    }
  }, [path, isViewed]);

  useEffect(() => {
    return () => setIsViewed(false);
  }, []);

  return (
    <WrapMap url={path}>
      {!createEvent ? (
        <MapContainer
          center={center}
          zoom={11}
          css={{
            height: '79.7rem',
            width: '100%',
            '@media (max-width: 768px)': { height: '80vh', margin: '0 auto' },
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {range !== '0' && (
            <Circle center={position} pathOptions={{ color: '#F5F5F5', fillColor: '#576B72' }} radius={Number(range)} />
          )}
          <EventMapMarkers
            isActiveMarker={isActiveMarker}
            handlerMarker={handlerMarker}
            setActiveMarker={setActiveMarker}
            checkedEvent={checkedEvent}
            events={events}
          />
          <LocationMarker />
        </MapContainer>
      ) : (
        <MapContainer center={center} zoom={12} style={{ height: '40rem', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker icon={iconPurple} position={position} />
          <LocationFinderDummy />
        </MapContainer>
      )}
    </WrapMap>
  );
};
EventsMap.defaultProps = defaultProps;
