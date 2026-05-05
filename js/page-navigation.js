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
                    this.showPage(this.normalizePageFromPath(), false);
                }
            });
        },

        loadInitialPage: function() {
            const page = this.normalizePageFromPath();
            this.showPage(page, false);
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
                const cleanPath = normalizedPage === 'index.html' ? '/' : '/' + normalizedPage.replace('.html', '');
                if (addToHistory) {
                    window.history.pushState(
                        { page: normalizedPage }, 
                        '', 
                        cleanPath
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

        normalizePageFromPath: function() {
            const path = window.location.pathname;
            const pathParts = path.split('/').filter(p => p);
            const lastPart = pathParts[pathParts.length - 1] || '';
            
            if (!lastPart || lastPart === 'index.html') {
                return 'index.html';
            }
            
            // Add .html if not present
            const normalized = lastPart.includes('.html') ? lastPart : lastPart + '.html';
            return this.normalizePage(normalized);
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
                const cleanPath = page === 'index.html' ? '' : page.replace('.html', '');
                addressInput.value = 'https://belobsterguin.fun/' + cleanPath;
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
