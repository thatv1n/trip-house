import { FC, useEffect } from 'react';
import { useTolgee } from '@tolgee/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AboutEvent, AuthPage, CreateEvent, HomePage } from '@/features';
import { Layout, LayoutAdminPanel } from '../layout';
import { AdminPanelPage, AuthAdminIndexPage } from '@/admin';
import { CategoriesAdmin } from '@/admin/pages';
import { ChatPage } from '@/features/chat';
import { ProfilePage } from '@/features/profile/profile.page';
import { getUserSelector } from '@/features/auth/auth.selectors';

export const Root: FC<unknown> = () => {
  const user = useSelector(getUserSelector);
  const { getLanguage, changeLanguage } = useTolgee();
  useEffect(() => {
    if (user?.lang && getLanguage() !== user?.lang) {
      changeLanguage(user.lang);
    }
  }, [user?.lang, getLanguage, changeLanguage]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/events" />} />
        <Route path="events/*" element={<HomePage />} />
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="about-the-event/:id" element={<AboutEvent />} />
        <Route path="create-event/" element={<CreateEvent />} />
        <Route path="profile/*" element={<ProfilePage />} />
        <Route path="chat/*" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>
      <Route path="admin-panel/" element={<LayoutAdminPanel />}>
        <Route index element={<AdminPanelPage />} />
        <Route path="auth-admin/*" element={<AuthAdminIndexPage />} />
        <Route path="categories" element={<CategoriesAdmin />} />
        <Route path="*" element={<Navigate to="/auth-admin" />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
