// ============================================================
//  A MANSÃO DO CORONEL — game.js
//  Motor do jogo: estado, mecânicas, renderização
// ============================================================

// ─── ESTADO DO JOGO ─────────────────────────────────────────

const GameState = {
    pericia: 0,
    periciaMax: 0,
    forca: 0,
    forcaMax: 0,
    sorte: 0,
    sorteMax: 0,
    medo: 0,
    medoMax: 0,
    secaoAtual: 1,
    itens: [],       // strings: nomes dos itens no inventário
    morto: false,
    venceu: false,
    patuaUsado: false,

    reset() {
        // Rolar atributos iniciais
        this.pericia = rolarDado(6) + 6;
        this.periciaMax = this.pericia;
        this.forca = rolarDado(6) + rolarDado(6) + 12;
        this.forcaMax = this.forca;
        this.sorte = rolarDado(6) + 6;
        this.sorteMax = this.sorte;
        this.medo = 0;
        this.medoMax = rolarDado(6) + 6;
        this.secaoAtual = 1;
        this.itens = [];
        this.morto = false;
        this.venceu = false;
        this.patuaUsado = false;
    }
};

// ─── UTILITÁRIOS DE DADOS ────────────────────────────────────

function rolarDado(lados = 6) {
    return Math.floor(Math.random() * lados) + 1;
}

function rolarDois() {
    return rolarDado(6) + rolarDado(6);
}

// ─── MECÂNICAS ───────────────────────────────────────────────

function ajustarStat(stat, delta) {
    const maxKey = stat + 'Max';
    GameState[stat] = Math.max(0, Math.min(GameState[maxKey] || 999, GameState[stat] + delta));
}

function addItem(nome) {
    if (!GameState.itens.includes(nome)) {
        GameState.itens.push(nome);
    }
}

function temItem(nome) {
    return GameState.itens.includes(nome);
}

// Teste de Sorte: retorna true se bem-sucedido
function testarSorte() {
    const rolagem = rolarDois();
    const sucesso = rolagem <= GameState.sorte;
    ajustarStat('sorte', -1);
    return { sucesso, rolagem };
}

// Teste de Perícia: retorna true se bem-sucedido
function testarPericia() {
    const rolagem = rolarDois();
    const sucesso = rolagem <= GameState.pericia;
    return { sucesso, rolagem };
}

// Rodada de combate: retorna resultado
function rodadaCombate(monstro) {
    const ataqueJogador = rolarDois() + GameState.pericia;
    const ataqueMonstro = rolarDois() + monstro.pericia;

    if (ataqueJogador > ataqueMonstro) {
        // Jogador fere monstro
        let dano = 2;
        // Testar sorte em combate se quiser
        monstro.forca = Math.max(0, monstro.forca - dano);
        return { resultado: 'jogador_fere', danoMonstro: dano, danoJogador: 0, ataqueJogador, ataqueMonstro };
    } else if (ataqueMonstro > ataqueJogador) {
        // Monstro fere jogador
        ajustarStat('forca', -2);
        return { resultado: 'monstro_fere', danoMonstro: 0, danoJogador: 2, ataqueJogador, ataqueMonstro };
    } else {
        // Empate — ninguém se fere
        return { resultado: 'empate', danoMonstro: 0, danoJogador: 0, ataqueJogador, ataqueMonstro };
    }
}

// ─── VERIFICAÇÃO DE MORTE ────────────────────────────────────

function verificarMorte() {
    if (GameState.forca <= 0 && !GameState.morto) {
        GameState.morto = true;
        irParaSecao(99);
        return true;
    }
    if (GameState.medo >= GameState.medoMax && !GameState.morto) {
        GameState.morto = true;
        irParaSecao(100);
        return true;
    }
    return false;
}

// ─── RENDERIZAÇÃO DA FICHA ───────────────────────────────────

function renderizarFicha() {
    document.getElementById('val-pericia').textContent = GameState.pericia;
    document.getElementById('val-forca').textContent = GameState.forca;
    document.getElementById('val-sorte').textContent = GameState.sorte;
    document.getElementById('val-medo').textContent = GameState.medo;
    document.getElementById('val-medo-max').textContent = GameState.medoMax;

    // Barras de progresso
    atualizarBarra('barra-forca', GameState.forca, GameState.forcaMax);
    atualizarBarra('barra-medo', GameState.medo, GameState.medoMax, true);

    // Itens
    const listaItens = document.getElementById('lista-itens');
    if (GameState.itens.length === 0) {
        listaItens.innerHTML = '<span class="sem-itens">Nenhum item</span>';
    } else {
        listaItens.innerHTML = GameState.itens.map(i => `<span class="item-tag">${i}</span>`).join('');
    }
}

function atualizarBarra(id, valor, maximo, inverso = false) {
    const el = document.getElementById(id);
    if (!el) return;
    const pct = Math.max(0, Math.min(100, (valor / maximo) * 100));
    el.style.width = pct + '%';
    if (inverso) {
        // Medo: vermelho quando alto
        el.className = 'barra-fill ' + (pct > 75 ? 'perigo' : pct > 50 ? 'alerta' : 'seguro');
    } else {
        el.className = 'barra-fill ' + (pct < 25 ? 'perigo' : pct < 50 ? 'alerta' : 'seguro');
    }
}

// ─── EFEITO TYPEWRITER ───────────────────────────────────────

let typewriterTimer = null;

function exibirTextoComEfeito(html, callback) {
    const el = document.getElementById('texto-secao');
    el.innerHTML = '';

    // Converte HTML para texto com marcadores para tags
    // Simplificação: insere o HTML diretamente mas com fade-in por parágrafo
    clearTimeout(typewriterTimer);

    // Divide por <br><br> para criar parágrafos
    const partes = html.split('<br><br>');
    let i = 0;

    el.innerHTML = '';

    function mostrarParte() {
        if (i < partes.length) {
            const span = document.createElement('p');
            span.innerHTML = partes[i];
            span.classList.add('paragrafo-animado');
            el.appendChild(span);
            // Força reflow para animação
            void span.offsetWidth;
            span.classList.add('visivel');
            i++;
            typewriterTimer = setTimeout(mostrarParte, 400);
        } else {
            if (callback) callback();
        }
    }

    mostrarParte();
}

// ─── NAVEGAÇÃO DE SEÇÕES ─────────────────────────────────────

function irParaSecao(num) {
    const secao = STORY[num];
    if (!secao) {
        console.error('Seção não encontrada:', num);
        return;
    }

    GameState.secaoAtual = num;

    // Limpa escolhas enquanto o texto aparece
    document.getElementById('area-escolhas').innerHTML = '';
    document.getElementById('area-evento').innerHTML = '';

    // Exibe texto
    exibirTextoComEfeito(secao.text, () => {
        // Após o texto, processa evento (se houver)
        if (secao.event) {
            processarEvento(secao.event, secao);
        } else {
            renderizarEscolhas(secao.choices);
        }
    });

    // Atualiza número da seção
    document.getElementById('num-secao').textContent = num;
    renderizarFicha();

    // Scroll suave para o topo do conteúdo
    document.getElementById('area-texto').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── PROCESSAMENTO DE EVENTOS ────────────────────────────────

function processarEvento(evento, secao) {
    const areaEvento = document.getElementById('area-evento');

    switch (evento.type) {

        case 'fear': {
            const anterior = GameState.medo;
            GameState.medo = Math.min(GameState.medoMax, GameState.medo + evento.amount);
            renderizarFicha();
            areaEvento.innerHTML = `
        <div class="evento medo-evento">
          <span class="evento-icone">👁️</span>
          <span>${evento.reason || 'Seu medo aumentou.'}</span>
          <strong>+${evento.amount} MEDO (${anterior} → ${GameState.medo} / ${GameState.medoMax})</strong>
        </div>`;
            if (verificarMorte()) return;
            setTimeout(() => renderizarEscolhas(secao.choices), 800);
            break;
        }

        case 'lose': {
            const antes = GameState[evento.stat];
            ajustarStat(evento.stat, -evento.amount);
            renderizarFicha();
            const nomes = { pericia: 'PERÍCIA', forca: 'FORÇA', sorte: 'SORTE' };
            areaEvento.innerHTML = `
        <div class="evento perca-evento">
          <span class="evento-icone">💔</span>
          <strong>-${evento.amount} ${nomes[evento.stat]} (${antes} → ${GameState[evento.stat]})</strong>
        </div>`;
            if (verificarMorte()) return;
            setTimeout(() => renderizarEscolhas(secao.choices), 800);
            break;
        }

        case 'gain': {
            if (evento.stat) {
                ajustarStat(evento.stat, evento.amount);
                renderizarFicha();
            }
            if (evento.item) {
                addItem(evento.item);
                renderizarFicha();
            }
            const nomes = { pericia: 'PERÍCIA', forca: 'FORÇA', sorte: 'SORTE' };
            let msg = '';
            if (evento.stat) msg += `+${evento.amount} ${nomes[evento.stat]}. `;
            if (evento.item) msg += `Você obteve: <em>${evento.item}</em>.`;
            areaEvento.innerHTML = `
        <div class="evento ganho-evento">
          <span class="evento-icone">✨</span>
          <strong>${msg}</strong>
        </div>`;
            setTimeout(() => renderizarEscolhas(secao.choices), 800);
            break;
        }

        case 'luck': {
            renderizarTesteDeSort(evento, secao);
            break;
        }

        case 'skill': {
            renderizarTesteDePericia(evento, secao);
            break;
        }

        case 'combat': {
            renderizarCombate(evento, secao);
            break;
        }

        case 'death': {
            renderizarFimDeJogo(false);
            break;
        }

        case 'win': {
            renderizarFimDeJogo(true);
            break;
        }

        default:
            renderizarEscolhas(secao.choices);
    }
}

// ─── TESTE DE SORTE ──────────────────────────────────────────

function renderizarTesteDeSort(evento, secao) {
    const areaEvento = document.getElementById('area-evento');
    areaEvento.innerHTML = `
    <div class="evento sorte-evento">
      <span class="evento-icone">🎲</span>
      <strong>TESTE DE SORTE</strong>
      <p>Role os dados. Você precisa tirar igual ou menor que sua SORTE atual (${GameState.sorte}).</p>
      <button class="btn-dado" id="btn-testar-sorte">Rolar os dados</button>
    </div>`;

    document.getElementById('btn-testar-sorte').addEventListener('click', () => {
        const { sucesso, rolagem } = testarSorte();
        renderizarFicha();

        let usouPatua = false;
        if (!sucesso && temItem('Patuá de Proteção') && !GameState.patuaUsado) {
            // Usar Patuá automaticamente
            GameState.patuaUsado = true;
            const rerolagem = rolarDois();
            const novoSucesso = rerolagem <= GameState.sorte;
            areaEvento.innerHTML = `
        <div class="evento sorte-evento">
          <strong>Resultado: ${rolagem} — Falhou.</strong>
          <p>Seu <em>Patuá de Proteção</em> brilhou e te deu uma segunda chance!</p>
          <strong>Nova rolagem: ${rerolagem} — ${novoSucesso ? '✅ Teve sorte!' : '❌ Não teve sorte desta vez.'}</strong>
        </div>`;
            setTimeout(() => irParaSecao(novoSucesso ? evento.success : evento.fail), 1200);
            return;
        }

        areaEvento.innerHTML = `
      <div class="evento sorte-evento">
        <strong>Rolagem: ${rolagem} vs SORTE ${GameState.sorte + 1} → ${sucesso ? '✅ Teve sorte!' : '❌ Não teve sorte.'}</strong>
        <em>SORTE reduzida em 1.</em>
      </div>`;
        renderizarFicha();
        setTimeout(() => irParaSecao(sucesso ? evento.success : evento.fail), 1200);
    });
}

// ─── TESTE DE PERÍCIA ────────────────────────────────────────

function renderizarTesteDePericia(evento, secao) {
    const areaEvento = document.getElementById('area-evento');
    areaEvento.innerHTML = `
    <div class="evento pericia-evento">
      <span class="evento-icone">⚔️</span>
      <strong>TESTE DE PERÍCIA</strong>
      <p>Role os dados. Você precisa tirar igual ou menor que sua PERÍCIA (${GameState.pericia}).</p>
      <button class="btn-dado" id="btn-testar-pericia">Rolar os dados</button>
    </div>`;

    document.getElementById('btn-testar-pericia').addEventListener('click', () => {
        const { sucesso, rolagem } = testarPericia();
        areaEvento.innerHTML = `
      <div class="evento pericia-evento">
        <strong>Rolagem: ${rolagem} vs PERÍCIA ${GameState.pericia} → ${sucesso ? '✅ Conseguiu!' : '❌ Não conseguiu.'}</strong>
      </div>`;
        setTimeout(() => irParaSecao(sucesso ? evento.success : evento.fail), 1200);
    });
}

// ─── SISTEMA DE COMBATE ──────────────────────────────────────

function renderizarCombate(evento, secao) {
    const areaEvento = document.getElementById('area-evento');
    const inimigos = evento.enemies.map(e => ({ ...e })); // cópia
    let inimigoAtual = 0;

    function atualizarCombate() {
        const inimigo = inimigos[inimigoAtual];

        if (!inimigo || inimigo.forca <= 0) {
            inimigoAtual++;
            if (inimigoAtual >= inimigos.length) {
                // Todos derrotados
                areaEvento.innerHTML = `
          <div class="evento ganho-evento">
            <span class="evento-icone">⚔️</span>
            <strong>Você venceu o combate!</strong>
          </div>`;
                setTimeout(() => renderizarEscolhas(secao.choices), 1000);
                return;
            }
        }

        const inimigoExibir = inimigos[inimigoAtual];
        if (!inimigoExibir) return;

        areaEvento.innerHTML = `
      <div class="evento combate-evento">
        <div class="combate-header">
          <span class="evento-icone">⚔️</span>
          <strong>COMBATE</strong>
        </div>
        <div class="combate-fichas">
          <div class="combate-lado">
            <span class="combate-nome">Você</span>
            <span class="combate-stat">PERÍCIA ${GameState.pericia} | FORÇA ${GameState.forca}</span>
          </div>
          <span class="combate-vs">VS</span>
          <div class="combate-lado">
            <span class="combate-nome">${inimigoExibir.name}</span>
            <span class="combate-stat">PERÍCIA ${inimigoExibir.pericia} | FORÇA ${inimigoExibir.forca}</span>
          </div>
        </div>
        <div id="log-combate" class="log-combate"></div>
        <button class="btn-dado" id="btn-rodada">Lutar</button>
      </div>`;

        document.getElementById('btn-rodada').addEventListener('click', () => {
            const resultado = rodadaCombate(inimigoExibir);
            renderizarFicha();

            const log = document.getElementById('log-combate');
            let msg = `<div class="log-linha">Você: ${resultado.ataqueJogador} | ${inimigoExibir.name}: ${resultado.ataqueMonstro} → `;

            if (resultado.resultado === 'jogador_fere') {
                msg += `<span class="sucesso">Você feriu o inimigo! (${inimigoExibir.forca} FORÇA restante)</span>`;
            } else if (resultado.resultado === 'monstro_fere') {
                msg += `<span class="falha">Você foi ferido! (${GameState.forca} FORÇA restante)</span>`;
            } else {
                msg += `<span class="empate">Empate — sem dano.</span>`;
            }
            msg += '</div>';
            if (log) log.innerHTML = msg;

            if (verificarMorte()) return;

            if (inimigoExibir.forca <= 0) {
                setTimeout(atualizarCombate, 800);
            } else {
                // Re-renderiza botão
                const btn = document.getElementById('btn-rodada');
                if (btn) {
                    const novoBtn = btn.cloneNode(true);
                    btn.parentNode.replaceChild(novoBtn, btn);
                    novoBtn.addEventListener('click', () => {
                        const r2 = rodadaCombate(inimigoExibir);
                        renderizarFicha();
                        const log2 = document.getElementById('log-combate');
                        let m2 = `<div class="log-linha">Você: ${r2.ataqueJogador} | ${inimigoExibir.name}: ${r2.ataqueMonstro} → `;
                        if (r2.resultado === 'jogador_fere') {
                            m2 += `<span class="sucesso">Você feriu! (${inimigoExibir.forca} FORÇA)</span>`;
                        } else if (r2.resultado === 'monstro_fere') {
                            m2 += `<span class="falha">Você levou dano! (${GameState.forca} FORÇA)</span>`;
                        } else {
                            m2 += `<span class="empate">Empate.</span>`;
                        }
                        m2 += '</div>';
                        if (log2) log2.innerHTML += m2;
                        if (verificarMorte()) return;
                        if (inimigoExibir.forca <= 0) setTimeout(atualizarCombate, 800);
                    });
                }
            }
        });
    }

    atualizarCombate();
}

// ─── RENDERIZAR ESCOLHAS ─────────────────────────────────────

function renderizarEscolhas(choices) {
    const area = document.getElementById('area-escolhas');
    area.innerHTML = '';

    if (!choices || choices.length === 0) return;

    choices.forEach((escolha, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn-escolha';
        btn.innerHTML = `<span class="escolha-letra">${String.fromCharCode(65 + i)}</span>${escolha.label}`;
        btn.addEventListener('click', () => irParaSecao(escolha.goto));
        area.appendChild(btn);
    });
}

// ─── FIM DE JOGO ─────────────────────────────────────────────

function renderizarFimDeJogo(vitoria) {
    const area = document.getElementById('area-escolhas');
    const areaEvento = document.getElementById('area-evento');

    areaEvento.innerHTML = '';

    if (vitoria) {
        area.innerHTML = `
      <div class="fim-vitoria">
        <h2>🕯️ A Fazenda Descansa em Paz</h2>
        <p>Você libertou a alma do Coronel e desfez trinta anos de maldição.</p>
        <button class="btn-escolha" onclick="iniciarJogo()">Jogar novamente</button>
      </div>`;
    } else {
        area.innerHTML = `
      <div class="fim-derrota">
        <h2>💀 A Mansão Venceu</h2>
        <p>Você não sobreviveu aos segredos da Fazenda São Benedito.</p>
        <button class="btn-escolha" onclick="iniciarJogo()">Tentar novamente</button>
      </div>`;
    }
}

// ─── TELA DE INÍCIO ──────────────────────────────────────────

function mostrarTelaInicio() {
    document.getElementById('tela-inicio').style.display = 'flex';
    document.getElementById('tela-jogo').style.display = 'none';
}

function iniciarJogo() {
    GameState.reset();
    document.getElementById('tela-inicio').style.display = 'none';
    document.getElementById('tela-jogo').style.display = 'flex';
    renderizarFicha();
    irParaSecao(1);
}

// ─── INIT ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    mostrarTelaInicio();

    document.getElementById('btn-comecar').addEventListener('click', iniciarJogo);

    // Botão de rolar dados na tela de início (apenas visual)
    document.getElementById('btn-rolar-inicio').addEventListener('click', () => {
        const d1 = rolarDado(6);
        const d2 = rolarDado(6);
        const d3 = rolarDado(6);
        document.getElementById('resultado-dados').textContent =
            `🎲 ${d1}  🎲 ${d2}  🎲 ${d3}`;
    });
});