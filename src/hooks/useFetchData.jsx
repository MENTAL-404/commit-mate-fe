import { useState, useEffect } from 'react';
import {
  AUTH_HEADER,
} from '../utils/static'


const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: AUTH_HEADER,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result.data.repos);
      } catch (err) {
        setData([]);
        console.error('Error fetching data:', err);
      } finally {
      }
    };

    fetchData();
  }, [url]);

  return { data};
};

export default useFetchData;
