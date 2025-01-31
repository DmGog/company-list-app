import { useState, useRef } from 'react';
import { useAppDispatch } from '@/app/store';

type FormState = Record<string, string>;

type FormField = {
  id: string;
  name: string;
  placeholder: string;
};
const formFields: FormField[] = [
  { id: '1', name: 'name', placeholder: 'Введите компанию' },
  { id: '2', name: 'country', placeholder: 'Введите страну' },
  { id: '3', name: 'city', placeholder: 'Введите город' },
  { id: '4', name: 'street', placeholder: 'Введите улицу' },
  { id: '5', name: 'houseNumber', placeholder: 'Введите номер дома' },
];

export const useCompanyForm = () => {
  const [form, setForm] = useState<FormState>(() => Object.fromEntries(formFields.map(field => [field.name, ''])));
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const inputRefs = formFields.map(() => useRef<HTMLInputElement | null>(null));
  const dispatch = useAppDispatch();
  const validateForm = (): boolean => {
    const newErrors = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim() ? '' : 'Заполните поле']));
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value.trim() ? '' : prev[name] }));
  };

  const resetForm = () => {
    setForm(Object.fromEntries(formFields.map(field => [field.name, ''])));
    setErrors({});
  };

  return { form, errors, validateForm, handleChange, resetForm, inputRefs, formFields, dispatch };
};
