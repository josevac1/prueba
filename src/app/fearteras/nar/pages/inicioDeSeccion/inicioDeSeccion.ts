import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../../../formuutlis/FormUtils';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-inicio-de-seccion-',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicioDeSeccion.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioDeSeccion { private fb = inject(FormBuilder);
  private router = inject(Router);

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
      // 4. Asegúrate que en app.routes.ts tengas un path: 'pokemon'
      this.router.navigate(['/pokemon']); 
    } else {
      alert('Error: Usuario o contraseña incorrectos');
      this.myForm.controls['password'].reset(); 
    }
  }

  // Delegar validaciones a FormUtils
  isValidField(fieldName: string): boolean {
    return !!FormUtils.isValidField(this.myForm, fieldName);
  }

  getFieldError(fieldName: string): string | null {
    return FormUtils.getFieldError(this.myForm, fieldName);
  }

}
