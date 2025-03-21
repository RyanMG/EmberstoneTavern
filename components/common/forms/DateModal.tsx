import { useState, useRef } from "react";
import dayjs from 'dayjs';

import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { TextInput } from 'react-native';

import FakeInput from "@components/common/forms/FakeInput";
import ModalWrapper from "@components/common/ModalWrapper";
import { formatDateForDisplay } from "@utils/dateUtils";

interface DateModalProps {
  title: string;
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
}

export default function DateModal({ title, selectedDate, setSelectedDate }: DateModalProps) {
  const defaultStyles = useDefaultStyles();

  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <>
      <FakeInput
        label="Game Date"
        value={formatDateForDisplay(selectedDate)}
        inputRef={inputRef}
        onFocus={() => {
          setShowDateModal(true)
          inputRef.current?.blur();
        }}
      />
      <ModalWrapper
        title={title}
        visible={showDateModal}
        closeModal={() => {
          setShowDateModal(false);
        }}
      >
        <DateTimePicker
          mode="single"
          date={selectedDate}
          onChange={({ date }) => {
            if (!date) return;
            if (date instanceof dayjs.Dayjs) {
              setSelectedDate(date);
            } else {
              setSelectedDate(dayjs(date));
            }
            setShowDateModal(false);
          }}
          styles={defaultStyles}
        />
      </ModalWrapper>
    </>
  );
}
