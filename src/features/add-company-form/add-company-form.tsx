import { Button, DialogModal, FormInput } from '@/shared';
import { ChangeEvent, KeyboardEvent, useState, useRef } from 'react';
import { useAppDispatch } from '@/app/store';
import { addCompany } from '@/entities';
import { v4 } from 'uuid';
import s from './add-company-form.module.scss';

type FormFieldType = {
  name: string;
  placeholder: string;
};

const formFields: FormFieldType[] = [
  { name: 'name', placeholder: 'Название компании' },
  { name: 'country', placeholder: 'Страна' },
  { name: 'city', placeholder: 'Город' },
  { name: 'street', placeholder: 'Улица' },
  { name: 'houseNumber', placeholder: 'Номер дома' },
];

type FormState = Record<string, string>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddCompanyForm = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState<FormState>(() => Object.fromEntries(formFields.map(({ name }) => [name, ''])));
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const dispatch = useAppDispatch();
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const validateForm = (): boolean => {
    const newErrors = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim() ? '' : 'Заполните поле']));
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value.trim() ? '' : prev[name] }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(
        addCompany({
          id: v4(),
          name: form.name,
          address: {
            country: form.country,
            city: form.city,
            street: form.street,
            houseNumber: form.houseNumber,
          },
          selected: false,
        }),
      );
      setForm(Object.fromEntries(formFields.map(({ name }) => [name, ''])));
      firstInputRef.current?.focus();
    }
  };

  const handleCancel = () => {
    setForm(Object.fromEntries(formFields.map(({ name }) => [name, ''])));
    setErrors({});
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentIndex = formFields.findIndex(field => field.name === e.currentTarget.name);
      if (currentIndex !== -1 && currentIndex < formFields.length - 1) {
        document.querySelector<HTMLInputElement>(`input[name="${formFields[currentIndex + 1].name}"]`)?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <DialogModal title="Добавить компанию" isOpen={isOpen} onClose={handleCancel}>
      <div className={s.modalContent}>
        {formFields.map(({ name, placeholder }, index) => (
          <FormInput
            key={name}
            name={name}
            value={form[name]}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder={placeholder}
            error={errors[name]}
            ref={index === 0 ? firstInputRef : null}
          />
        ))}
        <Button onClick={handleSubmit} title="Добавить" variant="filled" />
      </div>
    </DialogModal>
  );
};
