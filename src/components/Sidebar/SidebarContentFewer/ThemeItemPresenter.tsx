import React from 'react';
import styled from '../../../utils/styles/styled';

interface ImageProp {
  src: string;
}

interface CheckedProp {
  checked: boolean;
}

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
`;

const Image = styled.div<ImageProp>`
  background-image: url('${(props) => props.src}');
  background-size: cover;
  width: 25%;
  height: 50px;
`;

const Name = styled.span<CheckedProp>`
  width: 55%;
  font-size: 1.5rem;
  color: ${(props) => (props.checked ? props.theme.GREEN : props.theme.GREY)};
`;

const Checkbox = styled.div<CheckedProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.checked ? props.theme.GREEN : 'lightgray'};
`;

const Circle = styled.div<CheckedProp>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.checked ? 'white' : 'lightgray')};
`;

interface ThemeItemPresenterProps {
  data: {
    src: string;
    name: string;
  };
  checked: boolean;
  clickHandler: () => void;
}

function ThemeItemPresenter({
  data,
  checked,
  clickHandler,
}: ThemeItemPresenterProps): React.ReactElement {
  return (
    <Item onClick={clickHandler}>
      <Image src={data.src} />
      <Name checked={checked}>{data.name}</Name>
      <Checkbox checked={checked}>
        <Circle checked={checked} />
      </Checkbox>
    </Item>
  );
}

export default ThemeItemPresenter;
