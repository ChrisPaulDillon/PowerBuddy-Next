

export interface IFormProps {
    register: any
    loading: boolean;
    errorMessage?: string;
}

export interface IFormWithHeaderProps extends IFormProps {
    heading: string;
    spanText: string;
    linkText: string;
    linkUrl: string;
  }
  