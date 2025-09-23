const projeto = {
    id: "Projeto Site PokeWorld",
    nome: "PokeWorld",
    descricao: "O intuito do site será a visualização de pokemons, aquisição de pokemons favoritos, visualização de pokemons relevantes e exploração/informação geral de pokemons.",
    dataInicio: "2025-08-03",
    dataFimPrevia: "2025-08-10",
    status: "Em Andamento",

    pokemonsDisponiveis: [
        {
            id: "0004",
            nome: "Charmander",
            descricao: "A chama na sua cauda mostra a vitalidade. Se apagar, ele não sobreviverá.",
            altura: "0,6m",
            peso: "8,5 kg",
            categoria: "Lagarto",
            habilidade: "Chama",
            tipo: "Fogo",
            raridade: "Comum",
            status: {
                hp: 60,
                ataque: 52,
                defesa: 43,
                velocidade: 65
            },
            imagem: "" // Inserir o caminho da imagem aqui no futuro
        },
        {
            id: "0007",
            nome: "Squirtle",
            descricao: "Um Squirtle se esconde em sua carapaça e se protege de ataques lançando jatos de água.",
            altura: "0,5m",
            peso: "9,0 kg",
            categoria: "Tartaruga Marinha",
            habilidade: "Torrente",
            tipo: "Água",
            raridade: "Comum",
            status: {
                hp: 44,
                ataque: 48,
                defesa: 65,
                velocidade: 43
            },
            imagem: "" // Inserir o caminho da imagem aqui no futuro
        },
        {
            id: "0001",
            nome: "Bulbasaur",
            descricao: "Desde que nasce, um Bulbasaur armazena energia e nutrientes em seu bulbo, preparando-se para evoluir.",
            altura: "0,7m",
            peso: "6,9 kg",
            categoria: "Semente",
            habilidade: "Overgrow",
            tipo: "Planta",
            raridade: "Comum",
            status: {
                hp: 45,
                ataque: 49,
                defesa: 49,
                velocidade: 45
            },
            imagem: "" // Inserir o caminho da imagem aqui no futuro
        },
    ],

    // Esta lista armazena os IDs dos Pokémons que devem ser exibidos na seção de 'Pokémons Relevantes' da página inicial.
    pokemonsRelevantes: [
        "0004",
        "0007",
        "0001"
    ],

    // Esta lista armazenará os IDs dos Pokémons que o usuário adicionar à sua lista de favoritos.
    // O conteúdo será salvo e recuperado usando o armazenamento local do navegador (localStorage).
    pokemonsFavoritos: [] 
};

// Esta função construtora pode ser usada para criar novos objetos Pokémon de forma mais fácil.
function Pokemon(id, nome, descricao, altura, peso, categoria, habilidade, tipo, raridade, status, imagem) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.altura = altura;
    this.peso = peso;
    this.categoria = categoria;
    this.habilidade = habilidade;
    this.tipo = tipo;
    this.raridade = raridade;
    this.status = status;
    this.imagem = imagem;
}