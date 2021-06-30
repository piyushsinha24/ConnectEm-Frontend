import React, { useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { userEvents, toggleEvent } from '../../services/eventService';
import calendar from '../../assets/icons/calendar.svg';
import refresh from '../../assets/icons/refresh.svg';
import { formatDate, formatTime } from '../../utility/helpers';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState('');
  const [apiError, setApiError] = useState('');
  const [isToggling, setIsToggling] = useState(false);
  const notify = () => toast('Event link copied!');

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await userEvents();
      if (error) {
        const errorMessage =
          error?.response?.data?.message || 'Something went wrong!';

        throw new Error(errorMessage);
      }
      if (Object.keys(data.data).length) {
        setIsEvent(true);
        setEvents(data.data);
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggle = async (e) => {
    setCurrentEvent(e.id);
    setIsToggling(true);
    try {
      const { data, error } = await toggleEvent(e.id);
      if (error) {
        const errorMessage =
          error?.response?.data?.message || 'Something went wrong!';

        throw new Error(errorMessage);
      }
      if (data.success) {
        const index = events.findIndex((e) => e.id === data.data.id);
        events[index] = data.data;
        setEvents(events);
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsToggling(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const eventCard = (e, index) => (
    <div
      key={index}
      className="border border-light-grey font-work shadow-card rounded-md p-16 mb-16 w-full md:w-300"
    >
      <div className="h-full">
        <div className="flex flex-col py-4 h-full w-full">
          <Link to={`/event/${e.id}`}>
            <div className="flex flex-row-reverse mb-4">
              <p
                className={`text-12 font-bold ${
                  e.isActive ? 'text-primary-default' : 'text-red-default'
                }`}
              >
                {e.isActive ? 'Public' : 'Closed'}
              </p>
            </div>
            <div className="text-24 font-epilogue font-bold truncate rounded-4">
              {e.title}
            </div>
            <div className="truncate mb-16">{e.description}</div>
            <div className="my-4 text-16">
              <img
                className="inline-block w-16 h-16 m-4"
                src={calendar}
                alt="calendar-icon"
              ></img>
              {formatDate(e.timings[0].date)}
              <p className="text-16">
                {formatTime(e.timings[0].slots[0].from)} -{' '}
                {formatTime(e.timings[0].slots[0].to)}
              </p>
              <p className="text-16">
                Slots available: {e.timings[0].slots[0].available ?? 0}
              </p>
            </div>
            {e.timings.length > 1 ? (
              <p className="mb-8">+{e.timings.length - 1} more</p>
            ) : (
              <p className="invisible">No more dates</p>
            )}
          </Link>
          <div className="flex justify-between">
            {e.isActive && (
              <Button
                displayType="error"
                size="sm"
                onClick={() => handleToggle(e)}
                className="cursor-pointer"
              >
                {isToggling && currentEvent === e.id ? (
                  <img
                    className="animate-spin inline-block w-16 h-16 m-4"
                    src={refresh}
                    alt="refresh-icon"
                  ></img>
                ) : (
                  'Close event'
                )}
              </Button>
            )}
            {!e.isActive && (
              <Button
                displayType="primary"
                size="sm"
                onClick={() => handleToggle(e)}
              >
                {isToggling && currentEvent === e.id ? (
                  <img
                    className="animate-spin inline-block w-16 h-16 m-4"
                    src={refresh}
                    alt="refresh-icon"
                  ></img>
                ) : (
                  'Make Public'
                )}
              </Button>
            )}
            <CopyToClipboard
              onCopy={notify}
              text={`${process.env.REACT_APP_FRONTEND_API_URL}/book/${e.id}`}
            >
              <Button displayType="secondary" size="sm">
                Copy Event Link
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );

  const loadingCard = () => (
    <div className="border border-light-grey bg-light-default font-work shadow-card rounded-md p-16 h-auto w-full md:w-300">
      <div className="animate-pulse h-full">
        <div className="flex flex-col py-4 justify-center h-full w-full">
          <div className="my-8 h-32 bg-light-grey rounded w-1/2"></div>
          <div className="my-8 h-16 bg-light-grey rounded w-full"></div>
          <div className="my-8 h-16 bg-light-grey rounded w-full"></div>
          <div className="my-8 h-16 bg-light-grey rounded w-full"></div>
          <div className="my-16 h-48 bg-light-grey rounded w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      <Container>
        <div className="px-16 py-24 mt-56 xl:px-48 xl:py-36 xl:mt-72">
          <div className="flex justify-between items-center">
            <p className="font-work  font-bold text-16 xl:text-21">
              Welcome {user?.firstName},
            </p>
            <Link to="/create">
              <Button displayType="primary" type="submit">
                + Create
              </Button>
            </Link>
          </div>
          <div className="flex flex-col xl:flex-row flex-wrap justify-center items-center xl:justify-center xl:items-start my-16 xl:space-x-36 ">
            {isLoading && loadingCard()}
            {isEvent && events.map((e, index) => eventCard(e, index))}
          </div>
          {!isEvent && !isLoading && (
            <div className="flex justify-center items-center">
              No events created.
            </div>
          )}
          {apiError && <Alert displayType="danger">{apiError}</Alert>}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
