// Dependencies
import React, { ReactElement } from 'react';
import styled from '../../../utils/styles/styled';

// Components
import SetHistoryContent from './SetHistoryContent';
import ReplaceHistoryContent from './ReplaceHistoryContent';

// Hook
import useHistoryFeature from '../../../hooks/map/useHistoryFeature';

// Type
import {
  HistorySetLogType,
  HistoryReplaceLogType,
  ReplaceType,
} from '../../../store/common/type';

const HistoryWapper = styled.div`
  z-index: 30;
  width: 250px;
  height: 270px;
  background-color: white;
  padding: 15px 10px;
  position: fixed;
  top: 110px;
  right: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  display: flex;
  flex-direction: column;
`;

const HistoryList = styled.ul`
  margin-top: 10px;
  margin-bottom: 20px;
  overflow-y: scroll;
`;

interface HistoryItemProps {
  isCurrent: boolean;
  isCompared: boolean;
}

const HistoryItem = styled.li<HistoryItemProps>`
  margin-bottom: 5px;
  padding: 3px;
  border-radius: 3px;
  font-size: 1.3rem;
  color: ${(props) => (props.isCurrent ? props.theme.GREEN : props.theme.GREY)};
  background-color: ${(props) =>
    props.isCompared ? props.theme.LIGHTGREY : props.theme.WHITE};

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.LIGHTGREY};
  }
`;

const HistoryTitle = styled.div`
  margin-bottom: 5px;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
`;

const Explain = styled.p`
  padding-left: 7px;
  font-size: 1.3rem;
  color: ${(props) => props.theme.DARKGREY};
`;

const ResetHistory = styled.button`
  position: absolute;
  top: 240px;
  align-self: center;
  width: 60%;
  &:hover {
    color: ${(props) => props.theme.GREEN};
    outline: none;
  }
`;
interface HistoryProps {
  isHistoryOpen: boolean;
  comparisonButtonClickHandler: (id: string) => void;
  compareId: string | undefined;
  setLogId: (id: string | undefined) => void;
}

function History({
  isHistoryOpen,
  comparisonButtonClickHandler,
  compareId,
  setLogId,
}: HistoryProps): ReactElement {
  const { log, currentIdx, resetHistoryAndStyle } = useHistoryFeature();
  if (!isHistoryOpen) return <></>;

  return (
    <HistoryWapper>
      <HistoryTitle text-align="center">
        HISTORY LIST
        <Explain>클릭 시 현재 화면과 비교 가능</Explain>
      </HistoryTitle>
      <HistoryList>
        {log
          ?.map((item, idx) => (
            <HistoryItem
              key={item.id}
              isCurrent={currentIdx === idx}
              isCompared={item.id === compareId}
              onClick={() => comparisonButtonClickHandler(item.id as string)}
            >
              {item.changedKey in ReplaceType ? (
                <ReplaceHistoryContent item={item as HistoryReplaceLogType} />
              ) : (
                <SetHistoryContent item={item as HistorySetLogType} />
              )}
            </HistoryItem>
          ))
          .reverse()}
      </HistoryList>
      <ResetHistory
        onClick={() => {
          setLogId(undefined);
          resetHistoryAndStyle();
        }}
      >
        History Reset
      </ResetHistory>
    </HistoryWapper>
  );
}

export default History;
