const POKEMON_DATA_JSON = [
  {
    id: 1,
    name: "Bulbasaur",
    type: "Grama",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  {
    id: 7,
    name: "Squirtle",
    type: "Agua",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  },
  {
    id: 4,
    name: "Charmander",
    type: "Fogo",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    id: 52,
    name: "Meowth",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
  },
  {
    id: 10,
    name: "Caterpie",
    type: "Inseto",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
  },
  {
    id: 149,
    name: "Dragonite",
    type: "Dragão",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
  },
  {
    id: 16,
    name: "Pidgey",
    type: "Voador",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
  },
  {
    id: 143,
    name: "Snorlax",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
  },
  {
    id: 25,
    name: "Pikachu",
    type: "Electrico",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  },
  {
    id: 21,
    name: "Spearow",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
  },
  {
    id: 19,
    name: "Rattata",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
  },
  {
    id: 39,
    name: "Jigglypuff",
    type: "Fada",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
  },
];

const container = document.getElementById("pokemon-container");
const searchInput = document.getElementById("searchInput");
const showAllBtn = document.getElementById("show-all-btn");
const showFavoritesBtn = document.getElementById("show-favorites-btn");

let allPokemonsData = POKEMON_DATA_JSON;
let isShowingFavorites = false;

// =================================================================
//                     FUNÇÕES DE FAVORITOS (MOCK)
// =================================================================

function getFavorites() {
  const favorites = localStorage.getItem("pokemonFavorites");
  return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favoritesArray) {
  localStorage.setItem("pokemonFavorites", JSON.stringify(favoritesArray));
}

function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  const index = favorites.indexOf(id);

  if (index > -1) {
    favorites.splice(index, 1); // Remove
    saveFavorites(favorites);
    return false;
  } else {
    favorites.push(id); // Adiciona
    saveFavorites(favorites);
    return true;
  }
}

// =================================================================
//                    FUNÇÕES DE EXIBIÇÃO E FILTRO
// =================================================================

function displayPokemons(pokemons) {
  if (!container) return;
  container.innerHTML = "";

  if (pokemons.length === 0) {
    const message = document.createElement("h3");
    message.textContent = isShowingFavorites
      ? "Nenhum favorito encontrado."
      : "Nenhum Pokémon encontrado com o nome digitado.";
    message.style.textAlign = "center";
    message.style.marginTop = "50px";
    container.appendChild(message);
    return;
  }

  pokemons.forEach((p) => {
    // CORREÇÃO AQUI: Passando p.image em vez de p.imageUrl
    criarCardPokemon(p.id, p.name, p.image, p.type);
  });
}

function filterAndDisplay() {
  let filteredData = allPokemonsData;
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

  if (isShowingFavorites) {
    const favoritesIds = getFavorites();
    filteredData = filteredData.filter((p) => favoritesIds.includes(p.id));
  }

  if (searchTerm) {
    filteredData = filteredData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  displayPokemons(filteredData);
}

function showAllPokemons() {
  isShowingFavorites = false;
  if (searchInput) searchInput.value = ""; // Atualiza a classe ativa dos botões
  if (showAllBtn && showFavoritesBtn) {
    showAllBtn.classList.add("active-filter");
    showFavoritesBtn.classList.remove("active-filter");
  }

  filterAndDisplay();
  console.log("Mostrando todos os Pokémons.");
}

function showOnlyFavorites() {
  isShowingFavorites = true;
  if (searchInput) searchInput.value = ""; // Atualiza a classe ativa dos botões
  if (showAllBtn && showFavoritesBtn) {
    showFavoritesBtn.classList.add("active-filter");
    showAllBtn.classList.remove("active-filter");
  }

  filterAndDisplay();
  console.log("Mostrando apenas favoritos.");
}

// =================================================================
//              FUNÇÃO DE CRIAÇÃO DO CARD (com Tipo e Favoritos)
// =================================================================
// Nome do parâmetro alterado de imageUrl para imageURL para ser mais claro
function criarCardPokemon(id, nome, imageURL, type) {
  const card = document.createElement("div");
  card.id = `pokemon-card-${id}`;
  card.classList.add("pokemon-card"); // --- ÍCONE DE TIPO (Bolinha) ---

  const typeBall = document.createElement("span");
  typeBall.classList.add("type", type); // Adiciona a classe 'type' e a classe do tipo (ex: 'Grama')
  typeBall.setAttribute("data-type", type); // Adiciona o nome do tipo para o Tooltip CSS
  card.appendChild(typeBall); // --- ÍCONE DE FAVORITO (Estrela) ---

  const favStar = document.createElement("i");
  favStar.classList.add("fas", "fa-star"); // Estilos posicionais da Estrela (necessário para o layout)

  favStar.style.position = "absolute";
  favStar.style.top = "10px";
  favStar.style.right = "10px";
  favStar.style.fontSize = "1.5em";
  favStar.style.cursor = "pointer";
  favStar.style.transition = "color 0.1s ease"; // Cor inicial da estrela

  favStar.style.color = isFavorite(id) ? "gold" : "#ccc"; // Lógica de Favoritar/Desfavoritar

  favStar.onclick = (e) => {
    e.stopPropagation();
    const isNowFavorite = toggleFavorite(id);

    favStar.style.color = isNowFavorite ? "gold" : "#ccc"; // Atualiza a cor // Se estiver no modo 'Favoritos' e o item for desfavoritado, remova-o

    if (isShowingFavorites && !isNowFavorite) {
      // Se o filtro de busca estiver ativo, re-rodamos o filtro
      if (searchInput && searchInput.value) {
        filterAndDisplay();
      } else {
        card.remove(); // Senão, removemos diretamente para performance // Chamamos filterAndDisplay novamente para mostrar a mensagem "Nenhum favorito encontrado" se a lista ficar vazia
        if (getFavorites().length === 0) {
          filterAndDisplay();
        }
      }
    }
  };

  const imagem = document.createElement("img");
  // CORREÇÃO AQUI: Usando o parâmetro imageURL (que agora recebe p.image)
  imagem.src = imageURL;
  imagem.alt = nome;

  const titulo = document.createElement("h3");
  titulo.textContent = `${nome.charAt(0).toUpperCase() + nome.slice(1)}`;

  card.appendChild(favStar);
  card.appendChild(imagem);
  card.appendChild(titulo);
  container.appendChild(card);
}

// =================================================================
//                     INICIALIZAÇÃO E EVENTOS
// =================================================================

function inicializarEventos() {
  if (searchInput) {
    searchInput.addEventListener("input", filterAndDisplay);
  }

  if (showAllBtn) {
    showAllBtn.addEventListener("click", showAllPokemons);
  }
  if (showFavoritesBtn) {
    showFavoritesBtn.addEventListener("click", showOnlyFavorites);
  } // Inicia com o botão "Todos" como ativo visualmente e exibe todos os pokemons
  showAllPokemons();
  console.log("Dados carregados do JSON e exibição iniciada!");
}

document.addEventListener("DOMContentLoaded", inicializarEventos);
