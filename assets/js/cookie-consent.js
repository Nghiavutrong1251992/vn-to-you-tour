(function() {
    function initCookieConsent() {
        // 0. Inject HTML if not present
        if (!document.getElementById('cookieBanner')) {
            const banner = document.createElement('div');
            banner.id = 'cookieBanner';
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                </div>
                <div class="cookie-actions">
                    <button id="declineCookie" class="cookie-btn decline">Decline</button>
                    <button id="acceptCookie" class="cookie-btn">Accept</button>
                </div>
            `;
            document.body.appendChild(banner);
        }

        const cookieBanner = document.getElementById('cookieBanner');
        const acceptBtn = document.getElementById('acceptCookie');
        const declineBtn = document.getElementById('declineCookie');

        // 1. Check if user has already accepted or declined
        if (!getCookie('user_consent')) {
            // Show banner with a slight delay for animation effect
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        // 2. Handle Accept Button Click
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                setCookie('user_consent', 'accepted', 365); // Save for 365 days
                cookieBanner.classList.remove('show');
            });
        }

        // 3. Handle Decline Button Click
        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                setCookie('user_consent', 'declined', 365); // Save preference
                cookieBanner.classList.remove('show');
            });
        }
    }

    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }

    // --- Helper Functions ---

    // Set a Cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Get a Cookie
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
})();
