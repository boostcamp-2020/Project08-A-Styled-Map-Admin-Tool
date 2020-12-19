// Dependencies
import { useState, useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { initMarker, MarkerInstanceType } from '../../store/marker/action';

// Hook
import useMarkerRegister from '../map/useMarkerRegister';
import useWholeStyle from '../common/useWholeStyle';

// Utils
import {
  initMarkerInstances,
  setMarkersToLocalStorage,
} from '../../utils/updateMarkerStorage';
import validateStyle from '../../utils/validateStyle';

// Type
import { ReplaceType } from '../../store/common/type';

export interface useModalStatusProps {
  importModalToggleHandler: () => void;
}

export interface useModalStatusType {
  inputStatus: boolean;
  onClickClose: () => void;
  onClickOK: (inputText: string) => void;
}

const Delay = 2000;

function useModalStatus({
  importModalToggleHandler,
}: useModalStatusProps): useModalStatusType {
  const [inputStatus, setInputStatus] = useState(true);
  const { flag: isImporting, changeStyle } = useWholeStyle();
  const { marker, addInstanceToMap } = useMarkerRegister();
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputStatus) return;
    const timer = setTimeout(() => {
      setInputStatus(true);
    }, Delay);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [inputStatus]);

  useEffect(() => {
    if (!isImporting) return;
    importModalToggleHandler();
  }, [isImporting]);

  const onClickClose = () => {
    if (!isImporting) importModalToggleHandler();
  };

  const onClickOK = (inputText: string) => {
    try {
      if (!inputStatus) return;
      const { markers: importedMarker, ...input } = JSON.parse(inputText);
      if (
        importedMarker &&
        (!Array.isArray(importedMarker) || importedMarker.length > 30)
      )
        throw new Error('InvalidStyle');
      if (!validateStyle(input)) throw new Error('InvalidStyle');

      changeStyle(input, { changedKey: ReplaceType.import });
      marker.forEach(({ instance }) => {
        if (instance) instance.remove();
      });

      const newMarkers = initMarkerInstances(importedMarker);
      dispatch(initMarker(newMarkers));

      const updateStorage: MarkerInstanceType[] = [];
      newMarkers.forEach(({ id, text, lng, lat, instance }) => {
        if (instance) addInstanceToMap({ id, text, instance });
        updateStorage.push({ id, text, lng, lat });
      });
      setMarkersToLocalStorage(updateStorage);
    } catch {
      setInputStatus(false);
    }
  };

  return {
    inputStatus,
    onClickClose,
    onClickOK,
  };
}

export default useModalStatus;
