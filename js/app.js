import axios from 'axios';

class LojaFelix {
    constructor() {
        this.produtos = [
            ...this.getProdutosAnteriores(),
            ...this.getNovosEbooks()
        ];
        
        this.carrinho = [];
        this.initEventListeners();
        this.renderizarProdutos();
        this.preencherCategorias();
    }

    getProdutosAnteriores() {
        return [
            {
                id: 1,
                nome: "Camiseta Básica",
                descricao: "Camiseta de algodão confortável",
                preco: 29.99,
                categoria: "Vestuário",
                imagem: "https://via.placeholder.com/150",
                estoque: 50
            },
            {
                id: 2,
                nome: "Calça Jeans",
                descricao: "Calça jeans moderna e elegante",
                preco: 89.90,
                categoria: "Vestuário",
                imagem: "https://via.placeholder.com/150",
                estoque: 30
            },
            {
                id: 3,
                nome: "Tênis Esportivo",
                descricao: "Tênis confortável para corrida",
                preco: 129.99,
                categoria: "Calçados",
                imagem: "https://via.placeholder.com/150",
                estoque: 20
            },
            {
                id: 4,
                nome: "Moletom",
                descricao: "Moletom quentinho para dias frios",
                preco: 59.90,
                categoria: "Vestuário",
                imagem: "https://via.placeholder.com/150",
                estoque: 25
            }
        ];
    }

    getNovosEbooks() {
        return [
            {
                id: 5,
                nome: "Marketing Digital para Iniciantes",
                descricao: "Guia completo para começar no marketing digital",
                preco: 19.90,
                categoria: "Ebooks",
                imagem: "https://m.media-amazon.com/images/I/717xEhKRz1L._SY425_.jpg",
                estoque: 100
            },
            {
                id: 6,
                nome: "Programação Web Descomplicada",
                descricao: "Aprenda desenvolvimento web do zero",
                preco: 24.90,
                categoria: "Ebooks",
                imagem: "https://m.media-amazon.com/images/I/71S05kWoI4L._SY425_.jpg",
                estoque: 75
            },
            {
                id: 7,
                nome: "Finanças Pessoais Inteligentes",
                descricao: "Estratégias para conquistar sua independência financeira",
                preco: 17.50,
                categoria: "Ebooks",
                imagem: "https://m.media-amazon.com/images/I/61ddeQVmLLL._SY425_.jpg",
                estoque: 60
            },
            {
                id: 8,
                nome: "Design UX Essencial",
                descricao: "Princípios fundamentais de experiência do usuário",
                preco: 29.90,
                categoria: "Ebooks",
                imagem: "https://m.media-amazon.com/images/I/61dNmiMoZpL._SY385_.jpg",
                estoque: 50
            },
            {
                id: 9,
                nome: "Gestão de Projetos Modernos",
                descricao: "Estratégias contemporâneas de gerenciamento",
                preco: 34.50,
                categoria: "Ebooks",
                imagem: "https://m.media-amazon.com/images/I/717xEhKRz1L._SY425_.jpg",
                estoque: 40
            }
        ];
    }

    initEventListeners() {
        document.getElementById('loginForm').addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('cadastroForm').addEventListener('submit', this.handleCadastro.bind(this));
        document.getElementById('finalizarCompra').addEventListener('click', this.finalizarCompra.bind(this));
        
        // Adicionar evento de filtro de categoria
        const categoriaFiltro = document.getElementById('categoriaFiltro');
        categoriaFiltro.addEventListener('change', this.filtrarProdutos.bind(this));
        
        // Adicionar evento de busca
        const buscarProduto = document.getElementById('buscarProduto');
        buscarProduto.addEventListener('input', this.filtrarProdutos.bind(this));
    }

    preencherCategorias() {
        const categoriaFiltro = document.getElementById('categoriaFiltro');
        const categorias = [...new Set(this.produtos.map(p => p.categoria))];
        
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categoriaFiltro.appendChild(option);
        });
    }

    renderizarProdutos(produtosFiltrados = null) {
        const listaProdutos = document.getElementById('listaProdutos');
        const produtos = produtosFiltrados || this.produtos;
        
        listaProdutos.innerHTML = produtos.map(produto => `
            <div class="produto-card" data-id="${produto.id}">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <p>Estoque: ${produto.estoque}</p>
                <button onclick="lojaFelix.adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            </div>
        `).join('');
    }

    filtrarProdutos() {
        const categoriaFiltro = document.getElementById('categoriaFiltro').value;
        const termoBusca = document.getElementById('buscarProduto').value.toLowerCase();

        const produtosFiltrados = this.produtos.filter(produto => {
            const categoriaCombina = !categoriaFiltro || produto.categoria === categoriaFiltro;
            const nomeCombina = produto.nome.toLowerCase().includes(termoBusca);
            const descricaoCombina = produto.descricao.toLowerCase().includes(termoBusca);
            
            return categoriaCombina && (nomeCombina || descricaoCombina);
        });

        this.renderizarProdutos(produtosFiltrados);
    }

    adicionarAoCarrinho(produtoId) {
        const produto = this.produtos.find(p => p.id === produtoId);
        if (produto && produto.estoque > 0) {
            // Verificar se o produto já está no carrinho
            const itemNoCarrinho = this.carrinho.find(item => item.id === produtoId);
            
            if (itemNoCarrinho) {
                // Se já estiver, aumentar quantidade
                itemNoCarrinho.quantidade++;
            } else {
                // Se não estiver, adicionar novo item
                this.carrinho.push({
                    ...produto,
                    quantidade: 1
                });
            }
            
            // Reduzir estoque
            produto.estoque--;
            
            this.atualizarCarrinho();
        } else {
            alert('Produto indisponível');
        }
    }

    atualizarCarrinho() {
        const carrinhoItens = document.getElementById('carrinhoItens');
        const carrinhoTotal = document.getElementById('carrinhoTotal');
        
        carrinhoItens.innerHTML = this.carrinho.map(item => `
            <div class="item-carrinho">
                ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <button onclick="lojaFelix.removerDoCarrinho(${item.id})">Remover</button>
            </div>
        `).join('');

        const total = this.carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

        // Renderizar novamente os produtos para atualizar o estoque
        this.renderizarProdutos();
    }

    removerDoCarrinho(produtoId) {
        const indiceProduto = this.carrinho.findIndex(item => item.id === produtoId);
        
        if (indiceProduto !== -1) {
            const produto = this.produtos.find(p => p.id === produtoId);
            const itemCarrinho = this.carrinho[indiceProduto];
            
            // Devolver o estoque
            produto.estoque += itemCarrinho.quantidade;
            
            // Remover do carrinho
            this.carrinho.splice(indiceProduto, 1);
            
            this.atualizarCarrinho();
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        alert('Função de login será implementada posteriormente');
    }

    async handleCadastro(event) {
        event.preventDefault();
        alert('Função de cadastro será implementada posteriormente');
    }

    async finalizarCompra() {
        if (this.carrinho.length === 0) {
            alert('Seu carrinho está vazio');
            return;
        }

        alert('Compra finalizada com sucesso!\nObrigado por comprar na Felix Store!');
        
        // Limpar carrinho após finalizar compra
        this.carrinho = [];
        this.atualizarCarrinho();
    }
}

window.lojaFelix = new LojaFelix();
