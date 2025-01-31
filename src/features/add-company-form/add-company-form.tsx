import { Button, DialogModal, FormInput } from '@/shared';
import { KeyboardEvent } from 'react';
import { addCompany } from '@/entities';
import { v4 } from 'uuid';
import s from './add-company-form.module.scss';
import { useCompanyForm } from '../hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddCompanyForm = ({ isOpen, onClose }: Props) => {
  const { dispatch, form, errors, validateForm, handleChange, resetForm, inputRefs, formFields } = useCompanyForm();

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
      resetForm();
      inputRefs[0]?.current?.focus();
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' && inputRefs[index + 1]) {
      e.preventDefault();
      inputRefs[index + 1]?.current?.focus();
    }
  };

  return (
    <DialogModal title="Добавить компанию" isOpen={isOpen} onClose={handleCancel}>
      <div className={s.modalContent}>
        {formFields.map(({ id, name, placeholder }, index) => (
          <FormInput
            key={id}
            name={name}
            value={form[name]}
            onChange={e => handleChange(name, e.target.value)}
            placeholder={placeholder}
            error={errors[name]}
            ref={inputRefs[index]}
            onKeyDown={e => handleKeyDown(e, index)}
          />
        ))}
        <Button onClick={handleSubmit} title="Добавить" variant="filled" />
      </div>
    </DialogModal>
  );
};
