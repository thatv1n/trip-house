import { BrowserHistory } from 'history';
import { FC, ReactNode, useLayoutEffect, useState } from 'react'
import { Router as BrowserRouter } from 'react-router-dom'

interface RouterProps {
  children: ReactNode;
  history: BrowserHistory;
}

export const Router: FC<RouterProps> = ({ children, history }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <BrowserRouter 
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </BrowserRouter>
  );
};
