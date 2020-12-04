import React from 'react';
import { Link } from 'react-router-dom';
import Canvas from '../components/Canvas';
import styled from '../utils/styles/styled';

const BackGround = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.DEEPGREY};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StartButton = styled.button`
  width: 250px;
  height: 60px;

  border: none;
  border-radius: 40px;
  font-size: 2.8rem;
  font-weight: bold;

  color: ${(props) => props.theme.GREEN};
  background-color: ${(props) => props.theme.WHITE};
  &:hover {
    background-color: ${(props) => props.theme.GREEN};
    color: ${(props) => props.theme.WHITE};
  }
`;

function Entry(): React.ReactElement {
  return (
    <BackGround>
      <Container>
        <Canvas />
        <StartButton>
          <Link to="/map">시작하기</Link>
        </StartButton>
      </Container>
    </BackGround>
  );
}

export default Entry;
