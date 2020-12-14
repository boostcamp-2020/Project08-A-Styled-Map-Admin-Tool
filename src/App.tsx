import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Entry from './pages/Entry';
import { URLPathNameType } from './store/common/type';

/** 추후에 라우팅해야되면 수정할 예정 */
function App(): React.ReactElement {
  return (
    <Switch>
      <Route path={URLPathNameType.root} exact component={Entry} />
      <Route path={URLPathNameType.map} component={Main} />
      <Route path={URLPathNameType.show} component={Main} />
    </Switch>
  );
}

export default App;
