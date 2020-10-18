import gallery from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const galleryMarkup = createGallery(gallery);
const galleryModalWindow = document.querySelector(".lightbox");
const galleryModalWindowOverlay = document.querySelector(".lightbox__overlay");
const modalWindowCloseButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);
galleryModalWindowOverlay.addEventListener("click", windowCloseButton);
modalWindowCloseButton.addEventListener("click", windowCloseButton);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryImgClick);

window.addEventListener("keydown", escModalWindowClose);

/**
 * Функция создания разметки галереи
 */
function createGallery(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>
    `;
    })
    .join("");
}

/**
 * Функция обработки события при нажатии на элемент галереи
 */
function onGalleryImgClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName === "IMG") {
    galleryModalWindow.classList.add("is-open");
    galleryModalWindow.querySelector(".lightbox__image").src =
      evt.target.dataset.source;
    galleryModalWindow.querySelector(".lightbox__image").alt = evt.target.alt;
  }
}

/**
 * Функция проверки на нажатие клавиши esc и закрытие модального окна если true
 */
function escModalWindowClose(evt) {
  if (evt.key === "Escape") {
    windowCloseButton();
  }
}

/**
 * Функция закрытия модального окна - будет использована и для клавиши esc и для кнопки с крестиком
 */
function windowCloseButton() {
  galleryModalWindow.classList.remove("is-open");
  galleryModalWindow.querySelector(".lightbox__image").src = "";
  galleryModalWindow.querySelector(".lightbox__image").alt = "";
}
