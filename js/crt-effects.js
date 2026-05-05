/**
 * CRT Screen Effects Module
 * Adds vintage CRT monitor effects like flicker, glow, and screen curvature
 */

(function() {
    'use strict';

    const CRTEffects = {
        config: {
            flickerEnabled: true,
            flickerIntensity: 0.015,
            flickerInterval: 120,
            glowEnabled: true
        },

        init: function() {
            this.wrapContent();
            if (this.config.flickerEnabled) {
                this.startFlicker();
            }
            this.applyScreenEffects();
            this.applyScreenWarp();
        },

        wrapContent: function() {
            // Add CRT screen class to body for effects
            document.body.classList.add('crt-screen');
            this.injectStyles();
        },

        injectStyles: function() {
            if (!document.getElementById('crt-screen-styles')) {
                const style = document.createElement('style');
                style.id = 'crt-screen-styles';
                style.textContent = `
                    /* CRT Screen with screen warp effect */
                    body.crt-screen {
                        position: relative;
                        overflow-y: auto !important;
                        overflow-x: hidden;
                        filter: contrast(1.08) brightness(1.06) saturate(1.03);
                    }

                    /* Screen warp overlay with barrel distortion */
                    body.crt-screen::before {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        pointer-events: none;
                        z-index: 9995;
                        background: 
                            radial-gradient(circle at center, 
                                transparent 0%, 
                                transparent 68%,
                                rgba(0, 0, 0, 0.12) 84%,
                                rgba(0, 0, 0, 0.22) 100%
                            );
                        border-radius: 16px;
                        box-shadow: 
                            inset 0 0 60px rgba(0, 0, 0, 0.35),
                            inset 0 0 24px rgba(0, 0, 0, 0.2);
                    }

                    /* Glass glare effect */
                    body.crt-screen::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: 
                            radial-gradient(ellipse at 25% 20%, 
                                rgba(255, 255, 255, 0.12) 0%, 
                                transparent 50%
                            ),
                            linear-gradient(135deg,
                                rgba(255, 255, 255, 0.03) 0%,
                                transparent 40%
                            );
                        pointer-events: none;
                        z-index: 9994;
                    }
                `;
                document.head.appendChild(style);
            }
        },

        applyScreenWarp: function() {
            // Apply subtle transform to simulate CRT curvature
            const style = document.createElement('style');
            style.textContent = `
                body.crt-screen {
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }
            `;
            document.head.appendChild(style);
        },

        startFlicker: function() {
            setInterval(() => {
                if (Math.random() < 0.08) { // 8% chance of flicker
                    const intensity = 1 - (Math.random() * this.config.flickerIntensity);
                    document.body.style.opacity = intensity;
                    
                    setTimeout(() => {
                        document.body.style.opacity = 1;
                    }, 40);
                }
            }, this.config.flickerInterval);
        },

        applyScreenEffects: function() {
            // Keep only lightweight transient scan-like flicker to avoid layout shifts.
            window.addEventListener('scroll', function() {
                if (Math.random() < 0.03) {
                    const brightness = 0.98 + (Math.random() * 0.04);
                    document.body.style.filter = 'contrast(1.08) brightness(' + brightness + ') saturate(1.03)';
                    setTimeout(() => {
                        document.body.style.filter = 'contrast(1.08) brightness(1.06) saturate(1.03)';
                    }, 40);
                }
            });
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            CRTEffects.init();
        });
    } else {
        CRTEffects.init();
    }

    // Export for potential external use
    window.CRTEffects = CRTEffects;
})();
