'use client';

import { useState, type ChangeEvent } from 'react';

type UseCharacterLimitProps = {
  maxLength?: number;
  minLength?: number;
  initialValue?: string;
};

export function useCharacterLimit({
  maxLength,
  minLength,
  initialValue = '',
}: UseCharacterLimitProps) {
  const [value, setValue] = useState<string>(initialValue);
  const [characterCount, setCharacterCount] = useState<number>(
    initialValue.length
  );
  const max =
    maxLength !== undefined
      ? maxLength
      : minLength !== undefined
        ? minLength
        : 0;
  const [rest, setRest] = useState<number>(max);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    const newLength = newValue.length;

    if (maxLength !== undefined && newLength > maxLength) {
      return;
    }

    if (maxLength !== undefined && maxLength >= newLength) {
      setRest(maxLength - newLength);
    }

    if (
      maxLength == undefined &&
      minLength !== undefined &&
      minLength >= newLength
    ) {
      setRest(minLength - newLength);
    }

    setValue(newValue);
    setCharacterCount(newLength);
  };

  return {
    value,
    characterCount,
    rest,
    handleChange,
    maxLength,
    minLength,
  };
}
