import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '../../../utils/styles/styled';
import { RootState } from '../../../store/index';
import useHistoryFeature from '../../../hooks/common/useHistoryFeature';
import { HistoryPropsType } from '../../../store/common/type';

const HistoryWapper = styled.div`
  z-index: 30;
  background-color: white;
  padding: 15px 20px;
  position: fixed;
  top: 110px;
  right: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
`;

function History(): ReactElement {
  const { initIsOpenHistory } = useHistoryFeature();
  useEffect(() => initIsOpenHistory(), []);

  const historyStates = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;

  const { isHistoryOpen } = historyStates;
  if (!isHistoryOpen) return <></>;
  return (
    <>
      <HistoryWapper>This is the history</HistoryWapper>
    </>
  );
}

export default History;
