import { isFavorite, toggleFavorite } from '../assets/js/services/favoritesManager.js';

export const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    const isFavorited = isFavorite(product.id);
    const favClass = isFavorited ? 'favorited' : '';
    const favText = isFavorited ? '♥' : '♡';

    card.innerHTML = `
        <div class="image-container">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="info">
            <h3 class="title">${product.title}</h3>
            <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <div class="actions">
                <button class="fav-button ${favClass}" data-product-id="${product.id}">${favText}</button>
            </div>
        </div>
    `;

    const favButton = card.querySelector('.fav-button');
    favButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(product.id);
        
        favButton.classList.toggle('favorited');
        favButton.textContent = favButton.classList.contains('favorited') ? '♥' : '♡';
        
        document.dispatchEvent(new CustomEvent('favoritesUpdated'));
    });

    return card;
};