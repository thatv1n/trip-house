import { MenuAdmin } from '@/admin';
import { isLoginAdminSelector } from '@/admin/adminAuth/auth-admin.selectors';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex } from '../box';

export const LayoutAdminPanel: FC<unknown> = () => {
  const navigate = useNavigate();

  const isLoginAdmin = useSelector(isLoginAdminSelector);
  const isLoadingAdminProfile = useSelector((state) => getSingleLoadingSelector(state, 'profileAdmin'));

  useEffect(() => {
    if (isLoadingAdminProfile) {
      if (isLoginAdmin) {
        navigate('/admin-panel');
      } else {
        navigate('/admin-panel/auth-admin');
      }
      console.log('isLoginAdmin: %o', isLoginAdmin);
    }
  }, [isLoginAdmin, isLoadingAdminProfile]);
  return (
    <Flex bg="bg">
      {isLoginAdmin && <MenuAdmin />}
      <Flex css={{ marginLeft: 324, width: '100%' }}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
