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

export type CompaniesState = {
  companies: Company[];
  displayedCompanies: Company[];
  page: number;
  isEditingGlobal: boolean;
};
