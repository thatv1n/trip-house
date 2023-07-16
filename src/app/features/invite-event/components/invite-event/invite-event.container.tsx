import { getUserSelector } from '@/features/auth/auth.selectors';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusInviteEventAction } from '../../invite-event.actions';
import { getByIdInviteEventSelector } from '../../invite-event.selectors';
import { InviteEventStatus } from '../../invite-event.types';
import { InviteEvent } from './invite-event';

interface InviteEventContainerProps {
  id: string;
}

export const InviteEventContainer: FC<InviteEventContainerProps> = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector)!;
  const inviteEvent = useSelector((state) => getByIdInviteEventSelector(state, id));
  if (!inviteEvent) {
    return null;
  }
  const { event, sender } = inviteEvent;
  const isSender = user.id === sender.id;

  const handlerAcceptInvite = () => {
    dispatch(updateStatusInviteEventAction.started({ id, status: InviteEventStatus.ACCEPT }));
  };
  const handlerRejectInvite = () => {
    dispatch(updateStatusInviteEventAction.started({ id, status: InviteEventStatus.REJECT }));
  };
  return (
    <InviteEvent isSender={isSender} event={event} onAccept={handlerAcceptInvite} onReject={handlerRejectInvite} />
  );
};
