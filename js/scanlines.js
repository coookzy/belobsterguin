/**
 * Scanlines Module
 * Creates animated CRT-style scanlines overlay - more visible for authenticity
 */

(function() {
    'use strict';

    const Scanlines = {
        config: {
            enabled: true,
            opacity: 0.35,  // Increased for better visibility
            animated: true,
            animationSpeed: 6 // seconds
        },

        init: function() {
            if (!this.config.enabled) return;
            this.createScanlines();
        },

        createScanlines: function() {
            // Create scanlines overlay element
            const scanlinesDiv = document.createElement('div');
            scanlinesDiv.className = 'scanlines';
            scanlinesDiv.setAttribute('aria-hidden', 'true');
            
            // Insert at the beginning of body
            if (document.body.firstChild) {
                document.body.insertBefore(scanlinesDiv, document.body.firstChild);
            } else {
                document.body.appendChild(scanlinesDiv);
            }

            // Apply styles dynamically
            this.applyScanlineStyles();
        },

        applyScanlineStyles: function() {
            // Inject scanline CSS if not already present
            if (!document.getElementById('scanline-styles')) {
                const style = document.createElement('style');
                style.id = 'scanline-styles';
                style.textContent = `
                    .scanlines {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        pointer-events: none;
                        z-index: 9998;
                        background: repeating-linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 0) 0px,
                            rgba(0, 0, 0, 0) 1px,
                            rgba(0, 0, 0, ${this.config.opacity}) 2px,
                            rgba(0, 0, 0, 0) 3px
                        );
                        ${this.config.animated ? 'animation: scanline-move ' + this.config.animationSpeed + 's linear infinite;' : ''}
                    }

                    @keyframes scanline-move {
                        0% {
                            background-position: 0 0;
                        }
                        100% {
                            background-position: 0 4px;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        },

        toggle: function() {
            this.config.enabled = !this.config.enabled;
            const scanlines = document.querySelector('.scanlines');
            if (scanlines) {
                scanlines.style.display = this.config.enabled ? 'block' : 'none';
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            Scanlines.init();
        });
    } else {
        Scanlines.init();
    }

    // Export for external use
    window.Scanlines = Scanlines;
})();
