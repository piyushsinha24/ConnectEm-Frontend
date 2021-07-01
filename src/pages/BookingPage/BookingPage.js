import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import Container from '../../components/common/Container';
import useEventDetails from '../../hooks/useEventDetails';
import {
  formatDateToFullStr,
  formatDateToTimeStr,
  getUserTimeZone,
} from '../../utility/helpers';
import 'react-responsive-modal/styles.css';
import Input from '../../components/common/Input';
import { bookingSchema, validate } from '../../utility/validation';
import { bookEvent } from '../../services/bookingService';

const BookingPage = () => {
  const { eventId } = useParams();
  const { eventDetails, apiError, isLoading, reloadEventDetails } = useEventDetails({
    eventId,
  });

  const hostName = `${eventDetails?.host?.firstName} ${eventDetails?.host?.lastName}`;
  const isEventOpen = eventDetails?.isActive;

  return (
    <div>
      <Container>
        <div className="font-work px-16 py-24 mt-56 xl:px-48 xl:py-36 xl:mt-72">
          <div className="mx-auto rounded-4 xl:p-24 xl:w-900 xl:shadow-card">
            {isLoading ? (
              <Alert displayType="info" className="text-center">
                Loading...
              </Alert>
            ) : apiError ? (
              <p className="text-center font-bold font-work">{apiError}</p>
            ) : (
              <div>
                <div>
                  <h2 className="font-bold text-24 font-epilogue">
                    {eventDetails?.title}
                  </h2>
                  <p className="font-work">{eventDetails?.description}</p>
                </div>
                <p className="font-work mt-8 mb-16 text-right xl:mb-24">
                  Created by <span className="font-bold">{`${hostName}(Host)`}</span>
                </p>
                {!isEventOpen && (
                  <Alert displayType="danger" className="mb-16">
                    This event has been closed by the host.
                  </Alert>
                )}
                <div>
                  <div className="space-y-12 xl:space-y-16">
                    {eventDetails?.timings?.map((timing, index) => {
                      return (
                        <BookingCard
                          timing={timing}
                          eventId={eventId}
                          isEventOpen={isEventOpen}
                          reloadEventDetails={reloadEventDetails}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const BookingCard = ({ timing, eventId, isEventOpen, reloadEventDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const currentDate = timing?.date;
  const currentDateId = timing?.id;
  const slots = timing?.slots;
  const slotId = slots?.[0]?.id;
  const startTime = slots?.[0]?.from;
  const endTime = slots?.[0]?.to;
  const availableSlots = slots?.[0]?.available;
  const canBookSlot = availableSlots > 0 && isEventOpen;

  const onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setApiError('');
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const onFormSubmit = async () => {
    setApiError('');

    try {
      const isValid = await validate({ schema: bookingSchema, formData, setErrors });
      if (!isValid) {
        return;
      }

      const formDataObj = {
        ...formData,
        eventID: eventId,
        dateID: currentDateId,
        slotID: slotId,
        timezone: getUserTimeZone(),
      };

      setIsLoading(true);
      const { error } = await bookEvent(formDataObj);

      if (error) {
        const errorMessage =
          error?.response?.data?.message || 'Something went wrong!';

        throw new Error(errorMessage);
      }

      setBookingSuccess(true);
      setTimeout(() => {
        reloadEventDetails();
      }, 2000);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-work border-1 p-16 border-light-grey rounded-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-work text-16 font-bold xl:mb-8 xl:mr-56 xl:text-21">
            {formatDateToFullStr(currentDate)}
          </p>
          <div className="mt-4">
            <p className="font-work text-12 mt-8 xl:mt-0 xl:text-16 font-bold">
              Available timing:
            </p>
            <div className="flex items-center">
              <div className="mr-8">{formatDateToTimeStr(startTime)}</div>
              <p>-</p>
              <div className="ml-8">{formatDateToTimeStr(endTime)}</div>
            </div>
            <p>{`${getUserTimeZone()}, Slots: ${availableSlots}`}</p>
          </div>
        </div>
        <div className="flex">
          {canBookSlot ? (
            <Button
              displayType="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Book Slot
            </Button>
          ) : (
            <Button displayType="error" size="sm" onClick={() => {}}>
              Closed
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        animationDuration={0}
        closeOnEsc={true}
        classNames={{
          modal: 'rounded-4 xl:w-400',
        }}
      >
        <div className="p-16">
          <Input
            label="Name *"
            type="text"
            name="name"
            placeholder="Name"
            onChange={onInputChange}
            error={errors['name']}
            className="mb-16"
          />
          <Input
            label="Email *"
            type="email"
            name="email"
            placeholder="Email"
            onChange={onInputChange}
            error={errors['email']}
          />
          <div className="mt-16">
            {isLoading && (
              <Alert displayType="info">Reserving a slot, please wait...</Alert>
            )}
            {apiError && <Alert displayType="danger">{apiError}</Alert>}
            {bookingSuccess && <Alert displayType="success">Booking success!</Alert>}
          </div>
          <div className="mt-16">
            <Button displayType="primary" onClick={onFormSubmit}>
              Book a slot
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;
