/* ==========================================================================
   CATÁLOGO · LegalBridge
   ========================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Formulario de búsqueda principal
     --------------------------------------------------------------------- */
  const searchForm = document.getElementById('cat-search');

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const query = document.getElementById('cat-search-query')?.value.trim() || '';
      const sort  = document.getElementById('cat-sort')?.value || 'rating';

      // TODO: navegar / filtrar resultados en el backend
      console.log('Búsqueda catálogo:', { query, sort });
    });
  }

  /* ---------------------------------------------------------------------
     2. Restablecer filtros
     --------------------------------------------------------------------- */
  const resetBtn = document.getElementById('reset-filters');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const sidebar = document.querySelector('.filters');
      if (!sidebar) return;

      // Desmarcar todos los checkboxes (excepto el primer radio de precio)
      sidebar.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });

      const firstPriceRadio = sidebar.querySelector('input[name="price_range"]');
      if (firstPriceRadio) firstPriceRadio.checked = true;

      const firstRatingRadio = sidebar.querySelector('input[name="rating"]');
      if (firstRatingRadio) firstRatingRadio.checked = true;
    });
  }

  /* ---------------------------------------------------------------------
     3. Pills eliminables (filtros activos)
     --------------------------------------------------------------------- */
  const pills = document.querySelectorAll('.pill');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      // TODO: quitar el filtro correspondiente del estado
      pill.remove();
    });
  });

  /* ---------------------------------------------------------------------
     4. Aplicar filtros
     --------------------------------------------------------------------- */
  const applyBtn = document.getElementById('apply-filters');

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const sidebar = document.querySelector('.filters');
      if (!sidebar) return;

      const selected = {
        specialties: Array.from(
          sidebar.querySelectorAll('.filter-check__input:checked')
        ).map((input) => input.nextElementSibling?.textContent?.trim()),

        priceRange: sidebar.querySelector('input[name="price_range"]:checked')
          ?.nextElementSibling?.textContent?.trim(),

        rating: sidebar.querySelector('input[name="rating"]:checked')
          ?.parentElement?.querySelector('.filter-rating__value')?.textContent?.trim(),

        availability: Array.from(
          sidebar.querySelectorAll('.filter-radio__input[type="checkbox"]:checked')
        ).map((input) => input.nextElementSibling?.textContent?.trim())
      };

      // TODO: enviar al backend / re-renderizar
      console.log('Filtros aplicados:', selected);
    });
  }

  /* ---------------------------------------------------------------------
     5. Canal de consulta (Telemática / Presencial)
     --------------------------------------------------------------------- */
  const channelButtons = document.querySelectorAll('.channel-btn');

  channelButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      channelButtons.forEach((b) => b.classList.remove('channel-btn--active'));
      btn.classList.add('channel-btn--active');
    });
  });

  /* ---------------------------------------------------------------------
     6. Paginación (demo)
     --------------------------------------------------------------------- */
  const pageButtons = document.querySelectorAll('.pagination__page');

  pageButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      pageButtons.forEach((b) => b.classList.remove('pagination__page--active'));
      btn.classList.add('pagination__page--active');
      // TODO: cargar la página X
      console.log('Página seleccionada:', btn.textContent.trim());
    });
  });
})();