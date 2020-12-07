import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Entry from './pages/Entry';

/** 추후에 라우팅해야되면 수정할 예정 */
function App(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Entry} />
      <Route path="/map" component={Main} />
      <Route path="/show" component={Main} />
    </Switch>
  );
}

export default App;
