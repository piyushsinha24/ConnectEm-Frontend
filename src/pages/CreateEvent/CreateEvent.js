import React, { useCallback, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import Container from '../../components/common/Container';
import DateCard from './partials/DateCard';
import { getTomorrowsDate } from '../../utility/helpers';
import { eventCreationSchema, validate } from '../../utility/validation';
import { createEvent } from '../../services/eventService';
import { useHistory } from 'react-router-dom';

const CreateEvent = () => {
  const history = useHistory();

  const [dates, setDates] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventLink: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [calendarError, setCalendarError] = useState(false);
  const [apiError, setApiError] = useState('');
  const [eventCreationSuccess, setEventCreationSuccess] = useState(false);

  const onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setApiError('');
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleChange = (dateArr) => {
    const dateArrWithId = dateArr.map((date) => {
      date.id = date.format('dddd, DD/MM/YYYY');
      return date;
    });
    setDates(dateArrWithId);
  };

  const updateTimeSlotList = useCallback(
    (id, startTime, endTime) => {
      const selectedDate = dates.find((date) => date.id === id);
      selectedDate.timeSlot = {
        startTime,
        endTime,
      };
      setCalendarError(false);
    },
    [dates]
  );

  const deleteDate = (id) => {
    const filteredDateArr = dates.filter((date) => date.id !== id);
    setDates(filteredDateArr);
  };

  const formatData = (formData, dates) => {
    const timings = dates.map((date) => {
      date.set({ hour: 0, minute: 0, second: 0 });
      const dateJSObject = date.toDate();
      const startDateObject = new DateObject(dateJSObject);
      const endDateObject = new DateObject(dateJSObject);

      const startHour = parseInt(date.timeSlot.startTime.hours);
      const startMinute = parseInt(date.timeSlot.startTime.minutes);

      const endHour = parseInt(date.timeSlot.endTime.hours);
      const endMinute = parseInt(date.timeSlot.endTime.minutes);

      startDateObject.add(startHour, 'h').add(startMinute, 'm');

      endDateObject.add(endHour, 'h').add(endMinute, 'm');

      const startDateJSObject = startDateObject.toDate();
      const endDateJSObject = endDateObject.toDate();

      return {
        date: dateJSObject.toUTCString(),
        slots: [
          {
            from: startDateJSObject.toUTCString(),
            to: endDateJSObject.toUTCString(),
          },
        ],
      };
    });

    return {
      ...formData,
      tags: [],
      timings,
    };
  };

  const onCreateEvent = async () => {
    setApiError('');

    try {
      const isValid = await validate({
        schema: eventCreationSchema,
        formData,
        setErrors,
      });

      if (!dates.length) {
        setCalendarError(true);
      }

      if (!isValid) {
        return;
      }

      setIsLoading(true);

      const formattedData = formatData(formData, dates);

      const { error } = await createEvent(formattedData);

      if (error) {
        const errorMessage =
          error?.response?.data?.message || 'Something went wrong!';

        throw new Error(errorMessage);
      }

      setEventCreationSuccess(true);
      setTimeout(() => {
        history.push('/dashboard');
      }, 800);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="px-16 py-24 mt-56 xl:px-48 xl:py-36 xl:mt-72">
          <div className="flex flex-row-reverse">
            <div className="flex flex-col items-end">
              <Button
                displayType="primary"
                onClick={onCreateEvent}
                className="w-max"
              >
                Create Event
              </Button>
              <div className="mt-16">
                {isLoading && (
                  <Alert displayType="info">Creating event, please wait...</Alert>
                )}
                {apiError && <Alert displayType="danger">{apiError}</Alert>}
                {eventCreationSuccess && (
                  <Alert displayType="success">
                    Event Created!, Redirecting to dashboard...
                  </Alert>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row">
            <div className="mb-36 xl:mb-0 xl:mr-36">
              <p className="font-epilogue font-bold mb-8 xl:mb-16 xl:w-400">
                1. Enter details:
              </p>
              <div className="py-0 px-0 space-y-12 xl:rounded-4 xl:shadow-card xl:p-24">
                <Input
                  label="Title *"
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={onInputChange}
                  error={errors['title']}
                />
                <Input
                  label="Description *"
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={onInputChange}
                  error={errors['description']}
                />
                <Input
                  label="Event Link *"
                  type="text"
                  name="eventLink"
                  placeholder="Event Link"
                  onChange={onInputChange}
                  error={errors['eventLink']}
                />
                <p className="font-work text-12 xl:text-16">
                  Create event on{' '}
                  <a
                    href="https://meet.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-default"
                  >
                    Google Meet
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-36 xl:mb-0 xl:mr-36">
              <p className="font-epilogue font-bold mb-8 xl:mb-16">
                2. Select date(s):
              </p>
              <Calendar
                sort
                multiple
                minDate={getTomorrowsDate()}
                value={dates}
                onChange={handleChange}
                className={`font-work shadow-card ${
                  calendarError ? 'border-1 border-red-default' : ''
                }`}
              />
              {calendarError && (
                <p className="text-12 text-red-default mt-8">
                  Select atleast one date to create an event
                </p>
              )}
            </div>
            <div className="w-full">
              <p className="font-epilogue font-bold mb-8 xl:mb-16">
                3. What hours are you available?
              </p>
              <div className="w-full rounded-4 bg-light-default py-0 px-0 space-y-12 xl:shadow-card xl:p-24">
                {!dates.length && (
                  <p className="font-work text-center">No date(s) are selected!</p>
                )}
                {dates?.map((date) => (
                  <DateCard
                    date={date}
                    key={date.id}
                    deleteDate={deleteDate}
                    updateTimeSlotList={updateTimeSlotList}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateEvent;
