/**
 * SIT WITH FIT — HERO SHOWCASE SELECTOR
 * Manages thumbnail preview switching and tag descriptions
 */

export function initShowcaseSelector() {
    const cards = document.querySelectorAll('.selector-card');
    const mainImg = document.getElementById('heroActiveImg');
    const tagText = document.getElementById('heroActiveTag');

    if (!mainImg || !cards.length) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const newImg = card.getAttribute('data-img');
            const newTag = card.getAttribute('data-tag');

            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = newImg;
                if (tagText) tagText.textContent = newTag;
                mainImg.style.opacity = '1';
            }, 120);
        });
    });
}

// Global attach
if (typeof window !== 'undefined') {
    window.initShowcaseSelector = initShowcaseSelector;
}
