import { RefObject, useRef } from 'react';

export interface MapHookType {
  containerRef: RefObject<HTMLDivElement>;
  afterMapRef: RefObject<HTMLDivElement>;
  beforeMapRef: RefObject<HTMLDivElement>;
}

function useMap(): MapHookType {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const afterMapRef = useRef<HTMLDivElement>(null);
  const beforeMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(initMap(afterMapRef));
  }, []);
 
  return {
    containerRef,
    afterMapRef,
    beforeMapRef,
  };
}

export default useMap;
