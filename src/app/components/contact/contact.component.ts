import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from 'src/models/feedback';
import { ContactType } from 'src/models/contacttype';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup | undefined;
  feedback: FeedBack | undefined;
  role = ContactType;
  @ViewChild('fform') feedbackFormDirective: any;
  constructor(private builder: FormBuilder) {
    this.createForm();
  }

  formErrors: { [key: string]: string } = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
  };

  validationMessages: { [key: string]: { [key: string]: string } } = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.',
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
  };

  createForm() {
    this.feedbackForm = this.builder.group({
      firstname: [
        '',
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)],
      ],
      lastname: [
        '',
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)],
      ],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.pattern]],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged();
  }

  onSubmit() {
    if (this.feedbackForm?.valid) {
      this.feedbackForm?.reset({
        firstname: [''],
        lastname: [''],
        telnum: [0],
        email: [''],
        agree: false,
        contacttype: 'None',
        message: '',
      });
    }
    this.feedbackFormDirective.reset();
  }
  keys(): string[] {
    var keys = Object.keys(this.role);
    return keys.slice(keys.length / 2);
  }

  onValueChanged(data?: any): void {
    if (!this.feedbackForm) {
      return;
    }
    let form = this.feedbackForm;
    for (let field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        let control = form.get(field);
        if (control && control.dirty && !control.valid) {
          let message = this.validationMessages[field];
          for(let key in control.errors){
            this.formErrors[field] = `${message[key]}  `;
          }
        }
      }
    }
  }

  ngOnInit(): void {}
}
