// Header.js
export const renderHeader = (container) => {
    container.className = 'main-header';
    container.innerHTML = `
        <div class="logo">FakeStore</div>
        <nav>
            <ul>
                <li><a href="#products" class="nav-link active">Produtos</a></li>
                <li><a href="#favorites" class="nav-link">Favoritos</a></li>
            </ul>
        </nav>
    `;
};