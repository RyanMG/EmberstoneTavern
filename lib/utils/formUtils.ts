import { Item } from "react-native-picker-select";

export function createFormSelectOptions<T>(options: T[], {
  labelKey,
  valueKey
}: {
  labelKey: keyof T;
  valueKey: keyof T;
}): Item[] {
  return options.map(option => ({ label: String(option[labelKey]), value: option[valueKey] }));
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
