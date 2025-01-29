import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import clsx from 'clsx';
import s from './table.module.scss';

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(({ className, ...rest }, ref) => {
  const classNames = {
    table: clsx(className, s.table),
  };
  return <table className={classNames.table} {...rest} ref={ref} />;
});

Table.displayName = 'Table';
export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(({ ...rest }, ref) => {
  return <thead {...rest} ref={ref} />;
});

TableHead.displayName = 'TableHead';
export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(({ ...rest }, ref) => {
  return <tbody {...rest} ref={ref} />;
});

TableBody.displayName = 'TableBody';
export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(({ ...rest }, ref) => {
  return <tr {...rest} ref={ref} />;
});

TableRow.displayName = 'TableRow';
export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(({ children, className, ...rest }, ref) => {
  const classNames = {
    headCell: clsx(className, s.headCell),
  };
  return (
    <th className={classNames.headCell} {...rest} ref={ref}>
      <span>{children}</span>
    </th>
  );
});

TableHeadCell.displayName = 'TableHeadCell';
export const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(({ className, ...rest }, ref) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  };
  return <td className={classNames.cell} {...rest} ref={ref} />;
});

TableCell.displayName = 'TableCell';
