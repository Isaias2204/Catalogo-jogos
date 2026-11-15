const $ = id => document.getElementById(id);
const preco = p => p === 0 ? 'Grátis' : p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const nota = n => n.toFixed(1).replace('.', ',');
const idade = i => i === 0 ? 'Livre' : i + '+';
// Tenta jpg, png, webp, jpeg; se nenhum existir, mostra um quadro colorido
const EXTS = ['jpg', 'png', 'webp', 'jpeg'];
function falhaImg(img) {
  const n = (+img.dataset.n || 0) + 1;
  if (n < EXTS.length) { img.dataset.n = n; img.src = 'img/' + img.dataset.nome + '.' + EXTS[n]; return; }
  const ph = document.createElement('div');
  ph.className = 'sem-imagem card-img-top';
  ph.textContent = img.alt.replace('Capa de ', '');
  img.replaceWith(ph);
}
const nomeGenero = id => generos.find(g => g.id === id).nome;
const nomePlat = id => plataformas.find(p => p.id === id).nome;

// Números do topo
$('numeros').innerHTML = [[jogos.length, 'jogos'], [generos.length, 'gêneros'], [plataformas.length, 'plataformas']]
  .map(([n, t]) => `<div class="numero"><strong>${n}</strong><span>${t}</span></div>`).join('');

// Filtros
$('f-genero').innerHTML = '<option value="0">Todos</option>' + generos.map(g => `<option value="${g.id}">${g.nome}</option>`).join('');
$('f-plat').innerHTML = '<option value="0">Todas</option>' + plataformas.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');

function mostrarJogos() {
  const g = +$('f-genero').value, p = +$('f-plat').value, m = $('f-multi').checked;
  const lista = jogos.filter(j => (!g || j.genero === g) && (!p || j.plat === p) && (!m || j.multi));
  $('contagem').textContent = lista.length + (lista.length === 1 ? ' jogo encontrado' : ' jogos encontrados');
  $('lista').innerHTML = lista.length ? lista.map(j => `
    <div class="col-md-6 col-lg-4"><article class="card h-100 card-click" data-i="${jogos.indexOf(j)}" tabindex="0" role="button" aria-label="Ver detalhes de ${j.titulo}">
      <img src="img/${j.img}.jpg" data-nome="${j.img}" data-n="0" class="card-img-top capa" alt="Capa de ${j.titulo}" loading="lazy" onerror="falhaImg(this)">
      <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-2">
        <h3 class="h5 card-title">${j.titulo}</h3><span class="nota">${nota(j.nota)}</span>
      </div>
      <p class="card-text mb-2">${j.dev} · ${j.ano}</p>
      <p class="mb-3">
        <span class="badge text-bg-secondary">${nomeGenero(j.genero)}</span>
        <span class="badge text-bg-secondary">${nomePlat(j.plat)}</span>
        ${j.multi ? '<span class="badge badge-multi">Multiplayer</span>' : ''}
      </p>
      <p class="mb-0 d-flex justify-content-between"><strong>${preco(j.preco)}</strong><span>Classificação: ${idade(j.idade)}</span></p>
      <p class="ver mb-0 mt-2">Ver detalhes →</p>
    </div></article></div>`).join('')
    : '<p>Nenhum jogo com esses filtros. Mude o gênero ou a plataforma.</p>';
}
['f-genero', 'f-plat', 'f-multi'].forEach(id => $(id).addEventListener('change', mostrarJogos));
mostrarJogos();

// Gêneros (accordion)
$('acc-generos').innerHTML = generos.map((g, i) => {
  const itens = jogos.filter(j => j.genero === g.id);
  return `<div class="accordion-item">
    <h3 class="accordion-header"><button class="accordion-button ${i ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#g${g.id}" aria-expanded="${i ? 'false' : 'true'}" aria-controls="g${g.id}">${g.nome} <span class="ms-2 badge text-bg-secondary">${itens.length}</span></button></h3>
    <div id="g${g.id}" class="accordion-collapse collapse ${i ? '' : 'show'}" data-bs-parent="#acc-generos"><div class="accordion-body">
      <p>${g.descricao}.</p><ul class="mb-0">${itens.map(j => `<li>${j.titulo} (${nomePlat(j.plat)})</li>`).join('')}</ul>
    </div></div></div>`;
}).join('');

// Plataformas
$('plataformas-lista').innerHTML = plataformas.map(p => {
  const itens = jogos.filter(j => j.plat === p.id);
  const media = itens.reduce((s, j) => s + j.preco, 0) / itens.length;
  return `<div class="col-md-6 col-lg-4"><article class="card h-100"><div class="card-body">
    <h3 class="h5 card-title">${p.nome}</h3>
    <p class="card-text mb-1">Fabricante: ${p.fabricante}</p>
    <p class="card-text mb-1">Jogos no catálogo: ${itens.length}</p>
    <p class="card-text mb-0">Preço médio: <strong>${preco(media)}</strong></p>
  </div></article></div>`;
}).join('');

// Ranking
$('tabela').innerHTML = [...jogos].sort((a, b) => b.nota - a.nota).map((j, i) =>
  `<tr><td>${i + 1}</td><td>${j.titulo}</td><td>${j.dev}</td><td>${j.ano}</td><td class="text-end"><span class="nota">${nota(j.nota)}</span></td></tr>`).join('');

// Carousel: os 6 jogos mais bem avaliados, com imagem
const melhores = [...jogos].sort((a, b) => b.nota - a.nota).slice(0, 6);
$('car-ind').innerHTML = melhores.map((j, i) =>
  `<button type="button" data-bs-target="#destaques" data-bs-slide-to="${i}" ${i ? '' : 'class="active" aria-current="true"'} aria-label="Slide ${i + 1}"></button>`).join('');
$('car-itens').innerHTML = melhores.map((j, i) => `
  <div class="carousel-item ${i ? '' : 'active'}"><div class="row g-0 slide">
    <div class="col-md-6"><img src="img/${j.img}.jpg" data-nome="${j.img}" data-n="0" class="car-img" alt="Capa de ${j.titulo}" onerror="falhaImg(this)"></div>
    <div class="col-md-6 d-flex align-items-center"><div class="slide-txt">
      <span class="nota">${nota(j.nota)}</span>
      <h3>${j.titulo}</h3>
      <p class="mb-0">${nomeGenero(j.genero)} · ${j.dev} · ${j.ano} · ${nomePlat(j.plat)}</p>
      <button type="button" class="btn btn-rosa btn-sm mt-3" data-i="${jogos.indexOf(j)}">Ver detalhes</button>
    </div></div>
  </div></div>`).join('');

// Janela (modal) com os detalhes do jogo
function abrirJogo(i) {
  const j = jogos[i];
  $('modalTitulo').textContent = j.titulo;
  $('modal-corpo').innerHTML = `
    <img src="img/${j.img}.jpg" data-nome="${j.img}" data-n="0" class="car-img" alt="Capa de ${j.titulo}" onerror="falhaImg(this)">
    <div class="p-4">
      <p class="mb-3">
        <span class="nota">${nota(j.nota)}</span>
        <span class="badge text-bg-secondary ms-2">${nomeGenero(j.genero)}</span>
        <span class="badge text-bg-secondary">${nomePlat(j.plat)}</span>
        ${j.multi ? '<span class="badge badge-multi">Multiplayer</span>' : '<span class="badge text-bg-secondary">Single player</span>'}
      </p>
      <p>${j.desc}</p>
      <dl class="row mb-0">
        <dt class="col-sm-4">Desenvolvedora</dt><dd class="col-sm-8">${j.dev}</dd>
        <dt class="col-sm-4">Lançamento</dt><dd class="col-sm-8">${j.ano}</dd>
        <dt class="col-sm-4">Preço</dt><dd class="col-sm-8">${preco(j.preco)}</dd>
        <dt class="col-sm-4">Classificação</dt><dd class="col-sm-8">${idade(j.idade)}</dd>
      </dl>
    </div>`;
  bootstrap.Modal.getOrCreateInstance($('modalJogo')).show();
}
document.addEventListener('click', e => {
  const alvo = e.target.closest('[data-i]');
  if (alvo) abrirJogo(+alvo.dataset.i);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('card-click')) {
    e.preventDefault();
    abrirJogo(+e.target.dataset.i);
  }
});
