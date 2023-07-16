import { useSelector } from 'react-redux';

import { EventsMap } from '@/components';
import { ShortEvents } from '@/components/shortEvents';
import { getGeoSelector } from '@/features/auth/auth.selectors';

import { getEventsSelector } from '../../home.page.selector';

interface PropsType {
  isMap: boolean;
  lastElem: (node?: Element | null | undefined) => void;
  range: string;
}

export const EventsOrMap: React.FC<PropsType> = ({ isMap, range, lastElem }) => {
  const geo = useSelector(getGeoSelector);
  const events = useSelector(getEventsSelector);

  return !isMap ? (
    events?.map((item) => (
      <ShortEvents
        key={item.id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
        geo={item.geo}
        lastElem={events[events.length - 1].id === item.id ? lastElem : null}
      />
    ))
  ) : (
    <EventsMap
      range={range}
      position={geo?.lat ? [geo.lat, geo.lon] : [55.751244, 37.618423]}
      center={geo?.lat ? [geo.lat, geo.lon] : [55.751244, 37.618423]}
    />
  );
};
