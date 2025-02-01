import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { companiesData } from '../mock-data-companies';

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
  companies: companiesData,
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
