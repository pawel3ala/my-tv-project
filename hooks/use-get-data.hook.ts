import { useEffect, useState } from 'react';
import mockedData, { Item } from '@/assets/mockedData';

const DELAY_IN_MS = 1000;

const useGetData = () => {
  const [data, setData] = useState<Item[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getDataFromId = (id: Item['id']) => {
    return data?.find(item => item.id === id);
  };

  useEffect(() => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setData(mockedData.items);
      } else {
        setError(new Error('Error fetching data'));
        // TODO: send error to Sentry/Crashlitics
      }
      setLoading(false);
    }, DELAY_IN_MS);
  }, []);

  return { data, loading, error, getDataFromId };
};

export default useGetData;
