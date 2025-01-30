import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

type Location = {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
};

export type Company = {
  id: string;
  name: string;
  address: Location;
  selected: boolean;
};

const initialState: Company[] = [
  { id: v4(), name: 'Компания A', address: { country: 'Россия', city: 'Москва', street: 'Тверская', houseNumber: '20A' }, selected: false },
  {
    id: v4(),
    name: 'Компания B',
    address: { country: 'Беларусь', city: 'Минск', street: 'Московская', houseNumber: '10A' },
    selected: false,
  },
  {
    id: v4(),
    name: 'Компания C',
    address: { country: 'Казахстан', city: 'Астана', street: 'Любимова', houseNumber: '40A' },
    selected: false,
  },
];

export const companiesSlice = createSlice({
  name: 'company',
  initialState: initialState,
  reducers: {
    toggleSelectCompany: (state, action: PayloadAction<string>) => {
      const company = state.find(c => c.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      state.forEach(company => {
        company.selected = action.payload;
      });
    },
    deleteCompanies: (state, action: PayloadAction<string[]>) => {
      return state.filter(company => !action.payload.includes(company.id));
    },
    updateCompany: (state, action: PayloadAction<{ id: string; name: string; address: Location }>) => {
      const company = state.find(c => c.id === action.payload.id);
      if (company) {
        company.name = action.payload.name;
        company.address = action.payload.address;
      }
    },
  },
});
export const { toggleSelectCompany, toggleSelectAll, deleteCompanies, updateCompany } = companiesSlice.actions;
