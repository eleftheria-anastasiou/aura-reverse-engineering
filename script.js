/**
 * script.js - Core functionality for the Aura Accessibility landing page.
 * Handles Enforcer Mode toggling, Persona theme switching, and Content Clarification.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const enforcerToggleBtn = document.getElementById('enforcerToggle');
    const personaSelect = document.getElementById('personaSelect');
    const clarifyToggle = document.getElementById('clarifyToggle');
    const heroHeadline = document.getElementById('heroHeadline');
    const heroSubtitle = document.getElementById('heroSubtitle');

    // Original text states for reverting when Clarify Content is toggled off
    const originalHeadlineHTML = 'The Guardian of <span class="gradient-text">Accessibility.</span>';
    const originalSubtitleText = 'Intelligence that lives between your windows. Aura identifies, cleans, and fixes digital barriers in real-time, bringing inclusive experiences to every application on your machine.';

    // Clarified text states
    const clarifiedHeadlineText = 'The Guardian for everyone.';
    const clarifiedSubtitleText = 'Aura helps you use any app easily. It finds and fixes hard parts on your screen in real-time, keeping your data private.';

    /**
     * Toggles the Aura Enforcer simulation mode on/off.
     * When active, injects side-by-side label containers (tag + badge) above each element
     * so narrow elements never overlap or clip badges.
     */
    function toggleEnforcerMode() {
        const isActive = document.body.classList.toggle('enforce-mode');
        
        if (isActive) {
            enforcerToggleBtn.textContent = 'Stop Enforcement';
            
            // Inject label containers for all enforced elements
            document.querySelectorAll('[data-enforce-type]').forEach(el => {
                if (!el.querySelector('.enforce-label-container')) {
                    const container = document.createElement('div');
                    container.className = 'enforce-label-container';
                    
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'enforce-tag';
                    tagSpan.textContent = el.getAttribute('data-enforce-type');
                    
                    const badgeSpan = document.createElement('span');
                    badgeSpan.className = 'enforce-badge';
                    badgeSpan.textContent = el.getAttribute('data-enforce-badge');
                    
                    container.appendChild(tagSpan);
                    container.appendChild(badgeSpan);
                    el.appendChild(container);
                }
            });
        } else {
            enforcerToggleBtn.textContent = 'Simulate Aura Enforcer';
            
            // Remove injected label containers
            document.querySelectorAll('.enforce-label-container').forEach(container => {
                container.remove();
            });
        }
    }

    /**
     * Changes the global accent theme based on the selected persona dropdown value.
     * Removes existing persona theme classes and applies the new theme class to the body element.
     * @param {Event} event - The change event from the select dropdown.
     */
    function handlePersonaChange(event) {
        const selectedTheme = event.target.value; // 'voyager', 'beacon', or 'guardian'
        
        // Remove previous persona theme classes
        document.body.classList.remove('theme-voyager', 'theme-beacon', 'theme-guardian');
        
        // Add selected theme class
        document.body.classList.add(`theme-${selectedTheme}`);
    }

    /**
     * Toggles content clarification mode on/off.
     * When checked, swaps headline and subtitle to clearer copy and increases line height and letter spacing.
     * When unchecked, restores original typography and text.
     * @param {Event} event - The change event from the checkbox input.
     */
    function handleClarifyToggle(event) {
        const isClarified = event.target.checked;
        
        if (isClarified) {
            document.body.classList.add('clarify-active');
            heroHeadline.textContent = clarifiedHeadlineText;
            heroSubtitle.textContent = clarifiedSubtitleText;
        } else {
            document.body.classList.remove('clarify-active');
            heroHeadline.innerHTML = originalHeadlineHTML;
            heroSubtitle.textContent = originalSubtitleText;
        }
    }

    // Event Listeners registration
    if (enforcerToggleBtn) {
        enforcerToggleBtn.addEventListener('click', toggleEnforcerMode);
    }

    if (personaSelect) {
        personaSelect.addEventListener('change', handlePersonaChange);
    }

    if (clarifyToggle) {
        clarifyToggle.addEventListener('change', handleClarifyToggle);
    }
}); 