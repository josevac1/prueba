import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-inicio-de-seccion-',
  imports: [ReactiveFormsModule],
  templateUrl: './inicioDeSeccion .html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioDeSeccion { 
 private fb = inject(FormBuilder);
  private router = inject(Router); // 2. Inyectar Router

  myForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    if (email === USER.email && password === USER.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Error: Usuario o contraseña incorrectos');
      this.myForm.controls['password'].reset(); 
    }
  }

  isValidField(fieldName: string): boolean {
    const field = this.myForm.controls[fieldName];
    return !!(field && field.errors && field.touched);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.myForm.controls[fieldName];
    if (!field) return null;

    const errors = field.errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'email':
          return 'El formato de correo no es válido.';
      }
    }
    return null;
  }
}
