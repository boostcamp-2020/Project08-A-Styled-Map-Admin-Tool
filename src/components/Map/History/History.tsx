import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from '../../../utils/styles/styled';
import { RootState } from '../../../store/index';
import { HistoryPropsType, objType } from '../../../store/common/type';
import featureTypeData from '../../../utils/rendering-data/featureTypeData';

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

interface HistoryItemProps {
  isCurrent: boolean;
}

const HistoryItem = styled.li<HistoryItemProps>`
  margin-bottom: 5px;
  padding: 3px;
  border-radius: 3px;
  font-size: 1.3rem;
  color: ${(props) => (props.isCurrent ? props.theme.GREEN : props.theme.GREY)};

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

const featureName = featureTypeData.reduce(
  (pre, cur) => {
    const name = pre;
    name.feature[cur.typeKey] = cur.typeName;
    name.subFeature[cur.typeKey] = { all: '전체' };
    cur.subFeatures.forEach((sub) => {
      name.subFeature[cur.typeKey][sub.key] = sub.name;
    });
    return name;
  },
  { feature: {}, subFeature: {} } as objType
);

const elementName = {
  element: {
    section: '구역',
    labelText: '라벨 > 텍스트',
    labelIcon: '라벨 > 아이콘',
  },
  subElement: {
    fill: '채우기',
    stroke: '테두리',
  },
  style: {
    visibility: '가시성',
    color: '색상',
    weight: '굵기',
    lightness: '채도',
    saturation: '밝기',
    isChanged: '',
  },
};

function History({
  isHistoryOpen,
  comparisonButtonClickHandler,
}: HistoryProps): ReactElement {
  const { log, currentIdx } = useSelector<RootState>(
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
          .map((item, idx) => (
            <HistoryItem
              key={item.id}
              isCurrent={currentIdx === idx}
              onClick={() => comparisonButtonClickHandler(item.id as string)}
            >
              <p>
                {`${featureName.feature[item.feature]} > ${
                  featureName.subFeature[item.feature][item.subFeature]
                } > ${elementName.element[item.element]} > ${
                  elementName.subElement[item.subElement]
                }`}
              </p>
              <p>
                {`${elementName.style[item.changedKey]} ${
                  item.changedValue
                }로 변경`}
              </p>
            </HistoryItem>
          ))
          .reverse()}
      </HistoryList>
    </HistoryWapper>
  );
}

export default History;
