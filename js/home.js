/* ==========================================================================
   HOME · LegalBridge
   ========================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Buscador principal
     --------------------------------------------------------------------- */
  const searchForm = document.getElementById('search-form');

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const service  = document.getElementById('search-service')?.value.trim() || '';
      const area     = document.getElementById('search-area')?.value || '';
      const location = document.getElementById('search-location')?.value || '';

      if (!service && !area) {
        document.getElementById('search-service')?.focus();
        return;
      }

      // TODO: navegar a catálogo con filtros
      console.log('Búsqueda:', { service, area, location });
    });
  }

  /* ---------------------------------------------------------------------
     2. Chips → rellenan el campo de servicio
     --------------------------------------------------------------------- */
  const serviceInput = document.getElementById('search-service');
  const chips = document.querySelectorAll('.chip[data-chip]');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      if (!serviceInput) return;
      serviceInput.value = chip.dataset.chip || chip.textContent.trim();
      serviceInput.focus();
    });
  });

  /* ---------------------------------------------------------------------
     3. Newsletter (footer)
     --------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.checkValidity()) {
        newsletterForm.reportValidity();
        return;
      }

      // TODO: enviar al backend
      console.log('Newsletter suscripción:', emailInput.value);
      newsletterForm.reset();
    });
  }
})();