import { FieldName, UseFormProps } from 'react-hook-form';

export interface InputFormMainParams<TFieldValues> {
  form?: UseFormProps<TFieldValues>;
  name?: FieldName<TFieldValues>;
  rules?: InputFormRules;
}
