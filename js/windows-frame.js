/**
 * Windows 95/98 Internet Explorer Frame Module
 * Creates authentic IE5-style window chrome with menu bar, toolbar, and address bar
 */

(function() {
    'use strict';

    const WindowsFrame = {
        config: {
            enabled: true,
            windowTitle: 'Belobsterguin Research Institute - Internet Explorer'
        },

        init: function() {
            if (!this.config.enabled) return;
            this.createWindowChrome();
            this.applyWindowStyles();
        },

        createWindowChrome: function() {
            // Find the main content table
            const mainTable = document.querySelector('body > center > table');
            if (!mainTable) return;

            // Create window container
            const windowContainer = document.createElement('div');
            windowContainer.className = 'windows95-window';

            // Create title bar
            const titleBar = document.createElement('div');
            titleBar.className = 'windows95-titlebar';
            titleBar.innerHTML = `
                <div class="windows95-title">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGcSURBVDiNjZLPS1RRFMc/9703M+N0HScataSFtWhhRKtA2rQJ+gdomwQRtGjVqk0Q9A+0aVeLIIigRS0KbFGLCKKgTYtaREGYv2ZmfN97b4v3Zn4k9sCFe+853+89H+45AvA//hO3t7d5+fIl165dA0BEuHDhAu3t7Rw5coTHjx+zsLDA0NAQo6OjABw8eJBr164xPT3N5OQk9Xqd9vZ2RkZGCAD/wIULF5iYmGBtbY1EIsHg4CBNTU0ANDQ0kMlkGB4e5vr16+Tyedra2hARRISenp7fAqvVKrlcjomJCRKJBNVqFYDBwUE2NzfZ3t4mk8nQ2NiIiLCzs8PKygoAPT09ewQqFWd1dZVcLgeA1pqLFy/S3d3Nly9f0Frzfn6e58+f09nZCcDhw4fJZrNsbGyw3fsCL168YHl5+XdBRCiVSuzs7NDa2grAhQsXEBHy+Tzr6+vMzs4yNzeHiNDU1ERXVxcLCwvk83kqlQqpVOp3QSklqVQKpRSlUom1tTWWlpZYXFxkaWmJ5eVllpaWEBFu3rxJb28v/f39pNPpP74AgEgkgizG+OIAAAAASUVORK5CYII=" alt="" class="window-icon">
                    <span>${this.config.windowTitle}</span>
                </div>
                <div class="windows95-controls">
                    <button class="win-btn win-minimize" disabled aria-label="Minimize"></button>
                    <button class="win-btn win-maximize" disabled aria-label="Maximize"></button>
                    <button class="win-btn win-close" disabled aria-label="Close"></button>
                </div>
            `;

            // Create menu bar
            const menuBar = document.createElement('div');
            menuBar.className = 'windows95-menubar';
            menuBar.innerHTML = `
                <span class="menu-item">File</span>
                <span class="menu-item">Edit</span>
                <span class="menu-item">View</span>
                <span class="menu-item">Favorites</span>
                <span class="menu-item">Tools</span>
                <span class="menu-item">Help</span>
            `;

            // Create toolbar
            const toolBar = document.createElement('div');
            toolBar.className = 'windows95-toolbar';
            toolBar.innerHTML = `
                <button class="toolbar-btn" disabled title="Back">
                    <span class="toolbar-icon">←</span> Back
                </button>
                <button class="toolbar-btn" disabled title="Forward">
                    <span class="toolbar-icon">→</span> Forward
                </button>
                <button class="toolbar-btn" disabled title="Stop">
                    <span class="toolbar-icon">⊗</span> Stop
                </button>
                <button class="toolbar-btn" disabled title="Refresh">
                    <span class="toolbar-icon">↻</span> Refresh
                </button>
                <button class="toolbar-btn" disabled title="Home">
                    <span class="toolbar-icon">⌂</span> Home
                </button>
            `;

            // Create address bar
            const addressBar = document.createElement('div');
            addressBar.className = 'windows95-addressbar';
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            addressBar.innerHTML = `
                <span class="address-label">Address</span>
                <div class="address-input-wrapper">
                    <input type="text" class="address-input" value="https://belobsterguin.fun/${currentPage}" readonly>
                </div>
                <button class="go-btn" disabled>Go</button>
            `;

            // Create window content area
            const windowContent = document.createElement('div');
            windowContent.className = 'windows95-content';

            // Move the table into window container
            windowContainer.appendChild(titleBar);
            windowContainer.appendChild(menuBar);
            windowContainer.appendChild(toolBar);
            windowContainer.appendChild(addressBar);
            windowContent.appendChild(mainTable);
            windowContainer.appendChild(windowContent);

            // Insert window container where table was
            const centerElement = document.querySelector('body > center');
            centerElement.appendChild(windowContainer);
        },

        applyWindowStyles: function() {
            if (!document.getElementById('windows95-styles')) {
                const style = document.createElement('style');
                style.id = 'windows95-styles';
                style.textContent = `
                    /* Windows 95/98 Window Container */
                    .windows95-window {
                        background: #c0c0c0;
                        border: 2px outset #dfdfdf;
                        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
                        margin: 0 auto;
                        max-width: 1000px;
                        width: min(1000px, calc(100vw - 24px));
                        max-height: calc(100vh - 24px);
                        font-family: "MS Sans Serif", Tahoma, sans-serif;
                        position: relative;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }

                    /* Title Bar */
                    .windows95-titlebar {
                        background: linear-gradient(to right, #000080, #1084d0);
                        padding: 2px 4px 2px 2px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 20px;
                    }

                    .windows95-title {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        color: white;
                        font-size: 11px;
                        font-weight: bold;
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                    }

                    .window-icon {
                        width: 16px;
                        height: 16px;
                        flex-shrink: 0;
                    }

                    .windows95-controls {
                        display: flex;
                        gap: 2px;
                    }

                    .win-btn {
                        width: 16px;
                        height: 14px;
                        background: #c0c0c0;
                        border-top: 1px solid #fff;
                        border-left: 1px solid #fff;
                        border-right: 1px solid #000;
                        border-bottom: 1px solid #000;
                        font-size: 8px;
                        line-height: 1;
                        padding: 0;
                        cursor: default;
                        font-weight: normal;
                        color: #000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: "Marlett", "MS Sans Serif", sans-serif;
                    }

                    .win-btn:active:not([disabled]) {
                        border-top: 1px solid #000;
                        border-left: 1px solid #000;
                        border-right: 1px solid #fff;
                        border-bottom: 1px solid #fff;
                        padding-left: 1px;
                        padding-top: 1px;
                    }
                    
                    .win-minimize::before {
                        content: '';
                        display: block;
                        width: 6px;
                        height: 2px;
                        background: #000;
                        position: relative;
                        bottom: -2px;
                    }
                    
                    .win-maximize::before {
                        content: '';
                        display: block;
                        width: 8px;
                        height: 8px;
                        border: 2px solid #000;
                        border-bottom-width: 3px;
                        box-sizing: border-box;
                    }
                    
                    .win-close::before {
                        content: '×';
                        font-size: 14px;
                        line-height: 10px;
                        font-weight: normal;
                    }

                    /* Menu Bar */
                    .windows95-menubar {
                        background: #c0c0c0;
                        padding: 2px 4px;
                        border-bottom: 1px solid #808080;
                        display: flex;
                        gap: 8px;
                        font-size: 11px;
                    }

                    .menu-item {
                        padding: 2px 6px;
                        cursor: default;
                        color: #000;
                    }

                    .menu-item:hover {
                        background: #000080;
                        color: white;
                    }

                    /* Toolbar */
                    .windows95-toolbar {
                        background: #c0c0c0;
                        padding: 3px 4px;
                        border-bottom: 1px solid #808080;
                        display: flex;
                        gap: 2px;
                    }

                    .toolbar-btn {
                        background: #c0c0c0;
                        border: 1px outset #fff;
                        padding: 2px 8px;
                        font-size: 11px;
                        cursor: default;
                        display: flex;
                        align-items: center;
                        gap: 3px;
                        color: #000;
                        font-family: "MS Sans Serif", Tahoma, sans-serif;
                    }

                    .toolbar-btn[disabled] {
                        color: #808080;
                    }

                    .toolbar-btn:active:not([disabled]) {
                        border-style: inset;
                    }

                    .toolbar-icon {
                        font-size: 13px;
                        line-height: 1;
                    }

                    /* Address Bar */
                    .windows95-addressbar {
                        background: #c0c0c0;
                        padding: 3px 4px;
                        border-bottom: 2px groove #808080;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 11px;
                    }

                    .address-label {
                        color: #000;
                        font-weight: normal;
                    }

                    .address-input-wrapper {
                        flex: 1;
                        background: white;
                        border: 1px inset #808080;
                        padding: 2px;
                    }

                    .address-input {
                        width: 100%;
                        border: none;
                        background: transparent;
                        font-size: 11px;
                        font-family: "MS Sans Serif", Tahoma, sans-serif;
                        padding: 0;
                        outline: none;
                        color: #000;
                    }

                    .go-btn {
                        background: #c0c0c0;
                        border: 1px outset #fff;
                        padding: 2px 12px;
                        font-size: 11px;
                        cursor: default;
                        color: #000;
                        font-family: "MS Sans Serif", Tahoma, sans-serif;
                    }

                    .go-btn[disabled] {
                        color: #808080;
                    }

                    .go-btn:active:not([disabled]) {
                        border-style: inset;
                    }

                    /* Content Area */
                    .windows95-content {
                        background: white;
                        flex: 1 1 auto;
                        min-height: 0;
                        overflow: auto;
                        max-height: none;
                    }

                    .windows95-content > table {
                        margin: 0 !important;
                        width: 100%;
                    }

                    /* Ensure proper nesting */
                    body > center {
                        display: block;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                    }

                    @media (max-width: 700px) {
                        .windows95-window {
                            width: calc(100vw - 12px);
                            margin: 0 auto;
                            max-height: calc(100vh - 12px);
                        }

                        .windows95-content {
                            max-height: none;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        },

        toggle: function() {
            this.config.enabled = !this.config.enabled;
            const window = document.querySelector('.windows95-window');
            if (window) {
                window.style.display = this.config.enabled ? 'block' : 'none';
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            WindowsFrame.init();
        });
    } else {
        WindowsFrame.init();
    }

    // Export for external use
    window.WindowsFrame = WindowsFrame;
})();
