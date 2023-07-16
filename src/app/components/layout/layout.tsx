import { isLogedinSelector } from '@/features/auth/auth.selectors';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Flex } from '../box';
import { Footer } from '../footer';
// import { Footer } from '../footer';
import { Header } from '../header';

export const Layout: FC<unknown> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [firstSegment] = pathname.split('/').filter((item) => !!item);
  const isRegisterLoading = useSelector((state) => getSingleLoadingSelector(state, 'register'));
  const isConfirmSmsLoading = useSelector((state) => getSingleLoadingSelector(state, 'confirmSms'));
  const isProfileLoading = useSelector((state) => getSingleLoadingSelector(state, 'profile'));
  const isLogedin = useSelector(isLogedinSelector);
  useEffect(() => {
    if (firstSegment !== 'auth' && !isRegisterLoading && !isConfirmSmsLoading && !isLogedin && !isProfileLoading) {
      navigate('/auth');
    }
  }, [firstSegment, isRegisterLoading, isConfirmSmsLoading, isProfileLoading, isLogedin]);
  if (firstSegment === 'auth') {
    return (
      <Flex flexDirection="column" bg="bg" css={{ position: 'relative' }}>
        <Header />
        <Outlet />
      </Flex>
    );
  }
  return (
    <Flex flexDirection="column" bg="bg" css={{ position: 'relative' }}>
      {isLogedin ? (
        <Fragment>
          <Header />
          <Outlet />
          <Footer />
        </Fragment>
      ) : null}
    </Flex>
  );
};
