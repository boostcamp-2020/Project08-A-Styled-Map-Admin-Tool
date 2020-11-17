import React from 'react';
import './App.css';
import styled from './utils/styles/styled';

const Div = styled.div`
  color: ${(props) => props.theme.GREEN};
`;

function App(): React.ReactElement {
  return <Div>hello world</Div>;
}

export default App;
