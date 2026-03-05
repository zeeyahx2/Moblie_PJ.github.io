function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'th',
        includedLanguages: 'th,en',
    }, 'google_translate_element');

    setTimeout(() => {
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner) banner.style.display = 'none';
        document.body.style.top = '0';
        document.body.style.position = 'static';
    }, 1000);
}

function switchLang(lang, btnEl) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
    }

    document.querySelectorAll('text[data-th], tspan[data-th]').forEach(el => {
        const translation = el.getAttribute('data-' + lang);
        if (translation) el.textContent = translation;
    });
}

window.googleTranslateElementInit = googleTranslateElementInit;
window.switchLang = switchLang;