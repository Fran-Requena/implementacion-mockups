/* ==========================================================================
   PERFIL · LegalBridge
   ========================================================================== */
(() => {
    'use strict';

    /* ---------------------------------------------------------------------
       1. Cambio de pestañas
       --------------------------------------------------------------------- */
    const tabButtons = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.profile-panel');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.dataset.tab;
            if (!target) return;

            tabButtons.forEach((btn) => {
                const isActive = btn === button;
                btn.classList.toggle('tab-trigger--active', isActive);
                btn.setAttribute('aria-selected', String(isActive));
            });

            tabPanels.forEach((panel) => {
                const isActive = panel.id === `tab-${target}`;
                panel.classList.toggle('profile-panel--hidden', !isActive);
            });
        });
    });

    /* ---------------------------------------------------------------------
       2. Guardado del formulario de perfil
       --------------------------------------------------------------------- */
    const profileForm = document.getElementById('profile-form');
    const savedToast = document.getElementById('saved-toast');

    if (profileForm && savedToast) {
        let toastTimer;

        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!profileForm.checkValidity()) {
                profileForm.reportValidity();
                return;
            }

            // TODO: enviar al backend
            console.log('Perfil guardado');

            savedToast.classList.add('profile-form__toast--visible');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                savedToast.classList.remove('profile-form__toast--visible');
            }, 3500);
        });
    }

    /* ---------------------------------------------------------------------
       3. Toggle de favoritos (estrella)
       --------------------------------------------------------------------- */
    const favButtons = document.querySelectorAll('.favorite-lawyer__fav');

    favButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const isFav = btn.getAttribute('aria-pressed') === 'true';
            btn.setAttribute('aria-pressed', String(!isFav));
            btn.title = isFav ? 'Marcar como favorito' : 'Desmarcar favorito';

            // TODO: persistir en backend
            console.log('Favorito toggled:', !isFav);
        });
    });
})();