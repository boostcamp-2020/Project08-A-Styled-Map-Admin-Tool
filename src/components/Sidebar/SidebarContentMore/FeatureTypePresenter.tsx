import React from 'react';
import DetailTypeContainer from './DetailTypeContainer';
import styled from '../../../utils/styles/styled';
import data from '../../../utils/redering-data/featureTypeData';

interface WrapperProps {
  isFeatureName: string;
}
interface ListProps {
  isChecked: boolean;
}

const FeatureTypeWrapper = styled.ul<WrapperProps>`
  width: ${(props) => (props.isFeatureName ? '250px' : '370px')};
  padding: 20px;
`;

const FeatureTypeTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 20px;
`;

const FeatureList = styled.li<ListProps>`
  width: 100%;
  display: flex;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 10px 0;
  color: ${(props) => (props.isChecked ? props.theme.GREEN : props.theme.GREY)};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.BLACK};
  }
`;

const Marker = styled.span`
  color: ${(props) => props.theme.GREEN};
`;

const Pointer = styled.span`
  margin: 0 0 0 auto;
`;

interface FeatureTypePresenterProps {
  featureName: string;
  styledFeatureList: string[];
  featureClickHandler: (key: string) => void;
}

function FeatureTypePresenter({
  featureName,
  styledFeatureList,
  featureClickHandler,
}: FeatureTypePresenterProps): React.ReactElement {
  return (
    <>
      <FeatureTypeWrapper isFeatureName={featureName}>
        <FeatureTypeTitle>기능 유형</FeatureTypeTitle>
        {data.map(({ key, name }) => (
          <FeatureList
            key={key}
            isChecked={featureName === key}
            onClick={() => {
              featureClickHandler(key);
            }}
          >
            <Marker>{styledFeatureList.includes(key) ? '✓' : ' '}</Marker>
            {name}
            <Pointer>{'>'}</Pointer>
          </FeatureList>
        ))}
      </FeatureTypeWrapper>
      <DetailTypeContainer featureName={featureName} />
    </>
  );
}

export default FeatureTypePresenter;
