import React from 'react';
import styled from '../../../utils/styles/styled';
import DetailTypeContainer from './DetailTypeContainer';

interface WrapperProps {
  isFeatureName: string;
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

const FeatureList = styled.li`
  width: 100%;
  display: flex;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 10px 0;
  color: ${(props) => props.theme.GREY};
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

const data = [
  { key: 'poi', name: 'POI' },
  { key: 'road', name: '도로' },
  { key: 'building', name: '건물' },
  { key: 'terrain', name: '지형' },
  { key: 'housing', name: '단지' },
  { key: 'contour', name: '등고' },
  { key: 'transit', name: '교통' },
  { key: 'water', name: '수계' },
];

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
