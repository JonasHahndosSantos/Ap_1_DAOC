// assets/js/main.js
import { $ } from './utils/dom.js';
// O import de 'api.js' foi REMOVIDO
import { loadFavorites } from './services/favoritesManager.js';
import { renderHeader } from '../../components/Header.js';
import { createProductCard } from '../../components/ProductCard.js';

// --- LÓGICA DA API MOVIDA PARA CÁ ---
const API_URL = 'https://fakestoreapi.com/products';

const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Falha ao buscar produtos:", error);
        // Exibe uma mensagem de erro na tela para o usuário
        $('#product-list').innerHTML = '<p class="error-message">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
        return [];
    }
};
// --- FIM DA LÓGICA DA API ---


// Seletores do DOM
const mainHeader = $('#main-header');
const productListContainer = $('#product-list');
const favoriteListContainer = $('#favorite-list');
const productsPage = $('#products-page');
const favoritesPage = $('#favorites-page');
const loader = $('#loader');
const searchInput = $('#search-input');

let allProducts = [];

// Função para renderizar produtos
const renderProducts = (products, container) => {
    container.innerHTML = '';
    if (products.length === 0 && container === favoriteListContainer) {
        container.innerHTML = '<p>Você ainda não tem produtos favoritos.</p>';
    } else {
        products.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }
};

// Função para renderizar a página de favoritos
const renderFavorites = () => {
    const favoriteIds = loadFavorites();
    const favoriteProducts = allProducts.filter(product => favoriteIds.includes(product.id));
    renderProducts(favoriteProducts, favoriteListContainer);
};

// Gerenciador de Navegação da SPA
const navigate = (hash) => {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    let activeLink = $(`a[href="${hash}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    switch (hash) {
        case '#favorites':
            favoritesPage.style.display = 'block';
            renderFavorites();
            break;
        case '#products':
        default:
            productsPage.style.display = 'block';
            if (allProducts.length > 0) {
                 renderProducts(allProducts, productListContainer);
            }
            break;
    }
};

// Função de inicialização
const init = async () => {
    renderHeader(mainHeader);
    loader.style.display = 'flex';

    allProducts = await fetchProducts(); // Agora chama a função local
    
    // Só renderiza e esconde o loader se os produtos forem carregados
    if (allProducts.length > 0) {
        renderProducts(allProducts, productListContainer);
    }

    loader.style.display = 'none';

    const currentHash = window.location.hash || '#products';
    navigate(currentHash);

    window.addEventListener('hashchange', () => {
        navigate(window.location.hash);
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts, productListContainer);
    });

    document.addEventListener('favoritesUpdated', () => {
        if (favoritesPage.style.display === 'block') {
            renderFavorites();
        }
    });
};

document.addEventListener('DOMContentLoaded', init);