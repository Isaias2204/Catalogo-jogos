// Dados do catalogo_jogos.sql
const generos = [
  { id: 1, nome: 'Ação', descricao: 'Jogos focados em combate e reflexos rápidos' },
  { id: 2, nome: 'RPG', descricao: 'Jogos de interpretação de papéis com evolução de personagem' },
  { id: 3, nome: 'Aventura', descricao: 'Jogos focados em exploração e narrativa' },
  { id: 4, nome: 'Esporte', descricao: 'Simulações de modalidades esportivas' },
  { id: 5, nome: 'Corrida', descricao: 'Jogos de competição com veículos' },
  { id: 6, nome: 'Estratégia', descricao: 'Jogos que exigem planejamento e tomada de decisão' }
];
const plataformas = [
  { id: 1, nome: 'PC', fabricante: 'Diversos' },
  { id: 2, nome: 'PlayStation 5', fabricante: 'Sony' },
  { id: 3, nome: 'Xbox Series X', fabricante: 'Microsoft' },
  { id: 4, nome: 'Nintendo Switch', fabricante: 'Nintendo' },
  { id: 5, nome: 'Mobile', fabricante: 'Diversos' }
];
// [titulo, ano, preco, nota, desenvolvedora, classificacao, multiplayer, id_genero, id_plataforma]
const jogos = [
  ['The Witcher 3: Wild Hunt', 2015, 99.90, 9.8, 'CD Projekt Red', 18, false, 2, 1],
  ['God of War Ragnarök', 2022, 249.90, 9.5, 'Santa Monica Studio', 18, false, 1, 2],
  ['Halo Infinite', 2021, 199.90, 8.2, '343 Industries', 16, true, 1, 3],
  ['The Legend of Zelda: Tears of the Kingdom', 2023, 349.90, 9.7, 'Nintendo', 12, false, 3, 4],
  ['FIFA 23', 2022, 179.90, 7.5, 'EA Sports', 0, true, 4, 2],
  ['Forza Horizon 5', 2021, 229.90, 9.2, 'Playground Games', 0, true, 5, 3],
  ['Civilization VI', 2016, 119.90, 8.8, 'Firaxis Games', 10, true, 6, 1],
  ['Elden Ring', 2022, 229.90, 9.6, 'FromSoftware', 16, true, 2, 1],
  ['Mario Kart 8 Deluxe', 2017, 299.90, 9.3, 'Nintendo', 0, true, 5, 4],
  ['Clash Royale', 2016, 0, 8.0, 'Supercell', 10, true, 6, 5],
  ['Horizon Forbidden West', 2022, 249.90, 9.0, 'Guerrilla Games', 16, false, 3, 2],
  ['Cyberpunk 2077', 2020, 149.90, 8.6, 'CD Projekt Red', 18, false, 2, 1],
  ['Super Mario Odyssey', 2017, 299.90, 9.4, 'Nintendo', 0, false, 3, 4],
  ['Call of Duty: Mobile', 2019, 0, 8.1, 'TiMi Studio', 16, true, 1, 5],
  ['Gran Turismo 7', 2022, 249.90, 8.7, 'Polyphony Digital', 0, true, 5, 2],
  ['Age of Empires IV', 2021, 129.90, 8.4, 'Relic Entertainment', 12, true, 6, 1]
].map(j => ({ titulo: j[0], ano: j[1], preco: j[2], nota: j[3], dev: j[4], idade: j[5], multi: j[6], genero: j[7], plat: j[8] }));

// Nomes dos arquivos na pasta img/ (a extensão pode ser jpg, png, webp ou jpeg)
const nomesImg = ['witcher3','godofwar','halo','zelda','fifa23','forza','civ6','eldenring','mariokart','clashroyale','horizon','cyberpunk','marioodyssey','codmobile','granturismo7','aoe4'];
jogos.forEach((j, i) => j.img = nomesImg[i]);

// Texto sobre cada jogo (mesma ordem da lista acima)
const descricoes = [
  'RPG de mundo aberto em que você controla Geralt de Rívia, um caçador de monstros. As missões têm escolhas que mudam a história, e o mapa é enorme e cheio de vida. É um dos jogos mais premiados da última década.',
  'Continuação de God of War (2018). Kratos e seu filho Atreus enfrentam o Ragnarök, o fim do mundo na mitologia nórdica. Mistura combate intenso com uma história sobre família e destino.',
  'O Master Chief volta em Zeta Halo, um anel gigante cheio de perigos. A campanha tem mundo semiaberto, e o multiplayer online é gratuito, com partidas rápidas contra outros jogadores.',
  'Continuação de Breath of the Wild. Link explora Hyrule, ilhas flutuantes no céu e cavernas profundas. O grande destaque é a liberdade de construir engenhocas e resolver problemas do seu jeito.',
  'Foi o último jogo da série a usar o nome FIFA, antes da EA Sports FC. Traz clubes e seleções do mundo todo, o modo Ultimate Team e partidas online com amigos.',
  'Jogo de corrida em mundo aberto ambientado no México. Você participa do festival Horizon, com carros incríveis, provas variadas e paisagens que vão de desertos a selvas.',
  'Jogo de estratégia por turnos em que você conduz uma civilização da Idade da Pedra até a era moderna. Você escolhe como crescer: pela ciência, pela cultura, pela religião ou pela guerra.',
  'RPG de ação da FromSoftware, com o mundo criado em parceria com o escritor George R. R. Martin. Você explora as Terras Intermédias em busca do Anel Pretérito. É conhecido pela dificuldade e pela sensação de descoberta.',
  'Versão ampliada de Mario Kart 8 para o Nintendo Switch. Tem pistas com trechos anti-gravidade, muitos personagens, itens clássicos e um modo batalha renovado. É ótimo para jogar com a família.',
  'Jogo de estratégia em tempo real para celular. Você monta um baralho de cartas e defende suas torres em partidas curtas contra outros jogadores. É gratuito e muito competitivo.',
  'Continuação de Horizon Zero Dawn. Aloy viaja ao Oeste Proibido, onde enfrenta máquinas gigantes e descobre segredos sobre o fim do antigo mundo. Os gráficos e as paisagens são um grande destaque.',
  'RPG de ação ambientado na futurista Night City. Você vive V, um mercenário em busca de um implante que pode salvar sua vida. Teve um lançamento difícil em 2020, mas melhorou muito com as atualizações.',
  'Mario ganha o chapéu falante Cappy, que permite capturar inimigos e objetos e usar suas habilidades. Ele viaja por reinos 3D cheios de segredos para impedir o casamento forçado da Princesa Peach.',
  'Versão para celular de Call of Duty, com mapas e personagens clássicos da série. Tem partidas multiplayer rápidas e modo battle royale, e é gratuito.',
  'Simulador de corrida da Polyphony Digital para o PlayStation 5. O foco está em colecionar, ajustar e pilotar carros reais em pistas do mundo todo, com visual muito realista.',
  'Jogo de estratégia em tempo real ambientado na Idade Média. Você escolhe uma civilização, como ingleses, franceses ou mongóis, constrói sua base e enfrenta rivais em campanhas históricas ou online.'
];
jogos.forEach((j, i) => j.desc = descricoes[i]);
