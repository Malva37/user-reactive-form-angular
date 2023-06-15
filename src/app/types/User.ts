import { Framework } from './Framework';
import { Hobby } from './Hobby';

export interface User {
  id: number | null;

  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  framework: Framework,
  frameworkVersion: string,
  email: string,
  hobbies: Hobby[],
}
