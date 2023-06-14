import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
// import { UsersFromServerService } from 'src/app/services/users-from-server.service';
import { User } from '../../types/User';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { Framework } from 'src/app/types/Framework';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  showLoader = false;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  // hobbies: FormGroup[] = [];
  createUserForm!: FormGroup;
  frameworks = Object.keys(Framework);
  selectedVersions: string[] | null = null;
  versions: any = {
    ANGULAR: ['Angular 11', 'Angular 12', 'Angular 13'],
    REACT: ['React 16', 'React 17', 'React 18'],
    VUE: ['Vue 2', 'Vue 3'],
  };

  constructor(
    // public usersFromServerService: UsersFromServerService,
    public dialog: MatDialog
  ) {
    this.createForm();
    this.validateFramework();
  }

  ngOnInit() {
    // this.createForm();
    this.validateFramework();
  }

  createForm() {
    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      framework: new FormControl('', [Validators.required]),
      frameworkVersion: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkEmailExists.bind(this)],
        updateOn: 'blur',
      }),
      hobbies: new FormArray([], Validators.required)
    });
  }

  get hobbies(): AbstractControl[] {
    return (this.createUserForm.get('hobbies') as FormArray)?.controls || [];
  }

  isFieldInvalid(fieldName: string) {
    const field = this.createUserForm.get(fieldName);
    return field?.invalid && field?.touched;
  }

  addHobby() {
    const hobbies = this.createUserForm.get('hobbies') as FormArray;

    const hobbyFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required])
    });

    hobbies.push(hobbyFormGroup);

    hobbyFormGroup.markAsUntouched();
    this.createUserForm.markAsUntouched();
  }

  removeHobby(index: number) {
    this.hobbies.splice(index, 1);
  }

  validateFramework(): void {
    this.createUserForm.get('framework')?.valueChanges.subscribe((value) => {
      const frameworkVersionControl =
        this.createUserForm.get('frameworkVersion');
      if (value) {
        frameworkVersionControl?.setValue(null);
        frameworkVersionControl?.enable();
        const selectedFramework = this.createUserForm.get('framework')?.value;
        this.selectedVersions = this.versions[selectedFramework];
      } else {
        frameworkVersionControl?.setValue(null);
        frameworkVersionControl?.disabled;
        this.selectedVersions = null;
      }
    });
  }

  checkEmailExists(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    this.showLoader = true;
    this.emailInput.nativeElement.classList.add('is-loader');

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@test.test') {
          resolve({ emailExist: true });
        } else {
          resolve(null);
        }
        this.emailInput.nativeElement.classList.remove('is-loader');
        this.showLoader = false;
      }, 2000);
    });
  }

  createUser() {
    const firstName = this.createUserForm.get('firstName')?.value || '';
    const lastName = this.createUserForm.get('lastName')?.value || '';
    const dateOfBirth =
      moment(this.createUserForm.get('dateOfBirth')?.value).toDate() ||
      new Date(Date.now());
    const framework = this.createUserForm.get('framework')?.value || '';
    const frameworkVersion =
      this.createUserForm.get('frameworkVersion')?.value || '';
    const email = this.createUserForm.get('email')?.value || '';
    const hobby = this.createUserForm.get('hobby')?.value || '';

    console.log(frameworkVersion);

    const newUser: User = {
      id: null,
      firstName,
      lastName,
      dateOfBirth,
      framework,
      frameworkVersion,
      email,
      hobby,
    };

    // this.usersFromServerService.createUser(newUser).subscribe({
    //   next: () => {
    //     this.dialog.open(MessageComponent, {
    //       data: 'User is already created, you can check it in the Users component',
    //     });
    //   },
    // });
    this.createUserForm.reset();
    this.createUserForm.markAsUntouched();
  }

  reset() {
    this.createUserForm.reset();
    this.createUserForm.markAsUntouched();
  }
}
