import { Button, DialogModal, FormInput } from '@/shared';
import { useEffect } from 'react';
import { addCompany } from '@/entities';
import { v4 } from 'uuid';
import s from './add-company-form.module.scss';
import { useCompanyForm } from '@/features/companies/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddCompanyForm = ({ isOpen, onClose }: Props) => {
  const { dispatch, handleKeyDown, form, errors, validateForm, handleChange, resetForm, inputRefs, formFields } = useCompanyForm();

  useEffect(() => {
    let timer: number | undefined;

    if (isOpen) {
      timer = window.setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, inputRefs]);

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
      inputRefs.current[0]?.focus();
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <DialogModal title="Добавить компанию" isOpen={isOpen} onClose={handleCancel}>
      <div className={s.modalContent}>
        <h3 className={s.secondaryTitle}>Название компании</h3>
        <FormInput
          ref={el => (inputRefs.current[0] = el)}
          error={errors['name']}
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          onKeyDown={e => handleKeyDown(e, 0)}
          name="name"
        />
        <h3 className={s.secondaryTitle}>Адрес компании</h3>
        {formFields.slice(1).map(({ id, name, placeholder }, index) => (
          <FormInput
            key={id}
            ref={el => (inputRefs.current[index + 1] = el)}
            name={name}
            value={form[name]}
            onChange={e => handleChange(name, e.target.value)}
            placeholder={placeholder}
            error={errors[name]}
            onKeyDown={e => handleKeyDown(e, index + 1)}
          />
        ))}
        <Button onClick={handleSubmit} title="Добавить" variant="filled" />
      </div>
    </DialogModal>
  );
};
