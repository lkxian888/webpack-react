import React, { FC, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes from './routes';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading....</div>}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
