export enum ThemeType {
  light = "light",
  dark = "dark",
}

export type Theme = {
  theme: ThemeType;
  themeController: (theme: ThemeType) => void;
};

export enum FieldTypes {
  text = "text",
  textArea = "text_area",
  radioButton = "radio_buttons",
  select = "drop_down",
  multiChoice = "multi_choice",
  file = "file",
  date = "date",
  email = "email",
}

export type Field = {
  id: string;
  label: string;
  type: string;
  options?: string[];
  required?: undefined;
  min?: undefined;
  max?: undefined;
};

export type FormState = {
  [key: string]: [] | undefined | string | File;
};

export type FormErrors = {
  [key: string]: string | null | undefined;
};
