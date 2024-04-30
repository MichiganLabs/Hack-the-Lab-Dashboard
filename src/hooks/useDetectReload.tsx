import { useEffect, useState } from 'react';

const initBeforeUnLoad = (didReload: boolean) => {
  window.onbeforeunload = (event) => {
    if (didReload) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = '';
      }
    }
    return '';
  };
};

export default function useDetectReload(bool: boolean) {
  const [didReload, setDidReload] = useState(bool);

  window.onload = () => {
    initBeforeUnLoad(didReload);
  };

  useEffect(() => {
    initBeforeUnLoad(didReload);
  }, [didReload]);

  return [didReload, setDidReload];
}
