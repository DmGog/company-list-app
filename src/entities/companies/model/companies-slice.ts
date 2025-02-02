import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { companiesData } from '../mock-data-companies';
import { CompaniesState, Company, Location } from './types';

const initialState: CompaniesState = {
  companies: companiesData,
  displayedCompanies: companiesData.slice(0, 15),
  page: 1,
  isEditingGlobal: false,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialState,
  reducers: {
    addCompany(state, action: PayloadAction<Company>) {
      state.companies.push(action.payload);
      state.displayedCompanies = state.companies.slice(0, state.page * 15);
    },
    toggleSelectCompany(state, action: PayloadAction<string>) {
      const company = state.displayedCompanies.find(c => c.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleSelectAll(state, action: PayloadAction<boolean>) {
      state.displayedCompanies.forEach(company => {
        company.selected = action.payload;
      });
    },
    deleteCompanies(state, action: PayloadAction<string[]>) {
      state.companies = state.companies.filter(company => !action.payload.includes(company.id));
      state.displayedCompanies = state.displayedCompanies.filter(company => !action.payload.includes(company.id));
      if (state.displayedCompanies.length < 15) {
        state.displayedCompanies = state.companies;
      }
    },
    updateCompany(state, action: PayloadAction<{ id: string; name: string; address: Location }>) {
      const company = state.companies.find(c => c.id === action.payload.id);
      if (company) {
        company.name = action.payload.name;
        company.address = action.payload.address;
      }
      const displayedCompany = state.displayedCompanies.find(c => c.id === action.payload.id);
      if (displayedCompany) {
        displayedCompany.name = action.payload.name;
        displayedCompany.address = action.payload.address;
      }
    },
    loadMoreCompanies(state) {
      const nextPage = state.page + 1;
      const newCompanies = state.companies.slice(0, nextPage * 15);

      const selectedIds = new Set(state.displayedCompanies.filter(c => c.selected).map(c => c.id));

      newCompanies.forEach(company => {
        if (selectedIds.has(company.id)) {
          company.selected = true;
        }
      });

      if (newCompanies.length > state.displayedCompanies.length) {
        state.displayedCompanies = newCompanies;
        state.page = nextPage;
      }
    },
    toggleEditing(state, action: PayloadAction<boolean>) {
      state.isEditingGlobal = action.payload;
    },
  },
});

export const { toggleSelectCompany, toggleSelectAll, deleteCompanies, updateCompany, toggleEditing, addCompany, loadMoreCompanies } =
  companiesSlice.actions;
