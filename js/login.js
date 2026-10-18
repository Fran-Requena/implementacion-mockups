/* ==========================================================================
   LOGIN · LegalBridge
   ========================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Toggle de visibilidad de contraseña
     --------------------------------------------------------------------- */
  const pwdInput  = document.getElementById('master-password');
  const pwdToggle = document.getElementById('toggle-pwd');
  const pwdIcon   = document.getElementById('pwd-icon');

  if (pwdInput && pwdToggle && pwdIcon) {
    pwdToggle.addEventListener('click', () => {
      const willShow = pwdInput.type === 'password';
      pwdInput.type = willShow ? 'text' : 'password';
      pwdIcon.textContent = willShow ? 'visibility_off' : 'visibility';
      pwdToggle.setAttribute('aria-pressed', String(willShow));
      pwdToggle.setAttribute('aria-label', willShow ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  }

  /* ---------------------------------------------------------------------
     2. Código 2FA — autoadvance, retroceso y pegado
     --------------------------------------------------------------------- */
  const otpContainer = document.getElementById('otp-inputs');

  if (otpContainer) {
    const inputs = Array.from(otpContainer.querySelectorAll('.otp__input'));

    inputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '').slice(0, 1);
        if (event.target.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !event.target.value && index > 0) {
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
          event.preventDefault();
        } else if (event.key === 'ArrowLeft' && index > 0) {
          inputs[index - 1].focus();
        } else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('paste', (event) => {
        event.preventDefault();
        const digits = (event.clipboardData.getData('text') || '')
          .replace(/\D/g, '')
          .slice(0, inputs.length);

        digits.split('').forEach((digit, offset) => {
          if (inputs[index + offset]) inputs[index + offset].value = digit;
        });

        const nextIndex = Math.min(index + digits.length, inputs.length - 1);
        inputs[nextIndex].focus();
      });
    });
  }

  /* ---------------------------------------------------------------------
     3. Envío del formulario — simula login y redirige a perfil
     --------------------------------------------------------------------- */
  const form = document.getElementById('login-form');

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Estado visual de "cargando"
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent.trim();
        submitBtn.textContent = 'Iniciando sesión...';
      }

      // Simulamos una llamada al backend con un pequeño delay
      setTimeout(() => {
        // Marcamos sesión activa (para futuras comprobaciones)
        sessionStorage.setItem('lb_logged_in', 'true');

        // Redirige a la página de perfil
        window.location.href = 'perfil.html';
      }, 600);
    });
  }
})();