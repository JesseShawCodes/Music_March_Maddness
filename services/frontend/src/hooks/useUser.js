import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (userSet) => {
      setUser(userSet);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, isLoading };
};

export default useUser;
