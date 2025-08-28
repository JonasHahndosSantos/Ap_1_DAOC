// assets/js/services/favoritesManager.js
const FAVORITES_KEY = 'myFavoriteProducts';

// Carrega os favoritos do localStorage
export const loadFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

// Salva os favoritos no localStorage
const saveFavorites = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

// Verifica se um produto é favorito
export const isFavorite = (productId) => {
    const favorites = loadFavorites();
    return favorites.includes(productId);
};

// Adiciona ou remove um favorito
export const toggleFavorite = (productId) => {
    let favorites = loadFavorites();
    if (isFavorite(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }
    saveFavorites(favorites);
};