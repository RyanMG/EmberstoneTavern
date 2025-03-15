import { Item } from "react-native-picker-select";

export function createFormSelectOptions<T>(options: T[], {
  labelKey,
  labelFunction,
  valueKey
}: {
  labelKey?: keyof T;
  labelFunction?: (option: T) => string;
  valueKey: keyof T;
}): Item[] {
  if (!labelKey && !labelFunction) {
    throw new Error('Either labelKey or labelFunction must be provided');
  }

  return options.map(option => ({ label: labelFunction ? labelFunction(option) : String(option[labelKey!]), value: option[valueKey] }));
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
