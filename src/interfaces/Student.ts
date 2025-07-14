export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  number_civial?: string;
  address?: string; 
  father_name?: string; 
  mother_name?: string; 
  access_code?: string;
  created_at?: string | Date;
  updated_at?: string | Date;

  
  section: string;
  isAccountActive: boolean;
  registrationDate: string;
}