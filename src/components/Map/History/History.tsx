import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from '../../../utils/styles/styled';
import { RootState } from '../../../store/index';
import { HistoryPropsType } from '../../../store/common/type';

const HistoryWapper = styled.div`
  z-index: 30;
  width: 250px;
  height: 250px;
  background-color: white;
  padding: 15px 10px;
  position: fixed;
  top: 110px;
  right: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const HistoryList = styled.ul`
  margin-top: 10px;
`;

const HistoryItem = styled.li`
  margin-bottom: 5px;
  padding: 3px;
  border-radius: 3px;
  font-size: 1.3rem;
  color: ${(props) => props.theme.GREY};

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

interface HistoryProps {
  isHistoryOpen: boolean;
  comparisonButtonClickHandler: (id: string) => void;
}

function History({
  isHistoryOpen,
  comparisonButtonClickHandler,
}: HistoryProps): ReactElement {
  const { log } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;

  if (!isHistoryOpen) return <></>;

  return (
    <HistoryWapper>
      <HistoryTitle text-align="center">
        HISTORY LIST
        <Explain>클릭 시 현재 화면과 비교할 수 있습니다.</Explain>
      </HistoryTitle>
      <HistoryList>
        {(log || [])
          .map((item) => (
            <HistoryItem
              key={item.id}
              onClick={() => comparisonButtonClickHandler(item.id as string)}
            >
              <p>{`${item.feature} > ${item.subFeature} > ${item.element} > ${item.subElement}`}</p>
              <p>{`${item.changedKey}가 ${item.changedValue}로 변경`}</p>
            </HistoryItem>
          ))
          .reverse()}
      </HistoryList>
    </HistoryWapper>
  );
}

export default History;
