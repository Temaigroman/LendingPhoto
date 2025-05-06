// Бургер-меню
document.getElementById('menuToggle').addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
});

// Галерея
const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const imageArray = Array.from(images);

// Открытие изображения
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие лайтбокса
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Навигация по изображениям
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
    updateLightboxImage();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % imageArray.length;
    updateLightboxImage();
});

// Закрытие по клику на фон
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Обновление изображения в лайтбоксе
function updateLightboxImage() {
    const imgSrc = imageArray[currentImageIndex].getAttribute('src');
    const imgAlt = imageArray[currentImageIndex].getAttribute('alt');
    lightboxImg.setAttribute('src', imgSrc);
    lightboxImg.setAttribute('alt', imgAlt);
}

// Навигация с клавиатуры
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'ArrowLeft':
            currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
            updateLightboxImage();
            break;
        case 'ArrowRight':
            currentImageIndex = (currentImageIndex + 1) % imageArray.length;
            updateLightboxImage();
            break;
        case 'Escape':
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            break;
    }
});