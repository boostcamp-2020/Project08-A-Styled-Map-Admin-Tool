import React from 'react';
import styled from '../../../utils/styles/styled';
import {
  HistoryReplaceLogType,
  ReplaceType,
  DepthLogChangedValueType,
} from '../../../store/common/type';
import { featureName, replaceName } from '../../../utils/getTypeName';

const Content = styled.div`
  padding: 2px;
  position: relative;
`;

interface ReplaceHistoryContentProps {
  item: HistoryReplaceLogType;
}

function ReplaceHistoryContent({
  item,
}: ReplaceHistoryContentProps): React.ReactElement {
  let description = `${replaceName[item.changedKey]} `;

  if (item.changedValue) {
    if (item.changedKey === ReplaceType.depth) {
      const { feature, depth } = item.changedValue as DepthLogChangedValueType;
      description += `> ${featureName.feature[feature]} > ${depth}`;
    } else description += `> ${item.changedValue}`;
  }
  return <Content>{`${description} 실행`}</Content>;
}

export default ReplaceHistoryContent;
