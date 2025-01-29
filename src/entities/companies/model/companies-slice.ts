import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

type Location = {
  country: string;
  city: string;
};

type Company = {
  id: string;
  name: string;
  address: Location;
  selected: boolean;
};

const initialState: Company[] = [
  { id: v4(), name: 'Компания A', address: { country: 'Россия', city: 'Москва' }, selected: false },
  { id: v4(), name: 'Компания B', address: { country: 'Беларуссия', city: 'Минск' }, selected: false },
  { id: v4(), name: 'Компания C', address: { country: 'Казахстан', city: 'Астана' }, selected: false },
];

export const companiesSlice = createSlice({
  name: 'company',
  initialState: initialState,
  reducers: {},
});
