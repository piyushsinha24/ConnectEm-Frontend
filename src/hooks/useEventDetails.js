import { useCallback, useEffect, useState } from 'react';
import { getEventDetails } from '../services/eventService';

const useEventDetails = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const fetchEventDetails = useCallback(async () => {
    setApiError('');
    try {
      setIsLoading(true);
      const { data, error } = await getEventDetails({ id: eventId });

      if (error) {
        const errorMessage =
          error?.response?.data?.message || 'Something went wrong!';

        throw new Error(errorMessage);
      }

      setEventDetails(data.data);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  const reloadEventDetails = () => {
    fetchEventDetails();
  };

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  return {
    isLoading,
    eventDetails,
    apiError,
    reloadEventDetails,
  };
};

export default useEventDetails;
