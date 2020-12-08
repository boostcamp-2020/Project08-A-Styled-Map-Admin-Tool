import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from '../../../utils/styles/styled';
import { RootState } from '../../../store/index';
import { HistoryPropsType } from '../../../store/common/type';
import { comparisonButtonClickHandlerType } from '../../../hooks/map/useCompareFeature';

const HistoryWapper = styled.div`
  z-index: 30;
  width: 370px;
  height: 200px;
  background-color: white;
  padding: 15px 10px;
  position: fixed;
  top: 110px;
  right: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const HistoryItem = styled.div`
  margin-bottom: 5px;
  padding: 3px;
  border-radius: 3px;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.LIGHTGREY};
  }
`;

const HistoryTitle = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  text-align: center;
`;

interface HistoryProps {
  isHistoryOpen: boolean;
  comparisonButtonClickHandler: comparisonButtonClickHandlerType;
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
      <HistoryTitle text-align="center">HISTORY LIST</HistoryTitle>
      {log ? (
        log
          .map((item) => (
            <HistoryItem
              key={item.id}
              onClick={() => comparisonButtonClickHandler(/** props */)}
            >
              <p>{`${item.feature} > ${item.subFeature} > ${item.element} > ${item.subElement}`}</p>
              <p>{`${item.changedKey}가 ${item.changedValue}로 변경`}</p>
            </HistoryItem>
          ))
          .reverse()
      ) : (
        <></>
      )}
    </HistoryWapper>
  );
}

export default History;
