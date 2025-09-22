# ProjetoPokemon
const pokemon = {
  id: 4, 
  nome: "Charmander",
  numeroPokedex: "#004",
  tipo: ["Fogo"], 
  raridade: "Raro", 
  imagemCard: "url_da_imagem_do_card.png", 
  imagemDetalhes: "url_da_imagem_de_detalhes.png", 
  peso: 8.5,
  altura: 0.6,
  habilidade: "Chama",
  descricao: "A chama na sua cauda mostra a vitalidade. Se apagar, ele não sobreviverá.",
  status: { 
    hp: 60,
    ataque: 52,
    defesa: 43,
    velocidade: 65
  },
  movimentos: [
    {
      nome: "Arranhar",
      dano: 10
    },
    {
      nome: "Brasas",
      dano: 20
    }
  ]
};