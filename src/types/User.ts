import { Framework } from './Framework';
import { Hobby } from './Hobby';

export interface User {
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  framework: Framework,
  frameworkVersion: string,
  email: string,
  hobby: Hobby[],
}
