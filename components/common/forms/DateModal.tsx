import { useState, useRef } from "react";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { TextInput } from 'react-native';

import FakeInput from "@components/common/forms/FakeInput";
import ModalWrapper from "@components/common/ModalWrapper";

interface DateModalProps {
  title: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function DateModal({ title, selectedDate, setSelectedDate }: DateModalProps) {
  const defaultStyles = useDefaultStyles();

  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <>
      <FakeInput
        label="Game Date"
        value={selectedDate.toISOString()}
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
            if (date instanceof Date) {
              setSelectedDate(date);
            } else {
              // @ts-ignore
              setSelectedDate(new Date(date));
            }
            setShowDateModal(false);
          }}
          styles={defaultStyles}
        />
      </ModalWrapper>
    </>
  );
}
