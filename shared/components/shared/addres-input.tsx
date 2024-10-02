'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="17cb4bd21117e29253b04cc408e6c9c0c7431e6f"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};