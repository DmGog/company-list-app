import { useState, useRef, KeyboardEvent } from 'react';
import { useAppDispatch } from '@/app/store';

type FormState = Record<string, string>;

type FormField = {
  id: string;
  name: string;
  placeholder: string;
};

const formFields: FormField[] = [
  { id: '1', name: 'name', placeholder: 'Название компании' },
  { id: '2', name: 'country', placeholder: 'Страна' },
  { id: '3', name: 'city', placeholder: 'Город' },
  { id: '4', name: 'street', placeholder: 'Улица' },
  { id: '5', name: 'houseNumber', placeholder: 'Дом' },
];

export const useCompanyForm = () => {
  const [form, setForm] = useState<FormState>(() => Object.fromEntries(formFields.map(field => [field.name, ''])));
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(formFields.length).fill(null));
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  return { form, errors, validateForm, handleChange, resetForm, inputRefs, formFields, dispatch, handleKeyDown };
};
