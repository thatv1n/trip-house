import styled from '@emotion/styled';

export const Root = styled.div(() => {
  return {
    display: 'flex',
    // margin: '1.2rem',
    maxWidth: '80.5rem',
    marginBottom: '0.5rem',
    '@media (max-width: 734px)': { marginTop: '1.2rem' },
  };
});

export const Text = styled.div<{ me?: boolean }>(({ theme, me }) => {
  return {
    width: '100%',
    position: 'relative',
    // marginTop: '0.6rem',
    maxWidth: '45rem',
    minHeight: '3.6rem',
    padding: '0.8rem 5.7rem 0.8rem 1.6rem',
    borderRadius: '1.8rem',
    background: me ? theme.color.lightPurple2 : theme.color.lightGray7,
  };
});

export const TextGroup = styled.div(() => {
  return {
    width: '100%',
    position: 'relative',
    // marginTop: '0.6rem',
    maxWidth: '75rem',
    borderRadius: '1.8rem',
  };
});

export const Avatar = styled.div<{ url: string }>((url) => {
  return {
    width: 36,
    minWidth: 36,
    height: 36,
    borderRadius: '50%',
    marginRight: '1rem',
    background: `url(${url.url})    center / cover  no-repeat`,
  };
});
