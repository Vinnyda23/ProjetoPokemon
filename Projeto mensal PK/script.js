// =================================================================
// DADOS
// =================================================================
const POKEMON_DATA_JSON = [
  {
    id: 1,
    name: "Bulbasaur",
    type: "Grama",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    status: "Bulbasaur.png",
  },
  {
    id: 7,
    name: "Squirtle",
    type: "Agua",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    status: "Squirtle.png",
  },
  {
    id: 4,
    name: "Charmander",
    type: "Fogo",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    status: "Charmander2.png",
  },
  {
    id: 52,
    name: "Meowth",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    status: "Meowth.png",
  },
  {
    id: 10,
    name: "Caterpie",
    type: "Inseto",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
    status: "Caterpie.png",
  },
  {
    id: 149,
    name: "Dragonite",
    type: "Dragão",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    status: "Dragonite.jpg",
  },
  {
    id: 16,
    name: "Pidgey",
    type: "Voador",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    status: "pidgey.png",
  },
  {
    id: 143,
    name: "Snorlax",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    status: "Snorlax.png",
  },
  {
    id: 25,
    name: "Pikachu",
    type: "Electrico",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    status: "Pikachu.png",
  },
  {
    id: 21,
    name: "Spearow",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
    status: "Spearow.png",
  },
  {
    id: 19,
    name: "Rattata",
    type: "Normal",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
    status: "Rattata.png",
  },
  {
    id: 39,
    name: "Jigglypuff",
    type: "Fada",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    status: "Jigglypuff.png",
  },
];

// =================================================================
// REFERÊNCIAS DE ELEMENTOS HTML
// =================================================================
const container = document.getElementById("pokemon-container");
const searchInput = document.getElementById("searchInput");
const showAllBtn = document.getElementById("show-all-btn");
const showFavoritesBtn = document.getElementById("show-favorites-btn");

// Variáveis para o Modal (Declaradas no topo para acesso global)
const modal = document.getElementById("modal-1");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonNameModal = document.getElementById("pokemon-name-modal");
const closeModalBtn = document.querySelector(".close-modal-btn");

// =================================================================
// ESTADO GLOBAL
// =================================================================
let allPokemonsData = POKEMON_DATA_JSON;
let isShowingFavorites = false;

// =================================================================
// FUNÇÕES DE FAVORITOS (MOCK)
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
// FUNÇÕES DE MODAL (ABRIR E FECHAR)
// =================================================================

function openPokemonModal(pokemonData) {
  if (!modal) return; // Garante que o modal exista // 1. Atualiza a imagem // **MUDANÇA AQUI:** Verifica se 'status' existe e usa, senão usa 'image'.

  if (pokemonData && (pokemonData.status || pokemonData.image)) {
    const imageUrl = pokemonData.status || pokemonData.image;
    pokemonImage.src = imageUrl;
    pokemonImage.alt = `Imagem do Pokémon ${pokemonData.name}`;
  } // 2. Atualiza o nome

  if (pokemonData && pokemonData.name) {
    const capitalizedName =
      pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonNameModal.textContent = capitalizedName;
  } // 3. Abre o modal

  modal.showModal();
}

// =================================================================
// FUNÇÕES DE EXIBIÇÃO E FILTRO
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
  if (searchInput) searchInput.value = "";
  if (showAllBtn && showFavoritesBtn) {
    showAllBtn.classList.add("active-filter");
    showFavoritesBtn.classList.remove("active-filter");
  }

  filterAndDisplay();
}

function showOnlyFavorites() {
  isShowingFavorites = true;
  if (searchInput) searchInput.value = "";
  if (showAllBtn && showFavoritesBtn) {
    showFavoritesBtn.classList.add("active-filter");
    showAllBtn.classList.remove("active-filter");
  }

  filterAndDisplay();
}

// =================================================================
// FUNÇÃO DE CRIAÇÃO DO CARD (com Lógica de Favoritos e Modal)
// =================================================================
function criarCardPokemon(id, nome, imageURL, type) {
  const card = document.createElement("div");
  card.id = `pokemon-card-${id}`;
  card.classList.add("pokemon-card");

  const typeBall = document.createElement("span");
  typeBall.classList.add("type", type);
  typeBall.setAttribute("data-type", type);
  card.appendChild(typeBall);

  const favStar = document.createElement("i");
  favStar.classList.add("fas", "fa-star");

  favStar.style.position = "absolute";
  favStar.style.top = "10px";
  favStar.style.right = "10px";
  favStar.style.fontSize = "1.5em";
  favStar.style.cursor = "pointer";
  favStar.style.transition = "color 0.1s ease";

  favStar.style.color = isFavorite(id) ? "gold" : "#ccc";

  // Listener para Favoritar/Desfavoritar
  favStar.onclick = (e) => {
    e.stopPropagation(); // Previne que o clique abra o modal
    const isNowFavorite = toggleFavorite(id);

    favStar.style.color = isNowFavorite ? "gold" : "#ccc";

    // Se desfavoritar no modo favoritos, remove o card
    if (isShowingFavorites && !isNowFavorite) {
      if (searchInput && searchInput.value) {
        filterAndDisplay();
      } else {
        card.remove();
        if (getFavorites().length === 0) {
          filterAndDisplay();
        }
      }
    }
  };

  const imagem = document.createElement("img");
  imagem.src = imageURL;
  imagem.alt = nome;

  const titulo = document.createElement("h3");
  titulo.textContent = `${nome.charAt(0).toUpperCase() + nome.slice(1)}`;

  card.appendChild(favStar);
  card.appendChild(imagem);
  card.appendChild(titulo);
  container.appendChild(card);

  // Listener de Clique do Card para Abrir o Modal
  card.addEventListener("click", () => {
    const pokemonData = allPokemonsData.find((p) => p.id === id);
    if (pokemonData) {
      openPokemonModal(pokemonData);
    }
  });
}

// =================================================================
// INICIALIZAÇÃO DE EVENTOS
// =================================================================

function inicializarEventos() {
  // Eventos da Barra de Busca e Filtro
  if (searchInput) {
    searchInput.addEventListener("input", filterAndDisplay);
  }
  if (showAllBtn) {
    showAllBtn.addEventListener("click", showAllPokemons);
  }
  if (showFavoritesBtn) {
    showFavoritesBtn.addEventListener("click", showOnlyFavorites);
  }

  // Eventos do Modal (Fechamento)
  if (modal) {
    // Fechar ao clicar no fundo (backdrop)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  }

  // Fechar com o botão 'X'
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.close();
    });
  }

  // Inicia a exibição de todos os Pokémons
  showAllPokemons();
  console.log("Dados carregados e eventos inicializados.");
}

// Inicia o script quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", inicializarEventos);
