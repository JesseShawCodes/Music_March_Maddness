import { useEffect, useRef } from "react";

export function usePollingTask(taskId, triggerStatus, data, clearInterval, setResults, interval = 2000) {
  const intervalRef = useRef(null);

  // Initiate Polling
  useEffect(() => {
    if (!taskId) return undefined;
    intervalRef.current = setInterval(() => {
      triggerStatus(taskId);
    }, interval);

    return () => {
      // "Clearing polling interval"
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [taskId, triggerStatus, interval]);

  // Clear polling on unmount or when taskId changes
  useEffect(() => {
    if (data?.status === 'SUCCESS') {
      setResults(data.result);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else if (data?.status === 'FAILURE') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [data])

  return intervalRef;
}
