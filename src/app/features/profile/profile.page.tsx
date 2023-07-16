import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Settings } from './page';
import { ProfileEvents } from './page/profileEvents';
import { ProfileMePage } from './profileMe.page';
import { ProfileUserPage } from './profileUser.page';

export const ProfilePage: FC = () => {
  return (
    <Routes>
      <Route index element={<ProfileMePage />} />
      <Route path="/events/:id" element={<ProfileEvents />} />
      <Route path="/settings/*" element={<Settings />} />
      <Route path="/:userId" element={<ProfileUserPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
