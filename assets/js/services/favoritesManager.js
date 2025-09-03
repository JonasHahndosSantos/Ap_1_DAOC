const FAVORITES_KEY = 'myFavoriteProducts';

export const loadFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

const saveFavorites = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (productId) => {
    const favorites = loadFavorites();
    return favorites.includes(productId);
};

export const toggleFavorite = (productId) => {
    let favorites = loadFavorites();
    if (isFavorite(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }
    saveFavorites(favorites);
};