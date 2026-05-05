/**
 * Main CRT Display System Initializer
 * Coordinates all vintage monitor effects modules
 */

(function() {
    'use strict';

    const CRTSystem = {
        version: '2.0.0',
        modules: {},

        init: function() {
            console.log('🖥️ Initializing CRT Display System v' + this.version);
            console.log('   • Windows 95/98 IE frame');
            console.log('   • Scanlines');
            console.log('   • Screen warp & effects');
            
            // Wait for all modules to load
            this.waitForModules();
        },

        waitForModules: function() {
            const checkModules = setInterval(() => {
                if (window.Scanlines && window.CRTEffects && window.WindowsFrame) {
                    clearInterval(checkModules);
                    this.modules = {
                        scanlines: window.Scanlines,
                        effects: window.CRTEffects,
                        windows: window.WindowsFrame
                    };
                    console.log('✓ All CRT modules loaded successfully');
                    console.log('  Press Ctrl+C to toggle effects');
                    this.addControls();
                }
            }, 50);

            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkModules);
                if (!window.Scanlines || !window.CRTEffects || !window.WindowsFrame) {
                    console.warn('⚠ Some CRT modules failed to load');
                }
            }, 5000);
        },

        addControls: function() {
            // Add keyboard shortcut to toggle effects (Ctrl+Shift+E)
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
                    e.preventDefault();
                    this.toggleEffects();
                }
            });
        },

        toggleEffects: function() {
            const wasEnabled = this.modules.scanlines ? this.modules.scanlines.config.enabled : true;
            
            if (this.modules.scanlines && typeof this.modules.scanlines.toggle === 'function') {
                this.modules.scanlines.toggle();
            }
            if (this.modules.windows && typeof this.modules.windows.toggle === 'function') {
                this.modules.windows.toggle();
            }
            
            console.log('CRT effects ' + (wasEnabled ? 'disabled' : 'enabled'));
        }
    };

    // Initialize the system
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            CRTSystem.init();
        });
    } else {
        CRTSystem.init();
    }

    // Export for external use
    window.CRTSystem = CRTSystem;
})();
