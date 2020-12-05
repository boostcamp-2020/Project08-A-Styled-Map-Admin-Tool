import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface StoreDataType {
  map?: mapboxgl.Map;
}

interface UseExportStyleType {
  exportStyle: () => string;
}

function useExportStyle(): UseExportStyleType {
  const data: StoreDataType = useSelector<RootState>(
    (state) => state
  ) as StoreDataType;

  const exportStyle = (): string => {
    if ('map' in data) {
      const { map, ...style } = data;
      const stringifiedStyle = JSON.stringify(style);
      return stringifiedStyle;
    }

    return '';
  };

  return { exportStyle };
}

export default useExportStyle;
