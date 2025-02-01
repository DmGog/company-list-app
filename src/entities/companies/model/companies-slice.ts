import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export type Location = {
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

type CompaniesState = {
  companies: Company[];
  isEditingGlobal: boolean;
};

const initialState: CompaniesState = {
  companies: [
    {
      id: v4(),
      name: 'Компания A',
      address: { country: 'Россия', city: 'Москва', street: 'Тверская', houseNumber: '20A' },
      selected: false,
    },
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
  ],
  isEditingGlobal: false,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialState,
  reducers: {
    addCompany(state, action: PayloadAction<Company>) {
      state.companies.unshift(action.payload);
    },
    toggleSelectCompany: (state, action: PayloadAction<string>) => {
      const company = state.companies.find(c => c.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      state.companies.forEach(company => {
        company.selected = action.payload;
      });
    },
    deleteCompanies: (state, action: PayloadAction<string[]>) => {
      state.companies = state.companies.filter(company => !action.payload.includes(company.id));
    },
    updateCompany: (state, action: PayloadAction<{ id: string; name: string; address: Location }>) => {
      const company = state.companies.find(c => c.id === action.payload.id);
      if (company) {
        company.name = action.payload.name;
        company.address = action.payload.address;
      }
    },
    toggleEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditingGlobal = action.payload;
    },
  },
});
export const { toggleSelectCompany, toggleSelectAll, deleteCompanies, updateCompany, toggleEditing, addCompany } = companiesSlice.actions;
