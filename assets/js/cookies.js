/**
 * Wish Upon a Starre - Cookie Consent Manager
 * Features: Accessibility, ARIA-compliant focus trapping, dark-pattern free, and client-customizable.
 */

(function () {
  const COOKIE_PREFS_KEY = 'wish_upon_a_starre_cookie_consent';

  // CSS for dynamic transitions and layout of the banner/modal
  const injectCookieStyles = () => {
    if (document.getElementById('cookie-manager-styles')) return;
    const style = document.createElement('style');
    style.id = 'cookie-manager-styles';
    style.textContent = `
      .cookie-banner-active {
        transform: translateY(0) !important;
        opacity: 1 !important;
      }
      .cookie-modal-open {
        display: flex !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  };

  // Helper to get stored preferences
  const getStoredPrefs = () => {
    const prefs = localStorage.getItem(COOKIE_PREFS_KEY);
    return prefs ? JSON.parse(prefs) : null;
  };

  // Helper to save preferences
  const savePrefs = (necessary, analytics, marketing) => {
    const prefs = {
      consented: true,
      necessary,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
    
    // Trigger event for any scripts listening to cookie changes
    const event = new CustomEvent('cookieConsentChanged', { detail: prefs });
    window.dispatchEvent(event);

    // Apply consent-based actions (e.g., if analytics consented, load analytics scripts)
    applyConsent(prefs);
  };

  // Apply consent configuration
  const applyConsent = (prefs) => {
    if (prefs.analytics) {
      console.log('Wish Upon a Starre: Analytics cookies enabled.');
      // Placeholder: load Google Analytics or similar
    } else {
      console.log('Wish Upon a Starre: Analytics cookies disabled.');
    }
    if (prefs.marketing) {
      console.log('Wish Upon a Starre: Marketing cookies enabled.');
      // Placeholder: load Facebook Pixel or similar
    } else {
      console.log('Wish Upon a Starre: Marketing cookies disabled.');
    }
  };

  // Build and inject HTML components
  const initCookieConsent = () => {
    injectCookieStyles();
    const storedPrefs = getStoredPrefs();

    // 1. Create Preferences Modal (always inject, can be opened from banner or footer)
    const modal = document.createElement('div');
    modal.id = 'cookie-preferences-modal';
    modal.className = 'fixed inset-0 z-50 items-center justify-center p-4 cookie-modal-backdrop hidden transition-opacity duration-300';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cookie-modal-title');
    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-purple-100 max-h-[90vh] overflow-y-auto" id="cookie-modal-content">
        <button id="close-cookie-modal" class="absolute top-4 right-4 text-gray-400 hover:text-indigo-950 transition-colors p-2 rounded-full hover:bg-gray-50" aria-label="Close preferences modal">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex items-center space-x-2 mb-4">
          <span class="text-amber-500 animate-sparkle text-2xl">✨</span>
          <h2 id="cookie-modal-title" class="text-2xl font-bold text-indigo-950">Cookie Preferences</h2>
        </div>

        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
          We respect your privacy. Adjust the toggles below to control which cookies you permit us to use. You can read more in our 
          <a href="cookie-policy.html" class="text-purple-700 hover:underline font-semibold">Cookie Policy</a>.
        </p>

        <!-- Preferences Form -->
        <div class="space-y-4 mb-8">
          <!-- Necessary -->
          <div class="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div class="pr-4">
              <span class="font-bold text-indigo-950 text-sm block">Strictly Necessary Cookies</span>
              <span class="text-xs text-gray-500 block leading-normal mt-0.5">Required for core features, page navigation, and secure session management. Cannot be disabled.</span>
            </div>
            <div class="flex items-center">
              <span class="text-xs font-semibold text-purple-700 mr-2 uppercase tracking-wide">Always On</span>
              <input type="checkbox" checked disabled class="h-5 w-5 rounded text-purple-600 border-gray-300 focus:ring-purple-500 opacity-60 cursor-not-allowed">
            </div>
          </div>

          <!-- Analytics -->
          <div class="flex items-start justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
            <div class="pr-4">
              <span class="font-bold text-indigo-950 text-sm block">Analytics Cookies</span>
              <span class="text-xs text-gray-500 block leading-normal mt-0.5">Allows us to analyze visitor behavior to understand how the site is used, helping us deliver a more magical experience.</span>
            </div>
            <div class="flex items-center h-5">
              <input type="checkbox" id="cookie-toggle-analytics" class="h-5 w-5 rounded text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer accent-purple-600">
            </div>
          </div>

          <!-- Marketing -->
          <div class="flex items-start justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
            <div class="pr-4">
              <span class="font-bold text-indigo-950 text-sm block">Marketing & Social Cookies</span>
              <span class="text-xs text-gray-500 block leading-normal mt-0.5">Used to provide personalized social media features and analyze the effectiveness of our seasonal announcements and campaigns.</span>
            </div>
            <div class="flex items-center h-5">
              <input type="checkbox" id="cookie-toggle-marketing" class="h-5 w-5 rounded text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer accent-purple-600">
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button id="save-cookie-choices" class="w-full bg-purple-700 hover:bg-purple-800 text-white text-sm font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-purple-200 transition-all duration-200">
            Save My Choices
          </button>
          <button id="accept-all-from-modal" class="w-full bg-indigo-950 hover:bg-indigo-900 text-white text-sm font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200">
            Accept All Cookies
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Set initial toggle states in modal if preferences exist
    if (storedPrefs) {
      applyConsent(storedPrefs);
      document.getElementById('cookie-toggle-analytics').checked = !!storedPrefs.analytics;
      document.getElementById('cookie-toggle-marketing').checked = !!storedPrefs.marketing;
    }

    // 2. Create Banner if no consent decision is saved
    let banner = null;
    if (!storedPrefs) {
      banner = document.createElement('div');
      banner.id = 'cookie-consent-banner';
      banner.className = 'fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-purple-100 cookie-banner px-4 py-6 sm:px-6 sm:py-5 transform translate-y-full opacity-0 transition-all duration-500 ease-out';
      banner.setAttribute('role', 'region');
      banner.setAttribute('aria-label', 'Cookie Consent Notice');
      banner.innerHTML = `
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-start space-x-3 max-w-3xl">
            <span class="text-xl mt-0.5 block animate-sparkle">✨</span>
            <div class="text-sm text-gray-600 leading-relaxed">
              <strong class="text-indigo-950 font-bold block mb-0.5">Magic cookies await!</strong>
              We use necessary cookies to make this website work. With your permission, we may also use optional cookies to understand how people use the site and improve it. You can accept, reject, or manage your choices.
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <button id="cookie-reject-all" class="text-xs sm:text-sm text-gray-500 hover:text-indigo-950 font-semibold px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-150">
              Reject Optional
            </button>
            <button id="cookie-manage-choices" class="text-xs sm:text-sm text-purple-700 hover:text-purple-800 font-semibold px-4 py-2.5 rounded-lg border border-purple-100 bg-purple-50 hover:bg-purple-100 transition-all duration-150">
              Manage Choices
            </button>
            <button id="cookie-accept-all" class="text-xs sm:text-sm bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg hover:shadow-purple-100 transition-all duration-150">
              Accept Optional
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(banner);

      // Trigger slide-in animation shortly after load
      setTimeout(() => {
        banner.classList.add('cookie-banner-active');
      }, 800);
    }

    // Modal Interaction Functions
    let previousActiveElement = null;

    const openPreferencesModal = () => {
      previousActiveElement = document.activeElement;
      modal.classList.add('cookie-modal-open');
      modal.focus();

      // Focus trap setup
      const focusableElements = modal.querySelectorAll('button, [type="checkbox"], a');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      modal.addEventListener('keydown', function trapFocus(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
        if (e.key === 'Escape') {
          closePreferencesModal();
        }
      });
      
      // Auto focus close button first
      document.getElementById('close-cookie-modal').focus();
    };

    const closePreferencesModal = () => {
      modal.classList.remove('cookie-modal-open');
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };

    // Event Listeners for Banner
    if (banner) {
      document.getElementById('cookie-accept-all').addEventListener('click', () => {
        savePrefs(true, true, true);
        hideBanner();
      });

      document.getElementById('cookie-reject-all').addEventListener('click', () => {
        savePrefs(true, false, false);
        hideBanner();
      });

      document.getElementById('cookie-manage-choices').addEventListener('click', () => {
        openPreferencesModal();
      });
    }

    // Event Listeners for Modal
    document.getElementById('close-cookie-modal').addEventListener('click', () => {
      closePreferencesModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePreferencesModal();
      }
    });

    document.getElementById('save-cookie-choices').addEventListener('click', () => {
      const analyticsConsented = document.getElementById('cookie-toggle-analytics').checked;
      const marketingConsented = document.getElementById('cookie-toggle-marketing').checked;
      savePrefs(true, analyticsConsented, marketingConsented);
      closePreferencesModal();
      hideBanner();
    });

    document.getElementById('accept-all-from-modal').addEventListener('click', () => {
      savePrefs(true, true, true);
      document.getElementById('cookie-toggle-analytics').checked = true;
      document.getElementById('cookie-toggle-marketing').checked = true;
      closePreferencesModal();
      hideBanner();
    });

    const hideBanner = () => {
      if (banner) {
        banner.classList.remove('cookie-banner-active');
        setTimeout(() => {
          banner.remove();
        }, 500);
      }
    };

    // Global hooks to open modal from "Manage cookies" buttons/links
    window.openCookieSettings = () => {
      openPreferencesModal();
    };

    // Bind footer links dynamically
    document.querySelectorAll('[data-manage-cookies], .manage-cookies-btn, a[href="#manage-cookies"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openPreferencesModal();
      });
    });
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
