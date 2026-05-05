/**
 * Single Page Navigation Module
 * Handles in-window page switching without reloading
 */

(function() {
    'use strict';

    const PageNavigation = {
        currentPage: 'index.html',
        validPages: new Set([
            'index.html',
            'morphology.html',
            'habitat.html',
            'gallery.html',
            'research.html',
            'contact.html'
        ]),
        
        init: function() {
            this.setupNavigation();
            this.loadInitialPage();
        },

        setupNavigation: function() {
            // Intercept all navigation clicks
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href]');
                if (!link) {
                    return;
                }

                const href = link.getAttribute('href');
                if (this.isInternalPageLink(href)) {
                    e.preventDefault();
                    this.navigateTo(href);
                }
            });

            // Handle browser back/forward
            window.addEventListener('popstate', (e) => {
                if (e.state && e.state.page) {
                    this.showPage(e.state.page, false);
                } else {
                    this.showPage(this.normalizePageFromHash(), false);
                }
            });

            // Handle manual hash changes
            window.addEventListener('hashchange', () => {
                this.showPage(this.normalizePageFromHash(), false);
            });
        },

        loadInitialPage: function() {
            const page = this.normalizePageFromHash();
            this.showPage(page, true);
        },

        navigateTo: function(page) {
            this.showPage(page, true);
        },

        showPage: function(page, addToHistory) {
            const normalizedPage = this.normalizePage(page);

            // Hide all page sections
            const allPages = document.querySelectorAll('.page-content');
            allPages.forEach((p) => p.classList.remove('is-active'));

            // Show the requested page
            const pageId = 'page-' + normalizedPage.replace('.html', '');
            const targetPage = document.getElementById(pageId);
            
            if (targetPage) {
                targetPage.classList.add('is-active');
                this.currentPage = normalizedPage;

                this.updateNavState(normalizedPage);

                // Update address bar in the window frame
                this.updateAddressBar(normalizedPage);

                // Update browser history
                if (addToHistory && window.location.hash.slice(1) !== normalizedPage) {
                    window.history.pushState(
                        { page: normalizedPage }, 
                        '', 
                        '#' + normalizedPage
                    );
                }

                // Scroll to top of content
                const contentArea = document.querySelector('.windows95-content');
                if (contentArea) {
                    contentArea.scrollTop = 0;
                }
            } else if (normalizedPage !== 'index.html') {
                // If an invalid or missing page is requested, fail safely to home.
                this.showPage('index.html', addToHistory);
            }
        },

        isInternalPageLink: function(href) {
            if (!href || href.startsWith('#')) {
                return false;
            }

            if (href.includes('://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                return false;
            }

            return this.validPages.has(this.normalizePage(href));
        },

        normalizePageFromHash: function() {
            const hashPage = window.location.hash.slice(1);
            return this.normalizePage(hashPage || 'index.html');
        },

        normalizePage: function(page) {
            const rawPage = (page || 'index.html').split('?')[0].split('/').pop();
            if (this.validPages.has(rawPage)) {
                return rawPage;
            }
            return 'index.html';
        },

        updateNavState: function(page) {
            const links = document.querySelectorAll('.nav-link');
            links.forEach((link) => {
                const isCurrent = this.normalizePage(link.getAttribute('href')) === page;
                if (isCurrent) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        },

        updateAddressBar: function(page) {
            const addressInput = document.querySelector('.address-input');
            if (addressInput) {
                addressInput.value = 'https://belobsterguin.fun/' + page;
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            PageNavigation.init();
        });
    } else {
        PageNavigation.init();
    }

    // Export for external use
    window.PageNavigation = PageNavigation;
})();
