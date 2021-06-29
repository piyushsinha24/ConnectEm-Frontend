import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import { Event, toggleEvent } from '../../services/eventService';
import { formatDate, formatTime } from '../../utility/helpers';
import refresh from '../../assets/icons/refresh.svg';
import copy from '../../assets/icons/copy.svg';

const EventInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [event, setEvent] = useState({});
  const [apiError, setApiError] = useState('');
  const [isToggling, setIsToggling] = useState(false);
  const notify = () => toast('Event link copied!');
  let { id } = props.match.params;

  useEffect(() => {
    const fetchEvent = async () => {
      if (apiError) setApiError('');
      setIsLoading(true);
      try {
        const { data, error } = await Event(id);
        if (error) {
          const errorMessage =
            error?.response?.data?.message || 'Something went wrong!';

          throw new Error(errorMessage);
        }
        if (Object.keys(data.data).length) {
          setIsEvent(true);
          setEvent(data.data);
        }
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [apiError, id]);

  const handleToggle = async (e) => {
    setIsToggling(true);
    try {
      const { data, error } = await toggleEvent(e.id);
      if (error) {
        const errorMessage =
          error?.response?.data?.message || 'Something went wrong!';

        throw new Error(errorMessage);
      }
      if (data.success) {
        setEvent(data.data);
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsToggling(false);
    }
  };

  const loadingCard = () => (
    <div className="animate-pulse flex flex-col xl:flex-row font-work">
      <div className="mb-36 xl:mb-0 xl:mr-36 w-full xl:w-1/3">
        <div className="bg-light-default space-y-12 xl:rounded-4 xl:shadow-card p-24">
          <div className="my-8 h-32 bg-light-grey rounded w-full"></div>
          <div className="my-8 h-16 bg-light-grey rounded w-full"></div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full rounded-4 bg-light-default space-y-12 xl:shadow-card p-24">
          <div className="text-24 border-1 p-16 border-light-grey rounded-4">
            <div className="my-8 h-16 bg-light-grey rounded w-full"></div>
            <div className="text-16">
              <div className="my-8 h-16 bg-light-grey rounded w-1/2"></div>
            </div>
          </div>
          <div className="text-24 border-1 p-16 border-light-grey rounded-4">
            <div className="my-8 h-16 bg-light-grey rounded w-full"></div>
            <div className="text-16">
              <div className="my-8 h-16 bg-light-grey rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-light-grey w-full min-h-screen text-dark-default">
      <Container>
        <div className="px-16 py-24 mt-56 xl:px-48 xl:py-36 xl:mt-72">
          {isLoading && loadingCard()}
          {isEvent && (
            <div className="flex flex-col xl:flex-row font-work">
              <div className="mb-36 xl:mb-0 xl:mr-36 w-full xl:w-1/3">
                <div className="bg-light-default p-24 space-y-12 xl:rounded-4 xl:shadow-card xl:p-24">
                  <div className="text-24 border-1 p-16 border-light-grey rounded-4">
                    {event?.title?.charAt(0).toUpperCase() + event?.title?.slice(1)}
                  </div>
                  <div className="text-21">{event.description}</div>
                  <div className="flex justify-between">
                    {event.isActive && (
                      <div className="mt-16 w-2/3">
                        <Button
                          displayType="primary"
                          className="w-full"
                          onClick={() => handleToggle(event)}
                        >
                          {isToggling && (
                            <img
                              className="animate-spin inline-block w-16 h-16 m-4"
                              src={refresh}
                              alt="refresh-icon"
                            ></img>
                          )}
                          Turn Off
                        </Button>
                      </div>
                    )}
                    {!event.isActive && (
                      <div className="mt-16 w-2/3">
                        <Button
                          displayType="secondary"
                          className="w-full"
                          onClick={() => handleToggle(event)}
                        >
                          {isToggling && (
                            <img
                              className="animate-spin inline-block w-16 h-16 m-4"
                              src={refresh}
                              alt="refresh-icon"
                            ></img>
                          )}
                          Turn On
                        </Button>
                      </div>
                    )}
                    <CopyToClipboard
                      onCopy={notify}
                      text={`${process.env.REACT_APP_FRONTEND_API_URL}/book/${event.id}`}
                    >
                      <div className="mt-16">
                        <Button displayType="secondary" size="md">
                          <img
                            className="inline-block w-24 h-24 m-4"
                            src={copy}
                            alt="copy-icon"
                          ></img>
                        </Button>
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full rounded-4 bg-light-default space-y-12 xl:shadow-card p-24">
                  {event?.timings?.map((t, index) => (
                    <div
                      key={index}
                      className="text-24 border-1 p-16 border-light-grey rounded-4"
                    >
                      {formatDate(t.date)}
                      <div className="text-16">
                        {formatTime(t.slots[0].from)} - {formatTime(t.slots[0].to)}
                      </div>
                      <p className="text-16">
                        Slots available: {t.slots[0].available ?? '0'}
                      </p>
                      <p className="text-16">
                        Attendees:{' '}
                        {Array.isArray(t.slots[0].name) && t.slots[0].name.length
                          ? t.slots[0].name.join(', ')
                          : '0'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Container>
    </div>
  );
};

export default EventInfo;
