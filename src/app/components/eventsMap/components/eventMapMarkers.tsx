import { EventShort } from '@/features/home/home.page.types';
import React from 'react';
import { Marker } from 'react-leaflet';
import { useLocation } from 'react-router-dom';

import { PopupMarker } from './PopupMarker';

interface PropsType {
  isActiveMarker: (id: string) => L.Icon<L.IconOptions>;
  handlerMarker: (id: string) => void;
  setActiveMarker: React.Dispatch<React.SetStateAction<string | null>>;
  checkedEvent: React.MutableRefObject<any>;
  events: any;
}

export const EventMapMarkers: React.FC<PropsType> = ({
  isActiveMarker,
  handlerMarker,
  setActiveMarker,
  checkedEvent,
  events,
}) => {
  const { pathname } = useLocation();
  const path = pathname.split('/').filter((item) => !!item);

  return events?.map((item: EventShort) => ( 
    <Marker
      key={item.id}
      position={[item.geo.lat, item.geo.lng]}
      icon={isActiveMarker(item.id)}
      ref={path[2] === item.id ? checkedEvent : null}
      eventHandlers={{ click: () => handlerMarker(item.id), popupclose: () => setActiveMarker(null) }}
    >
      <PopupMarker item={item} />
    </Marker>
  ));
};
