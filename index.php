<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loja Felix</title>
    <link rel="stylesheet" href="/css/styles.css">
    <script type="importmap">
    {
        "imports": {
            "axios": "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
        }
    }
    </script>
</head>
<body>
    <header>
        <nav>
            <div class="logo">Felix Store</div>
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#produtos">Produtos</a>
                <a href="#categorias">Categorias</a>
                <a href="#carrinho">Carrinho</a>
                <a href="#login">Login</a>
            </div>
        </nav>
    </header>

    <main>
        <section id="banner">
            <div class="banner-content">
                <h1>Felix Digital Store</h1>
                <p>Transforme seu conhecimento em sucesso!</p>
                <a href="#produtos" class="banner-cta">Ver Ebooks</a>
            </div>
        </section>

        <section id="destaques-ebooks">
            <h2>Nossos Ebooks em Destaque</h2>
            <div id="listaEbooks" class="grid-produtos"></div>
        </section>

        <section id="home">
            <h1>Bem-vindo à Felix Store</h1>
            <div id="destaques"></div>
        </section>

        <section id="produtos">
            <h2>Nossos Produtos</h2>
            <div class="filtros">
                <select id="categoriaFiltro">
                    <option value="">Todas Categorias</option>
                </select>
                <input type="text" id="buscarProduto" placeholder="Buscar produto">
            </div>
            <div id="listaProdutos" class="grid-produtos"></div>
        </section>

        <section id="carrinho">
            <h2>Carrinho de Compras</h2>
            <div id="carrinhoItens"></div>
            <div id="carrinhoTotal"></div>
            <button id="finalizarCompra">Finalizar Compra</button>
        </section>

        <section id="login">
            <h2>Login / Cadastro</h2>
            <div class="login-container">
                <form id="loginForm">
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Senha" required>
                    <button type="submit">Entrar</button>
                </form>
                <form id="cadastroForm">
                    <input type="text" placeholder="Nome" required>
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Senha" required>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <h4>Felix Digital Store</h4>
                <p>CNPJ: 12.345.678/0001-90</p>
                <p>Rua Digital, 123 - Centro</p>
                <p>São Paulo - SP, 01234-567</p>
            </div>
            <div class="footer-column">
                <h4>Contato</h4>
                <p> (11) 99999-9999</p>
                <p> contato@felixdigital.com.br</p>
                <p>Horário: Seg-Sex, 9h-18h</p>
            </div>
            <div class="footer-column">
                <h4>Links Rápidos</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#produtos">Produtos</a></li>
                    <li><a href="#carrinho">Carrinho</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Felix Digital Store. Todos os direitos reservados.</p>
        </div>
    </footer>

    <script type="module" src="/js/app.js"></script>
</body>
</html>
