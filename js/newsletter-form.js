/**
 * Newsletter form behavior
 * Adds client-side validation and simple in-page success feedback.
 */

(function() {
    'use strict';

    function initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        const message = document.getElementById('newsletter-message');

        if (!form || !message) {
            return;
        }

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = form.querySelector('input[name="name"]');
            const emailInput = form.querySelector('input[name="email"]');
            const checkedInterests = form.querySelectorAll('input[type="checkbox"]:checked');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            if (!name || !email) {
                showMessage(message, 'Please enter both your name and email address.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage(message, 'Please enter a valid email address.', 'error');
                return;
            }

            if (checkedInterests.length === 0) {
                showMessage(message, 'Select at least one research interest before signing up.', 'error');
                return;
            }

            showMessage(message, 'Thank you! Your newsletter signup has been recorded.', 'success');
            form.reset();
        });
    }

    function showMessage(container, text, type) {
        container.classList.remove('success', 'error');
        container.classList.add(type);
        container.textContent = text;
    }

    function isValidEmail(value) {
        // Lightweight, practical email sanity check.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsletterForm);
    } else {
        initNewsletterForm();
    }
})();
