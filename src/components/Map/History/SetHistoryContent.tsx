import React from 'react';
import styled from '../../../utils/styles/styled';
import { HistorySetLogType } from '../../../store/common/type';
import { featureName, elementName } from '../../../utils/getTypeName';

const Content = styled.div`
  padding: 2px;
  position: relative;
`;

interface SetHistoryContentProps {
  item: HistorySetLogType;
}

function SetHistoryContent({
  item,
}: SetHistoryContentProps): React.ReactElement {
  return (
    <Content>
      {`${featureName.feature[item.feature]} > ${
        featureName.subFeature[item.feature][item.subFeature]
      } > ${elementName.element[item.element]} > ${
        item.subElement ? elementName.subElement[item.subElement] : ''
      }`}
      {`> ${elementName.style[item.changedKey]} 
        ${item.changedValue}로 변경`}
    </Content>
  );
}

export default SetHistoryContent;
