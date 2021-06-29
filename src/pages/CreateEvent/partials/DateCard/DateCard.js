import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../../components/common/Button';
import Input from '../../../../components/common/Input';
import { getTimeInfoList } from '../../../../utility/helpers';
import { slotSchema, validate } from '../../../../utility/validation';

const DateCard = ({ date, deleteDate, updateTimeSlotList }) => {
  const [startTime, setStartTime] = useState('0000');
  const [endTime, setEndTime] = useState('0000');

  const [errors, setErrors] = useState({ available: 'This field is required' });

  const timeSlotList = useMemo(() => getTimeInfoList(), []);

  const onSlotChange = async (e) => {
    const isSlotValid = !!date.isSlotValid;

    const isValid = await validate({
      schema: slotSchema,
      formData: { available: e.target.value },
      setErrors,
    });

    if (isValid) {
      date.availableSlot = e.target.value;

      if (!isSlotValid) {
        date.isSlotValid = true;
      }
    } else {
      if (isSlotValid) {
        date.isSlotValid = false;
      }
    }
  };

  const renderSelectList = (value, setFunc) => {
    return (
      <select
        className="rounded-4 border-1 border-light-grey px-4 py-8 xl:px-8 xl:py-8"
        onChange={(e) => setFunc(e.target.value)}
      >
        {timeSlotList.map((timeSlotList, index) => {
          return (
            <option
              key={index}
              defaultValue={value}
              value={timeSlotList.id}
            >{`${timeSlotList.hours} : ${timeSlotList.minutes}`}</option>
          );
        })}
      </select>
    );
  };

  useEffect(() => {
    const startTimeObj = timeSlotList.find((timeSlot) => timeSlot.id === startTime);
    const endTimeObj = timeSlotList.find((timeSlot) => timeSlot.id === endTime);
    updateTimeSlotList(date.id, startTimeObj, endTimeObj);
  }, [date, startTime, endTime, updateTimeSlotList, timeSlotList]);

  return (
    <div
      className="font-work border-1 p-16 border-light-grey rounded-4"
      key={date.id}
    >
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-work text-16 font-bold xl:mb-8 xl:mr-56 xl:text-21">
            {date.format('dddd, DD/MM/YYYY')}
          </p>
          <div className="mt-4">
            <p className="font-work text-12 xl:text-16">
              What hours are you available?
            </p>
            <div className="flex items-center mt-8">
              <div className="mr-8 xl:mr-12">
                {renderSelectList(startTime, setStartTime)}
              </div>
              <p>-</p>
              <div className="ml-8 xl:ml-12">
                {renderSelectList(endTime, setEndTime)}
              </div>
            </div>
            <Input
              label="Available Slots *"
              type="number"
              name="available"
              placeholder="Available slots"
              onChange={onSlotChange}
              error={errors['available']}
              className="mt-8"
            />
          </div>
        </div>
        <div className="flex">
          <Button
            displayType="secondary"
            size="sm"
            onClick={() => deleteDate(date.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
