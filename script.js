document.getElementById('btnReset').addEventListener('click', function() {
    const senha = prompt("Digite a senha de PROGRAMADOR:");
    if (senha === "1204") {
        localStorage.clear();
        console.log("LocalStorage limpo.");
        fetch('reset_db.php', { method: 'POST' })
        .then(() => {
            alert('✅ Sucesso: LocalStorage limpo e banco resetado!');
            location.reload(); 
        })
        .catch(err => {
            alert('LocalStorage limpo, mas houve erro no servidor.');
            location.reload();
        });
    } else {
        alert("❌ Senha incorreta!");
    }
});
function atualizarHora() {
    const a = new Date();
    document.getElementById("visor").textContent =
      [a.getHours(), a.getMinutes(), a.getSeconds()]
        .map(n => String(n).padStart(2, "0")).join(":");
}
setInterval(atualizarHora, 1000);
atualizarHora();

// UTILITÁRIOS 
function parseNumero(v) {
    if (typeof v === "number") return v;
    if (!v || v === "") return 0;
    const n = parseFloat(String(v).trim().replace(",", ".").replace(/[^\d.\-]/g, ""));
    return isNaN(n) ? 0 : n;
}
function fmtMoeda(v) {
    return "R$ " + Number(v).toFixed(2).replace(".", ",");
}
function fmtQtd(item) {
    // CORRIGIDO: Verifica tanto isKg (carrinho) quanto unidade (produto base)
    const isKg = item.isKg === true || item.unidade === "kg";
    return isKg ? (item.val || 0).toFixed(3) + " kg" : (item.val || 0) + " un";
}
const PAES_PROMO = ["Pão Francês","Pão Seda","Pão Carrapixo","Pão Carteira","Pão Coco","Pão de Goiabada"];
const LINGUA_PROMO = ["Pão Língua de Sogra"];
const CATEGORIAS = ["Pães","Frios","Bebidas","Salgados","Bolos","Doces","Outros"];
const CAT_PAES = "Pães";

function ePaes(prod) {
    return prod && prod.categoria === CAT_PAES;
}

let produtosBase = JSON.parse(localStorage.getItem("produtos")) || [
    /*  CAT_PAES */
    {codigo:"7891000000001",nome:"Pão Francês",preco:0.35,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000002",nome:"Pão Seda",preco:0.35,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000003",nome:"Pão Carteira",preco:0.35,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000004",nome:"Pão Carrapixo",preco:0.35,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000005",nome:"Pão Língua de Sogra",preco:0.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000006",nome:"Pão de Goiabada",preco:0.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000007",nome:"Pão de Coco",preco:0.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000008",nome:"Pão Hot Dog",preco:0.60,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000009",nome:"Pão Hambúrguer",preco:3.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000010",nome:"Pão de Leite",preco:5.00,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000011",nome:"Pão de Frios",preco:2.00,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000012",nome:"Broa de Milho",preco:1.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000013",nome:"Sonho",preco:2.00,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000014",nome:"Rosquinha de Chocolate",preco:2.00,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000015",nome:"Rosquinha Tradicional",preco:1.00,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000016",nome:"Coxinha",preco:2.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000017",nome:"Pastel de Frango",preco:2.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000018",nome:"Pastel de Carne",preco:2.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000019",nome:"Pastel Queijo c/ Presunto",preco:2.50,unidade:"un",categoria:CAT_PAES},
    {codigo:"7891000000020",nome:"Enroladinho",preco:2.50,unidade:"un",categoria:CAT_PAES},
    /*  BEBIDAS */
    {codigo:"7896445472549",nome:"Indaiá Cola 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7896445472556",nome:"Indaiá Guaraná 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7896445472419",nome:"Indaiá Laranja 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7896445472440",nome:"Indaiá Uva 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7896445472532",nome:"Indaiá Limão 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"07897801701143",nome:"Dore Cola 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7897801701105",nome:"Dore Guaraná 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"07897801701112",nome:"Dore Laranja 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"07897801701136",nome:"Dore Uva 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7897801701129",nome:"Dore Limao 250ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7894900010015",nome:"Refrigerante Coca Cola Lata 350ml",preco:4.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7891991000826",nome:"Refrigerante Guaraná Lata 350ml",preco:4.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7892840800079",nome:"Refrigerante Pepsi Cola 350ml",preco:3.50,unidade:"un",categoria:"Bebidas"},
    {codigo:"7894900027044",nome:"Refrigerante Coca Cola 1l",preco:7.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7891991002561",nome:"Refrigerante Guaraná 1l",preco:6.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7892840800406",nome:"Refrigerante Pepsi 1l",preco:6.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7898080640239",nome:"Italakinho Chocolate 200ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7894900027044",nome:"Italakinho Morango 200ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7898080640925",nome:"Italakinho 1L",preco:8.50,unidade:"un",categoria:"Bebidas"},
    {codigo:"7898005516175",nome:"Água Sterbom 510ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    {codigo:"7898005516199",nome:"Água Sterbom com gás 500ml",preco:2.00,unidade:"un",categoria:"Bebidas"},
    /*  MERCEARIA */
    {codigo:"7892768314443",nome:"Bolacha Rainha 250g",preco:3.80,unidade:"un",categoria:"Doces"},
    {codigo:"7891964513117",nome:"Bolacha Delícia 200g",preco:3.50,unidade:"un",categoria:"Doces"},
    {codigo:"7892768314528",nome:"Bolacha Suíça Salgada 250g",preco:3.80,unidade:"un",categoria:"Doces"},
    {codigo:"7897849302272",nome:"Iogurte Clan 900g",preco:6.50,unidade:"un",categoria:"Doces"},
    {codigo:"040141996848",nome:"Leite de Vaca 1L",preco:4.50,unidade:"un",categoria:"Bebidas"},
    {codigo:"7898506560455",nome:"Iogurte Paraíso Morango 900ml",preco:5.00,unidade:"un",categoria:"Doces"},
    /*FRIOS */
    {codigo:"7896733301032",nome:"Mortadela Friato Frango",preco:15.50,unidade:"kg",categoria:"Frios"},
    {codigo:"7891515430153",nome:"Mortadela Perdigão Mista",preco:22.00,unidade:"kg",categoria:"Frios"},
    {codigo:"7894904005550",nome:"Mortadela Defumada Sadia",preco:38.00,unidade:"kg",categoria:"Frios"},
    {codigo:"7891164005610",nome:"Presunto Aurora",preco:43.00,unidade:"kg",categoria:"Frios"},
    {codigo:"7898949346135",nome:"Queijo Mussarela Jucurutu",preco:53.00,unidade:"kg",categoria:"Frios"},
    {codigo:"7898909867014",nome:"Queijo de Manteiga Caico",preco:47.00,unidade:"kg",categoria:"Frios"},
    /* LIMPEZA  */
    {codigo:"7891055605806",nome:"Esponja Condor",preco:4.50,unidade:"un",categoria:"Limpeza"},
    {codigo:"7891150097605",nome:"Sabão em Pó Ala 400g",preco:4.00,unidade:"un",categoria:"Limpeza"},
    {codigo:"7896221600012",nome:"Água Sanitária Dragão",preco:2.50,unidade:"un",categoria:"Limpeza"},
    {codigo:"7891022100372",nome:"Limpou 500ml",preco:2.50,unidade:"un",categoria:"Limpeza"},
    /* OUTROS  */
    {codigo:"7897886900011",nome:"Açúcar Alegre",preco:4.00,unidade:"un",categoria:"Outros"},
    {codigo:"7896101711616",nome:"Sal Nevada",preco:1.50,unidade:"un",categoria:"Outros"},
    {codigo:"7897517206086",nome:"Molho de Tomate Fugini",preco:2.00,unidade:"un",categoria:"Outros"},
    {codigo:"7896213005962",nome:"Biscoito Treloso 120g",preco:2.50,unidade:"un",categoria:"Doces"},
    {codigo:"7891164027711",nome:"Leite em Pó Aurora 200g",preco:8.50,unidade:"un",categoria:"Outros"},
    {codigo:"7896045108763",nome:"Café Solúvel Santa Clara 40g",preco:7.50,unidade:"un",categoria:"Outros"},
    {codigo:"7891091017168",nome:"Café Solúvel São Braz 40g",preco:6.50,unidade:"un",categoria:"Outros"},
    {codigo:"7896045109074",nome:"Café Santa Clara 250g",preco:18.00,unidade:"un",categoria:"Outros"},
    {codigo:"7898286200060",nome:"Café Maratá 250g",preco:18.00,unidade:"un",categoria:"Outros"},
    {codigo:"7896223709423",nome:"Óleo de Soja 900ml",preco:9.50,unidade:"un",categoria:"Outros"},
    {codigo:"7898403782387",nome:"Leite Betânia 1L",preco:7.50,unidade:"un",categoria:"Bebidas"},
    /* BOLOS  */
    {codigo:"7892000000001",nome:"Bolo de Chocolate",preco:10.00,unidade:"un",categoria:"Bolos"},
    {codigo:"7892000000002",nome:"Bolo de Laranja",preco:8.00,unidade:"un",categoria:"Bolos"},
    {codigo:"7892000000003",nome:"Bolo Formigueiro",preco:8.00,unidade:"un",categoria:"Bolos"},
    {codigo:"7892000000004",nome:"Bolo de Ovos",preco:8.00,unidade:"un",categoria:"Bolos"},
    {codigo:"7892000000005",nome:"Mousse de Chocolate",preco:5.00,unidade:"un",categoria:"Doces"},
    {codigo:"7892000000006",nome:"Mousse de Maracujá",preco:5.00,unidade:"un",categoria:"Doces"},
    {codigo:"7892000000007",nome:"Bolo de Pote",preco:6.00,unidade:"un",categoria:"Doces"},
    {codigo:"7892000000008",nome:"Brownie",preco:30.00,unidade:"kg",categoria:"Doces"},
    {codigo:"7892000000009",nome:"Torta Bauru",preco:35.00,unidade:"kg",categoria:"Salgados"},
    {codigo:"7892000000010",nome:"Torrada",preco:20.00,unidade:"kg",categoria:"Pães"},
    
    {codigo:"7826264652358",nome:"Bolinhos de Ovos 200g",preco:5.00,unidade:"un",categoria:"Doces"},
    {codigo:"7891286932627",nome:"Bolachão Potiguar 210g",preco:3.00,unidade:"un",categoria:"Doces"},
    {codigo:"7898627380017",nome:"Bolachão Cabugi",preco:4.50,unidade:"un",categoria:"Doces"},
    {codigo:"7892768335714",nome:"Soda 300g",preco:5.00,unidade:"un",categoria:"Doces"}
];

// CONFIGURAÇÃO 
let CONFIG = JSON.parse(localStorage.getItem("pdvConfig")) || {
    senha: "120410",
    pixChave: "84994994919",
    pixNome: "PADARIA TRINDADE",
    pixCidade: "NATAL",
    taxaCredito: 3.86,
    impressaoAuto: true,
    gavetaAuto: true
};

//  ESTADO DA APLICAÇÃO 
let carrinho = [];
let pixConfirmado = false;
let pixValorConf = 0;
let categoriaAtual = CAT_PAES;
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
let vendaID = parseInt(localStorage.getItem("vendaID")) || 1;
let caixaAtual = parseFloat(localStorage.getItem("caixaAtual")) || 0;
let produtoPesoAtual = null;
let ultimaVendaDados = null;
let debugMode = false;

let balancaPort = null;
let balancaReader = null;
let balancaConectada = false;
let pesoAtual = 0;

let mpParcelas = [];
let mpTotalVenda = 0;

//  PERSISTÊNCIA 
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtosBase));
}
function salvarTudo() {
    localStorage.setItem("caixaAtual", caixaAtual);
    localStorage.setItem("vendaID", vendaID);
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

//  DEBUG 
function toggleDebug() {
    debugMode = !debugMode;
    const el = document.getElementById("debugLog");
    if (el) el.classList.toggle("show", debugMode);
    if (debugMode) logDebug("🐞 DEBUG ATIVADO");
}
function logDebug(msg) {
    if (!debugMode) return;
    const el = document.getElementById("debugLog");
    if (!el) return;
    const t = new Date().toLocaleTimeString("pt-BR");
    el.innerHTML += `<div>[${t}] ${msg}</div>`;
    el.scrollTop = el.scrollHeight;
}

function tocarBip() {
    try {
        const c = new (window.AudioContext || window.webkitAudioContext)();
        const o = c.createOscillator(), g = c.createGain();
        o.type = "sine"; o.frequency.value = 1200; g.gain.value = 0.25;
        o.connect(g); g.connect(c.destination);
        o.start(); o.stop(c.currentTime + 0.15);
    } catch (_) {}
}
function tocarErro() {
    try {
        const c = new (window.AudioContext || window.webkitAudioContext)();
        const o = c.createOscillator(), g = c.createGain();
        o.type = "sawtooth"; o.frequency.value = 200; g.gain.value = 0.2;
        o.connect(g); g.connect(c.destination);
        o.start(); o.stop(c.currentTime + 0.3);
    } catch (_) {}
}

function showIndicator(msg, tipo = "success") {
    const el = document.getElementById("indicator");
    if (!el) return;
    el.textContent = msg;
    el.className = `indicator indicator-${tipo}`;
    el.style.display = "block";
    clearTimeout(el._t);
    el._t = setTimeout(() => el.style.display = "none", 2500);
}
function abrirModal(id) { 
    const el = document.getElementById(id);
    if (el) el.style.display = "flex"; 
}
function fecharModal(id) { 
    const el = document.getElementById(id);
    if (el) el.style.display = "none"; 
}
function fecharTodosModais() {
    document.querySelectorAll(".modal-overlay, .pix-modal-overlay")
      .forEach(m => m.style.display = "none");
}
function focarScanner() { 
    const el = document.getElementById("scannerInput");
    if (el) el.focus(); 
}

function estoqueZerado(prod) {
    if (ePaes(prod)) return false;
    return prod.estoque !== null && prod.estoque !== undefined && prod.estoque <= 0;
}

function temControleEstoque(prod) {
    if (ePaes(prod)) return false;
    return prod.estoque !== null && prod.estoque !== undefined;
}

function estoqueSuficiente(prod, qtdAtualNoCarrinho, delta) {
    if (ePaes(prod)) return true;
    if (!temControleEstoque(prod)) return true;
    const isKg = prod.unidade === "kg";
    const futuro = isKg
      ? Math.round((qtdAtualNoCarrinho + delta * 0.1) * 1000) / 1000
      : qtdAtualNoCarrinho + delta;
    return futuro <= prod.estoque;
}

function podeAdicionarQtd(prod, qtdParaAdicionar) {
    if (ePaes(prod)) return true;
    if (!temControleEstoque(prod)) return true;
    const existente = carrinho.find(i => i.nome === prod.nome);
    const qtdAtual = existente ? existente.val : 0;
    const futuro = Math.round((qtdAtual + qtdParaAdicionar) * 1000) / 1000;
    return futuro <= prod.estoque;
}

function limparEstoquePaes() {
    let alterou = false;
    produtosBase.forEach(p => {
        if (ePaes(p) && (p.estoque !== null && p.estoque !== undefined)) {
            p.estoque = null;
            p.estoqueMin = undefined;
            alterou = true;
        }
    });
    if (alterou) salvarProdutos();
}

let _scanBuf = "";
let _scanTmr = null;
const SCAN_MS = 80;

document.addEventListener("keydown", e => {
    if (e.key === "F2") { e.preventDefault(); focarScanner(); return; }
    if (e.key === "F10") { e.preventDefault(); finalizarVenda(); return; }
    if (e.key === "F12") { e.preventDefault(); abrirConfiguracoes(); return; }
    if (e.key === "Escape") { fecharTodosModais(); focarScanner(); return; }
    if (document.activeElement?.id === "scannerInput") return;
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(_scanTmr);
        const codigo = _scanBuf.trim();
        _scanBuf = "";
        if (codigo.length >= 3) {
            logDebug(`📦 Scanner global: ${codigo}`);
            processarCodigo(codigo);
        }
        return;
    }
    if (e.key.length === 1) {
        _scanBuf += e.key;
        clearTimeout(_scanTmr);
        _scanTmr = setTimeout(() => { _scanBuf = ""; }, SCAN_MS);
    }
});

function scannerKeyDown(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const el = document.getElementById("scannerInput");
        if (!el) return;
        const val = el.value.trim();
        if (val.length >= 3) {
            logDebug(`📦 Scanner campo: ${val}`);
            processarCodigo(val);
        }
        el.value = "";
    }
}

function processarCodigo(codigo) {
    const prod = produtosBase.find(
        p => p.codigo === codigo || p.nome.toLowerCase() === codigo.toLowerCase()
    );
    if (!prod) {
        logDebug(`❌ Não encontrado: ${codigo}`);
        showIndicator(`❌ Código não encontrado: ${codigo}`, "error");
        tocarErro();
        setTimeout(() => {
            if (confirm(`Produto "${codigo}" não encontrado.\nDeseja cadastrar?`)) {
                const el = document.getElementById("prodCodigo");
                if (el) el.value = codigo;
                abrirModal("modalCadastroProduto");
            }
        }, 300);
        return;
    }
    if (estoqueZerado(prod)) {
        showIndicator(`❌ ${prod.nome} — ESTOQUE ZERADO!`, "error");
        tocarErro();
        return;
    }
    if (prod.unidade === "kg") {
        iniciarPesagemInline(prod);
    } else {
        const qtd = PAES_PROMO.includes(prod.nome) ? 3
                  : LINGUA_PROMO.includes(prod.nome) ? 2
                  : 1;
        adicionarItem(prod.nome, qtd);
        atualizarUI();
        showIndicator(`✅ ${prod.nome}`, "success");
        tocarBip();
    }
}

function gerarAtalhos() {
    const tabsEl = document.getElementById("atalhosTabs");
    if (!tabsEl) return;
    tabsEl.innerHTML = CATEGORIAS.map(c =>
      `<button class="tab-btn ${c === categoriaAtual ? "active" : ""}" onclick="selecionarCategoria('${c}')">${c}</button>`
    ).join("");
    renderizarAtalhos();
}

function selecionarCategoria(cat) {
    categoriaAtual = cat;
    gerarAtalhos();
}

function renderizarAtalhos() {
    const grid = document.getElementById("atalhosBtns");
    if (!grid) return;
    const lista = produtosBase.filter(p => p.categoria === categoriaAtual);

    grid.innerHTML = lista.map(p => {
        const isPromo = PAES_PROMO.includes(p.nome);
        const isLingua = LINGUA_PROMO.includes(p.nome);
        const badge = isPromo ? "3 por R$1" : isLingua ? "2 por R$1" : "";
        const unLabel = p.unidade === "kg" ? "/kg ⚖️" : "";

        let estoqueHtml = "";
        if (!ePaes(p) && temControleEstoque(p)) {
            const min = p.estoqueMin ?? 5;
            const cls = p.estoque <= 0 ? "estoque-zero"
                      : p.estoque <= min ? "estoque-baixo"
                      : "estoque-ok";
            const icon = p.estoque <= 0 ? "❌" : p.estoque <= min ? "⚠️" : "✅";
            const label = p.unidade === "kg" ? `${p.estoque.toFixed(3)} kg` : `${p.estoque} un`;
            estoqueHtml = `<div class="atalho-estoque ${cls}">${icon} ${label}</div>`;
        }

        const opaco = (!ePaes(p) && temControleEstoque(p) && p.estoque <= 0)
            ? ' style="opacity:0.55"' : "";

        return `<button class="atalho-btn${opaco}" onclick="clickAtalho('${p.codigo}')">
            ${badge ? `<span class="atalho-badge">${badge}</span>` : ""}
            <div class="atalho-nome">${p.nome}</div>
            <div class="atalho-preco">R$ ${p.preco.toFixed(2)}<span class="atalho-un">${unLabel}</span></div>
            ${estoqueHtml}
        </button>`;
    }).join("");
}

function clickAtalho(codigo) {
    const prod = produtosBase.find(p => p.codigo === codigo);
    if (!prod) return;
    if (estoqueZerado(prod)) {
        showIndicator(`❌ ${prod.nome} — ESTOQUE ZERADO!`, "error");
        tocarErro();
        return;
    }
    if (prod.unidade === "kg") {
        iniciarPesagemInline(prod);
    } else {
        const qtd = PAES_PROMO.includes(prod.nome) ? 3
                  : LINGUA_PROMO.includes(prod.nome) ? 2
                  : 1;
        adicionarItem(prod.nome, qtd);
        atualizarUI();
        tocarBip();
        showIndicator(`✅ ${prod.nome}`, "success");
    }
}

function adicionarItem(nome, qtd) {
    const prod = produtosBase.find(p => p.nome === nome);
    if (!prod) return;
    qtd = parseNumero(qtd);
    if (qtd <= 0) return;

    if (!ePaes(prod) && temControleEstoque(prod)) {
        const existente = carrinho.find(i => i.nome === nome);
        const qtdAtual = existente ? existente.val : 0;
        const futuro = Math.round((qtdAtual + qtd) * 1000) / 1000;
        if (futuro > prod.estoque + 0.0005) {
            const disp = prod.unidade === "kg"
                ? `${prod.estoque.toFixed(3)} kg`
                : `${prod.estoque} un`;
            showIndicator(`⚠️ ${prod.nome} — estoque insuficiente! Disponível: ${disp}`, "error");
            tocarErro();
            return;
        }
    }

    const existente = carrinho.find(i => i.nome === nome);
    if (existente) {
        existente.val = Math.round((existente.val + qtd) * 1000) / 1000;
        existente.totalBruto = existente.val * existente.precoUnit;
    } else {
        carrinho.push({
            nome: prod.nome,
            codigo: prod.codigo,
            val: qtd,
            isKg: prod.unidade === "kg",
            precoUnit: prod.preco,
            totalBruto: qtd * prod.preco
        });
    }
    logDebug(`➕ ${qtd} × ${nome}`);
}

function alterarQtdItem(idx, delta) {
    const item = carrinho[idx];
    if (!item) return;

    if (delta > 0) {
        const prod = produtosBase.find(p => p.nome === item.nome);
        if (prod && !estoqueSuficiente(prod, item.val, delta)) {
            const disp = prod.unidade === "kg"
                ? `${prod.estoque.toFixed(3)} kg`
                : `${prod.estoque} un`;
            showIndicator(`⚠️ ${prod.nome} — estoque insuficiente! Disponível: ${disp}`, "error");
            tocarErro();
            return;
        }
    }

    item.val = item.isKg
        ? Math.round((item.val + delta * 0.1) * 1000) / 1000
        : item.val + delta;

    if (item.val <= 0) {
        removerItem(idx);
        return;
    }
    item.totalBruto = item.val * item.precoUnit;
    atualizarUI();
}

function removerItem(idx) {
    const senha = prompt("Digite a senha para remover o item:");
    if (senha === null) return;
    if (senha !== CONFIG.senha) { alert("❌ Senha incorreta!"); return; }
    logDebug(`🗑️ Removido: ${carrinho[idx]?.nome}`);
    carrinho.splice(idx, 1);
    atualizarUI();
}

function calcularValorItem(item) {
    if (!item) return 0;
    
    // CORRIGIDO: Se não tem totalBruto, calcula a partir de val e precoUnit
    const totalBruto = item.totalBruto !== undefined 
        ? item.totalBruto 
        : (item.val * item.precoUnit);
    
    let val = totalBruto;
    
    if (PAES_PROMO.includes(item.nome) && !(item.isKg || item.unidade === "kg")) {
        const g = Math.floor(item.val / 3), r = item.val % 3;
        val = g * 1.0 + r * 0.35;
    }
    if (LINGUA_PROMO.includes(item.nome)) {
        const g = Math.floor(item.val / 2), r = item.val % 2;
        val = g * 1.0 + r * 0.5;
    }
    return val;
}

function getSubtotal() {
    return carrinho.reduce((s, i) => s + calcularValorItem(i), 0);
}

function getTotal() {
    let sub = getSubtotal();
    const taxa = parseNumero(document.getElementById("taxa")?.value);
    const desc = parseNumero(document.getElementById("desconto")?.value);
    let total = sub + taxa - desc;
    if (total < 0) total = 0;
    const pag = document.getElementById("pagamento")?.value;
    if (pag === "Crédito") total += total * (CONFIG.taxaCredito / 100);
    if (pag === "Dinheiro") total = Math.round(total * 20) / 20;
    return total;
}

function atualizarUI() {
    const div = document.getElementById("carrinho");
    const qtdEl = document.getElementById("carrinhoQtd");

    if (carrinho.length === 0) {
        if (div) {
            div.innerHTML = `<div class="empty-cart">
                <div class="icon">🧺</div><p>Carrinho vazio</p>
                <p style="font-size:0.8rem;margin-top:4px;">Escaneie ou clique em um<br>produto de acesso rápido</p>
            </div>`;
        }
        if (qtdEl) qtdEl.textContent = "0";
    } else {
        if (qtdEl) qtdEl.textContent = carrinho.reduce((a, i) => a + (i.isKg ? 1 : i.val), 0);
        if (div) {
            div.innerHTML = carrinho.map((item, i) => {
                const isPromo = PAES_PROMO.includes(item.nome) && !item.isKg;
                const isLingua = LINGUA_PROMO.includes(item.nome) && !item.isKg;
                const valor = calcularValorItem(item);
                const hasDesc = valor < item.totalBruto - 0.001;
                let tagPromo = "";
                if (isPromo) { const g = Math.floor(item.val / 3); if (g > 0) tagPromo = `🏷️ ${g}× 3un=R$1`; }
                if (isLingua) { const g = Math.floor(item.val / 2); if (g > 0) tagPromo = `🏷️ ${g}× 2un=R$1`; }
                return `<div class="item-linha ${isPromo || isLingua ? "item-promo" : ""} ${item.isKg ? "item-kg" : ""}">
                    <div class="item-controls-mini">
                        <button class="mini-btn mini-plus" onclick="alterarQtdItem(${i},1)">+</button>
                        <span class="mini-qty">${item.isKg ? item.val.toFixed(2) : item.val}</span>
                        <button class="mini-btn mini-minus" onclick="alterarQtdItem(${i},-1)">−</button>
                    </div>
                    <div class="item-info">
                        <div class="item-nome">${item.nome}</div>
                        <div class="item-detalhe">${fmtQtd(item)} × R$ ${item.precoUnit.toFixed(2)}
                            ${tagPromo ? `<span class="item-promo-tag"> ${tagPromo}</span>` : ""}
                        </div>
                    </div>
                    <div class="item-valor">
                        ${hasDesc ? `<span class="riscado">R$ ${item.totalBruto.toFixed(2)}</span>` : ""}
                        R$ ${valor.toFixed(2)}
                    </div>
                    <button onclick="removerItem(${i})" style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#ef4444;border-radius:8px;padding:6px 8px;cursor:pointer;font-size:0.8rem;white-space:nowrap;">🗑️</button>
                </div>`;
            }).join("");
        }
    }

    const sub = getSubtotal();
    const taxaVal = parseNumero(document.getElementById("taxa")?.value);
    const descVal = parseNumero(document.getElementById("desconto")?.value);
    const pag = document.getElementById("pagamento")?.value;
    const taxaCred = pag === "Crédito" ? sub * (CONFIG.taxaCredito / 100) : 0;
    const total = getTotal();

    const subtotalEl = document.getElementById("subtotalValor");
    if (subtotalEl) subtotalEl.innerText = fmtMoeda(sub);
    
    const taxaLinha = document.getElementById("taxaLinha");
    if (taxaLinha) taxaLinha.style.display = taxaVal > 0 ? "flex" : "none";
    
    const taxaValorResumo = document.getElementById("taxaValorResumo");
    if (taxaValorResumo) taxaValorResumo.innerText = fmtMoeda(taxaVal);
    
    const descontoLinha = document.getElementById("descontoLinha");
    if (descontoLinha) descontoLinha.style.display = descVal > 0 ? "flex" : "none";
    
    const descontoValorResumo = document.getElementById("descontoValorResumo");
    if (descontoValorResumo) descontoValorResumo.innerText = `-` + fmtMoeda(descVal);
    
    const creditoLinha = document.getElementById("creditoLinha");
    if (creditoLinha) creditoLinha.style.display = pag === "Crédito" ? "flex" : "none";
    
    const creditoValorResumo = document.getElementById("creditoValorResumo");
    if (creditoValorResumo) creditoValorResumo.innerText = fmtMoeda(taxaCred);
    
    const totalVenda = document.getElementById("totalVenda");
    if (totalVenda) totalVenda.innerText = total.toFixed(2);

    if (pag === "PIX" && pixConfirmado && pixValorConf !== Number(total.toFixed(2))) {
        pixConfirmado = false; pixValorConf = 0;
        const pixConfInfo = document.getElementById("pixConfirmadoInfo");
        const pixAguardInfo = document.getElementById("pixAguardandoInfo");
        if (pixConfInfo) pixConfInfo.style.display = "none";
        if (pixAguardInfo) pixAguardInfo.style.display = "none";
    }
    calcularTroco();
}

function mudouPagamento() {
    const pag = document.getElementById("pagamento")?.value;
    const trocoContainer = document.getElementById("trocoContainer");
    const pixConfirmadoInfo = document.getElementById("pixConfirmadoInfo");
    
    if (trocoContainer) trocoContainer.style.display = pag === "Dinheiro" ? "block" : "none";
    if (pixConfirmadoInfo) pixConfirmadoInfo.style.display = pixConfirmado && pag === "PIX" ? "block" : "none";
    if (pag !== "PIX") { pixConfirmado = false; pixValorConf = 0; }
    atualizarUI();
}

function calcularTroco() {
    const totalEl = document.getElementById("totalVenda");
    const recEl = document.getElementById("valorRecebido");
    const trocoEl = document.getElementById("trocoValor");
    if (!totalEl || !recEl || !trocoEl) return;
    
    const total = parseNumero(totalEl.innerText);
    const rec = parseNumero(recEl.value);
    trocoEl.innerText = Math.max(0, rec - total).toFixed(2);
}

function cancelarVenda() {
    carrinho = [];
    pixConfirmado = false; pixValorConf = 0;
    const taxa = document.getElementById("taxa");
    const desc = document.getElementById("desconto");
    const rec = document.getElementById("valorRecebido");
    const pixConfInfo = document.getElementById("pixConfirmadoInfo");
    const pixAguardInfo = document.getElementById("pixAguardandoInfo");
    
    if (taxa) taxa.value = "";
    if (desc) desc.value = "";
    if (rec) rec.value = "";
    if (pixConfInfo) pixConfInfo.style.display = "none";
    if (pixAguardInfo) pixAguardInfo.style.display = "none";
    fecharModalPix();
    atualizarUI();
    focarScanner();
}

function iniciarPesagemInline(prod) {
    if (estoqueZerado(prod)) {
        showIndicator(`❌ ${prod.nome} — ESTOQUE ZERADO!`, "error");
        tocarErro();
        return;
    }
    produtoPesoAtual = prod;
    const nomeEl = document.getElementById("pesagemProdutoNome");
    if (nomeEl) nomeEl.textContent = `⚖️ ${prod.nome}`;
    
    const inp = document.getElementById("pesagemInput");
    const pesagemEl = document.getElementById("pesagemInline");
    
    if (inp) inp.value = balancaConectada && pesoAtual > 0 ? pesoAtual.toFixed(3).replace(".", ",") : "";
    if (pesagemEl) pesagemEl.classList.add("show");
    if (inp) inp.focus();
    logDebug(`⚖️ Pesagem iniciada: ${prod.nome}`);
}

function confirmarPesoInline() {
    if (!produtoPesoAtual) return;
    const inp = document.getElementById("pesagemInput");
    if (!inp) return;
    
    let peso = parseNumero(inp.value);
    if (peso <= 0 && balancaConectada && pesoAtual > 0) peso = pesoAtual;
    if (peso <= 0) { showIndicator("⚠️ Digite um peso válido!", "error"); return; }

    if (!podeAdicionarQtd(produtoPesoAtual, peso)) {
        const disp = produtoPesoAtual.unidade === "kg"
            ? `${produtoPesoAtual.estoque.toFixed(3)} kg`
            : `${produtoPesoAtual.estoque} un`;
        showIndicator(`⚠️ ${produtoPesoAtual.nome} — estoque insuficiente! Disponível: ${disp}`, "error");
        tocarErro();
        return;
    }

    adicionarItem(produtoPesoAtual.nome, peso);
    atualizarUI();
    showIndicator(`✅ ${produtoPesoAtual.nome} — ${peso.toFixed(3)}kg`, "success");
    tocarBip();
    cancelarPesagem();
}

function cancelarPesagem() {
    const pesagemEl = document.getElementById("pesagemInline");
    const inp = document.getElementById("pesagemInput");
    if (pesagemEl) pesagemEl.classList.remove("show");
    produtoPesoAtual = null;
    if (inp) inp.value = "";
    focarScanner();
}

function adicionarPesoManual() {
    showIndicator("⚠️ Selecione um produto por ⚖️ na lista de atalhos", "info");
}

async function conectarBalanca() {
    if (!("serial" in navigator)) {
        showIndicator("❌ Web Serial não disponível. Use Chrome/Edge.", "error");
        return;
    }
    if (balancaConectada) {
        try { 
            if (balancaReader) await balancaReader.cancel(); 
            if (balancaPort) await balancaPort.close(); 
        } catch (_) {}
        balancaConectada = false;
        const btn = document.getElementById("btnBalanca");
        const info = document.getElementById("balancaInfo");
        const display = document.getElementById("balancaPesoDisplay");
        const usarBtn = document.getElementById("btnUsarPeso");
        
        if (btn) btn.innerHTML = "⚖️ BALANÇA";
        if (info) info.textContent = "Balança desconectada";
        if (display) display.classList.remove("ativo");
        if (usarBtn) usarBtn.style.display = "none";
        showIndicator("Balança desconectada", "info");
        return;
    }
    try {
        balancaPort = await navigator.serial.requestPort();
        await balancaPort.open({ baudRate: 9600, dataBits: 8, stopBits: 1, parity: "none" });
        balancaConectada = true;
        
        const btn = document.getElementById("btnBalanca");
        const info = document.getElementById("balancaInfo");
        const display = document.getElementById("balancaPesoDisplay");
        
        if (btn) btn.innerHTML = "⚖️ DESCONECTAR";
        if (info) info.textContent = "Balança conectada — aguardando leitura";
        if (display) display.classList.add("ativo");
        showIndicator("✅ Balança conectada!", "success");
        lerBalanca();
    } catch (err) {
        if (err.name !== "NotFoundError") showIndicator("❌ " + err.message, "error");
    }
}

async function lerBalanca() {
    if (!balancaConectada || !balancaPort) return;
    const dec = new TextDecoder();
    let buf = "";
    while (balancaConectada && balancaPort.readable) {
        balancaReader = balancaPort.readable.getReader();
        try {
            while (true) {
                const { value, done } = await balancaReader.read();
                if (done) break;
                buf += dec.decode(value, { stream: true });
                const linhas = buf.split("\n");
                buf = linhas.pop();
                for (const linha of linhas) {
                    const m = linha.match(/[+-]?\d+[,\.]\d{1,3}/);
                    if (m) {
                        let p = parseNumero(m[0]);
                        if (p > 100) p /= 1000;
                        if (p >= 0) {
                            pesoAtual = p;
                            const display = document.getElementById("balancaPesoDisplay");
                            const usarBtn = document.getElementById("btnUsarPeso");
                            const pesagemInput = document.getElementById("pesagemInput");
                            
                            if (display) display.textContent = p.toFixed(3) + " kg";
                            if (usarBtn) usarBtn.style.display = p > 0 ? "block" : "none";
                            if (pesagemInput && produtoPesoAtual) {
                                pesagemInput.value = p.toFixed(3).replace(".", ",");
                            }
                        }
                    }
                }
            }
        } catch (_) {
            if (balancaConectada) setTimeout(lerBalanca, 1000);
            break;
        } finally {
            try { balancaReader.releaseLock(); } catch (_) {}
        }
    }
}

async function abrirGaveta() {
    showIndicator("🗄️ Gaveta: Comando enviado", "info");
    tocarBip();
}

//  PIX
function emv(id, v) { return `${id}${String(v.length).padStart(2, "0")}${v}`; }

function crc16(str) {
    let c = 0xffff;
    for (let i = 0; i < str.length; i++) {
        c ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) c = c & 0x8000 ? (c << 1) ^ 0x1021 : c << 1;
        c &= 0xffff;
    }
    return c.toString(16).toUpperCase().padStart(4, "0");
}

function gerarPayloadPix(valor, txId) {
    const chave = "" + CONFIG.pixChave.replace(/\D/g, "");
    const rec = CONFIG.pixNome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().slice(0, 25);
    const cid = CONFIG.pixCidade.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().slice(0, 15);
    const mai = emv("00", "br.gov.bcb.pix") + emv("01", chave);
    const p = emv("00","01") + emv("26",mai) + emv("52","0000") + emv("53","986")
            + emv("54", Number(valor).toFixed(2)) + emv("58","BR")
            + emv("59",rec) + emv("60",cid)
            + emv("62", emv("05", `V${txId || vendaID}`)) + "6304";
    return p + crc16(p);
}

function gerarQrDataUrl(payload) {
    if (typeof QRCode === 'undefined') {
        console.warn("QRCode library não carregada");
        return Promise.resolve("");
    }
    return new Promise(resolve => {
        const tmp = document.createElement("div");
        tmp.style.cssText = "position:fixed;left:-9999px;top:-9999px;background:#fff;padding:6px;";
        document.body.appendChild(tmp);
        try {
            new QRCode(tmp, { text: payload, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.M });
            setTimeout(() => {
                const canvas = tmp.querySelector("canvas");
                resolve(canvas ? canvas.toDataURL("image/png") : "");
                document.body.removeChild(tmp);
            }, 150);
        } catch (e) {
            document.body.removeChild(tmp);
            resolve("");
        }
    });
}

function gerarPixManual() {
    const totalEl = document.getElementById("totalVenda");
    if (!totalEl) return;
    const total = parseNumero(totalEl.innerText);
    if (total <= 0) return showIndicator("⚠️ Adicione produtos!", "error");
    
    const pag = document.getElementById("pagamento");
    if (pag) pag.value = "PIX";
    mudouPagamento();
    
    const pix = gerarPayloadPix(total);
    const qrEl = document.getElementById("pixQrcode");
    const copiaEl = document.getElementById("pixCopiaCola");
    const valorEl = document.getElementById("pixValorModal");
    const modalEl = document.getElementById("pixModalOverlay");
    const aguardEl = document.getElementById("pixAguardandoInfo");
    
    if (qrEl) {
        qrEl.innerHTML = "";
        if (typeof QRCode !== 'undefined') {
            new QRCode(qrEl, { text: pix, width: 240, height: 240 });
        }
    }
    if (copiaEl) copiaEl.value = pix;
    if (valorEl) valorEl.innerText = total.toFixed(2);
    if (modalEl) modalEl.style.display = "flex";
    if (aguardEl) aguardEl.style.display = "block";
}

function fecharModalPix() { 
    const el = document.getElementById("pixModalOverlay");
    if (el) el.style.display = "none"; 
}

async function copiarPix() {
    const el = document.getElementById("pixCopiaCola");
    if (!el) return;
    try { await navigator.clipboard.writeText(el.value); }
    catch (_) { el.select(); document.execCommand("copy"); }
    showIndicator("📋 PIX copiado!", "success");
}

function confirmarPixRecebido() {
    const totalEl = document.getElementById("totalVenda");
    pixConfirmado = true;
    pixValorConf = totalEl ? parseNumero(totalEl.innerText) : 0;
    fecharModalPix();
    
    const aguardEl = document.getElementById("pixAguardandoInfo");
    const confEl = document.getElementById("pixConfirmadoInfo");
    
    if (aguardEl) aguardEl.style.display = "none";
    if (confEl) confEl.style.display = "block";
    showIndicator("✅ PIX confirmado!", "success");
    tocarBip();
}

function abrirConfiguracoes() {
    const campos = {
        configPixChave: CONFIG.pixChave,
        configPixNome: CONFIG.pixNome,
        configPixCidade: CONFIG.pixCidade,
        configTaxaCredito: String(CONFIG.taxaCredito).replace(".", ","),
        configImpressaoAuto: CONFIG.impressaoAuto ? "1" : "0",
        configGavetaAuto: CONFIG.gavetaAuto ? "1" : "0"
    };
    Object.entries(campos).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
    });
    const senhaAtual = document.getElementById("configSenhaAtual");
    const senhaNova = document.getElementById("configSenhaNova");
    if (senhaAtual) senhaAtual.value = "";
    if (senhaNova) senhaNova.value = "";
    abrirModal("modalConfig");
}

function salvarConfiguracoes() {
    const senhaAtual = document.getElementById("configSenhaAtual");
    if (senhaAtual && senhaAtual.value !== CONFIG.senha)
        return showIndicator("❌ Senha incorreta!", "error");
    
    const senhaNova = document.getElementById("configSenhaNova");
    if (senhaNova && senhaNova.value) CONFIG.senha = senhaNova.value;
    
    const campos = {
        configPixChave: "pixChave",
        configPixNome: "pixNome",
        configPixCidade: "pixCidade"
    };
    Object.entries(campos).forEach(([id, prop]) => {
        const el = document.getElementById(id);
        if (el && el.value) CONFIG[prop] = el.value;
    });
    
    const taxaEl = document.getElementById("configTaxaCredito");
    if (taxaEl) CONFIG.taxaCredito = parseNumero(taxaEl.value) || 3.86;
    
    const impEl = document.getElementById("configImpressaoAuto");
    if (impEl) CONFIG.impressaoAuto = impEl.value === "1";
    
    const gavEl = document.getElementById("configGavetaAuto");
    if (gavEl) CONFIG.gavetaAuto = gavEl.value === "1";
    
    localStorage.setItem("pdvConfig", JSON.stringify(CONFIG));
    fecharModal("modalConfig");
    showIndicator("✅ Configurações salvas!", "success");
}

function exportarDados() {
    const blob = JSON.stringify({
        config: CONFIG, produtos: produtosBase, movimentacoes,
        vendaID, caixaAtual, dataExport: new Date().toISOString()
    }, null, 2);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([blob], { type: "application/json" }));
    a.download = `backup_pdv_${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.json`;
    a.click();
    showIndicator("💾 Backup exportado!", "success");
}

function importarDados(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const d = JSON.parse(e.target.result);
            if (!confirm("Restaurar dados do backup?\nIsso substituirá os dados atuais.")) return;
            if (d.config) { CONFIG = d.config; localStorage.setItem("pdvConfig", JSON.stringify(CONFIG)); }
            if (d.produtos) { produtosBase = d.produtos; salvarProdutos(); limparEstoquePaes(); }
            if (d.movimentacoes) { movimentacoes = d.movimentacoes; }
            if (d.vendaID) vendaID = d.vendaID;
            if (d.caixaAtual !== undefined) caixaAtual = d.caixaAtual;
            salvarTudo();
            location.reload();
        } catch (_) { showIndicator("❌ Erro ao ler arquivo!", "error"); }
    };
    reader.readAsText(file);
    event.target.value = "";
}

function limparTudo() {
    if (confirm("⚠️ ATENÇÃO!\n\nApagará TODOS os dados.\nTem certeza?")) {
        if (prompt('Digite "CONFIRMAR" para apagar tudo:') === "CONFIRMAR") {
            localStorage.clear(); location.reload();
        }
    }
}

function abrirHistorico() { filtrarHistorico("todos"); abrirModal("modalHistorico"); }

function filtrarHistorico(tipo, btn) {
    const botoes = document.querySelectorAll(".historico-filtros button");
    botoes.forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    else if (botoes[0]) botoes[0].classList.add("active");
    
    const lista = document.getElementById("historicoLista");
    if (!lista) return;
    
    const movs = tipo === "todos" ? movimentacoes : movimentacoes.filter(m => m.tipo === tipo);
    if (!movs.length) {
        lista.innerHTML = '<div style="text-align:center;color:#666;padding:24px;">Nenhuma movimentação</div>';
        return;
    }
    lista.innerHTML = movs.slice().reverse().slice(0, 60).map(m => `
        <div class="historico-item ${m.tipo.toLowerCase()}">
            <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:4px;">
                <span>${m.tipo} ${m.id ? "#" + m.id : ""}</span>
                <span style="color:${m.valor >= 0 ? "#22c55e" : "#ef4444"}">
                    ${m.valor >= 0 ? "+" : ""}${fmtMoeda(Math.abs(m.valor))}
                </span>
            </div>
            <div style="font-size:0.8rem;color:#888;">
                🕐 ${m.data}
                ${m.pagamento ? " | 💳 " + m.pagamento : ""}
                ${m.motivo ? " | 📝 " + m.motivo : ""}
                ${m.itens ? " | 📦 " + m.itens + " itens" : ""}
            </div>
        </div>`).join("");
}

function abrirCadastroProduto() {
    ["prodCodigo","prodNome","prodPreco","prodEstoque","prodEstoqueMin"]
      .forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
    const unidadeEl = document.getElementById("prodUnidade");
    const catEl = document.getElementById("prodCategoria");
    if (unidadeEl) unidadeEl.value = "un";
    if (catEl) catEl.value = "Outros";
    cadastroCategoriaMudou();
    abrirModal("modalCadastroProduto");
}

function cadastroCategoriaMudou() {
    const catEl = document.getElementById("prodCategoria");
    const estoqueRow = document.getElementById("cadastroEstoqueRow");
    const paesAviso = document.getElementById("cadastroPaesAviso");
    
    const isPaes = catEl && catEl.value === CAT_PAES;
    if (estoqueRow) estoqueRow.style.display = isPaes ? "none" : "grid";
    if (paesAviso) paesAviso.style.display = isPaes ? "block" : "none";
}

function cadastrarProduto() {
    const codigo = (document.getElementById("prodCodigo")?.value || "").trim();
    const nome = (document.getElementById("prodNome")?.value || "").trim();
    const preco = parseNumero(document.getElementById("prodPreco")?.value);
    const unidade = document.getElementById("prodUnidade")?.value || "un";
    const categoria = document.getElementById("prodCategoria")?.value || "Outros";
    
    if (!codigo || !nome || preco <= 0) return showIndicator("⚠️ Preencha todos os campos!", "error");
    if (produtosBase.find(p => p.codigo === codigo)) return showIndicator("❌ Código já existe!", "error");
    
    let estoque, estoqueMin;
    if (categoria === CAT_PAES) { 
        estoque = null; 
        estoqueMin = undefined; 
    } else {
        const raw = document.getElementById("prodEstoque")?.value?.trim() || "";
        const rawMin = document.getElementById("prodEstoqueMin")?.value?.trim() || "";
        estoque = raw === "" ? null : parseFloat(raw);
        estoqueMin = rawMin === "" ? 5 : parseFloat(rawMin);
    }
    
    produtosBase.push({ codigo, nome, preco, unidade, categoria, estoque, estoqueMin });
    salvarProdutos();
    fecharModal("modalCadastroProduto");
    gerarAtalhos();
    showIndicator(`✅ ${nome} cadastrado!`, "success");
}

function iniciarSangria() {
    const vStr = prompt("⬇️ SANGRIA\nDigite o valor a retirar do caixa (ex: 50.50):");
    if (!vStr) return;
    const valor = parseNumero(vStr);
    if (valor <= 0) return showIndicator("⚠️ Valor inválido!", "error");
    if (valor > caixaAtual) return showIndicator(`⚠️ Saldo insuficiente: ${fmtMoeda(caixaAtual)}`, "error");
    const motivo = prompt("Motivo da sangria (opcional):") || "Não informado";
    if (prompt(`Retirar ${fmtMoeda(valor)}\nDigite a senha:`) !== CONFIG.senha)
        return showIndicator("❌ Senha incorreta!", "error");
    caixaAtual -= valor;
    movimentacoes.push({ tipo: "Sangria", valor: -valor, motivo, data: new Date().toLocaleString("pt-BR") });
    salvarTudo();
    showIndicator(`⬇️ Sangria: ${fmtMoeda(valor)}`, "success");
}

function iniciarSuprimento() {
    const vStr = prompt("⬆️ SUPRIMENTO\nDigite o valor a adicionar ao caixa (ex: 100.00):");
    if (!vStr) return;
    const valor = parseNumero(vStr);
    if (valor <= 0) return showIndicator("⚠️ Valor inválido!", "error");
    const motivo = prompt("Motivo do suprimento (opcional):") || "Não informado";
    if (prompt(`Adicionar ${fmtMoeda(valor)}\nDigite a senha:`) !== CONFIG.senha)
        return showIndicator("❌ Senha incorreta!", "error");
    caixaAtual += valor;
    movimentacoes.push({ tipo: "Suprimento", valor, motivo, data: new Date().toLocaleString("pt-BR") });
    salvarTudo();
    showIndicator(`⬆️ Suprimento: ${fmtMoeda(valor)}`, "success");
}

function iniciarCancelamento() {
    if (!carrinho.length) return showIndicator("⚠️ Carrinho vazio!", "info");
    const senhaEl = document.getElementById("cancelarSenha");
    if (senhaEl) senhaEl.value = "";
    abrirModal("modalCancelar");
}

function confirmarCancelamento() {
    const senhaEl = document.getElementById("cancelarSenha");
    if (senhaEl && senhaEl.value !== CONFIG.senha)
        return showIndicator("❌ Senha incorreta!", "error");
    fecharModal("modalCancelar");
    cancelarVenda();
    showIndicator("🗑️ Venda cancelada!", "info");
}

function iniciarFechamento() {
    if (!movimentacoes.length) return showIndicator("⚠️ Sem movimentações!", "info");
    const senhaEl = document.getElementById("fecharSenha");
    if (senhaEl) senhaEl.value = "";
    abrirModal("modalFechar");
}

function confirmarFechamento() {
    const senhaEl = document.getElementById("fecharSenha");
    if (senhaEl && senhaEl.value !== CONFIG.senha)
        return showIndicator("❌ Senha incorreta!", "error");
    fecharModal("modalFechar");
    fecharCaixaTurno();
    vendaID = 1;
    localStorage.setItem("vendaID", vendaID);
    showIndicator("✅ Caixa fechado e contador resetado!", "success");
}

function verTotalCaixa() {
    const senha = prompt("Digite a senha para ver o caixa:");
    if (senha === null) return;
    if (senha !== CONFIG.senha) { alert("❌ Senha incorreta!"); return; }
    const vendas = movimentacoes.filter(m => m.tipo === "Venda");
    const tv = vendas.reduce((a, b) => a + b.valor, 0);
    const ts = movimentacoes.filter(m => m.tipo === "Sangria").reduce((a, b) => a + Math.abs(b.valor), 0);
    const tp = movimentacoes.filter(m => m.tipo === "Suprimento").reduce((a, b) => a + b.valor, 0);
    alert(`💰 RESUMO DO CAIXA\n━━━━━━━━━━━━━━━━━━━━━\n📦 Vendas: ${vendas.length}\n💵 Total Vendas: ${fmtMoeda(tv)}\n⬆️ Suprimentos: ${fmtMoeda(tp)}\n⬇️ Sangrias: ${fmtMoeda(ts)}\n━━━━━━━━━━━━━━━━━━━━━\n💰 SALDO: ${fmtMoeda(caixaAtual)}\n\n🧾 Próxima venda: Nº ${vendaID}`);
}

function darBaixaEstoque(itensVenda) {
    const alertas = [];
    itensVenda.forEach(item => {
        const prod = produtosBase.find(p => p.nome === item.nome);
        if (!prod || ePaes(prod)) return;
        if (!temControleEstoque(prod)) return;
        prod.estoque = Math.max(0, prod.estoque - item.val);
        prod.estoque = prod.unidade === "kg"
            ? Math.round(prod.estoque * 1000) / 1000
            : Math.round(prod.estoque);
        if (prod.estoque <= (prod.estoqueMin ?? 5)) {
            alertas.push(`⚠️ ${prod.nome}: ${prod.estoque}${prod.unidade === "kg" ? " kg" : " un"}`);
        }
    });
    salvarProdutos();
    gerarAtalhos();
    if (alertas.length) setTimeout(() => showIndicator(`📦 Estoque baixo: ${alertas[0]}`, "info"), 1500);
}

function abrirEstoque() {
    const catFiltro = document.getElementById("estoqueFiltroCat");
    const baixoFiltro = document.getElementById("estoqueFiltroBaixo");
    if (catFiltro) catFiltro.value = "";
    if (baixoFiltro) baixoFiltro.value = "";
    renderizarEstoque();
    abrirModal("modalEstoque");
}

function renderizarEstoque() {
    const catFiltro = document.getElementById("estoqueFiltroCat")?.value;
    const baixoFiltro = document.getElementById("estoqueFiltroBaixo")?.value;
    
    let prods = produtosBase.filter(p => {
        if (catFiltro && p.categoria !== catFiltro) return false;
        if (baixoFiltro === "baixo") { 
            if (!temControleEstoque(p)) return false; 
            return p.estoque > 0 && p.estoque <= (p.estoqueMin ?? 5); 
        }
        if (baixoFiltro === "zero") return temControleEstoque(p) && p.estoque <= 0;
        if (baixoFiltro === "sem") return !temControleEstoque(p);
        return true;
    });
    
    const comEstoque = produtosBase.filter(p => !ePaes(p) && temControleEstoque(p));
    const semControle = produtosBase.filter(p => !temControleEstoque(p));
    const baixo = comEstoque.filter(p => p.estoque > 0 && p.estoque <= (p.estoqueMin ?? 5));
    const zero = comEstoque.filter(p => p.estoque <= 0);
    const ok = comEstoque.length - baixo.length - zero.length;
    const paesCount = produtosBase.filter(ePaes).length;
    
    const resumoEl = document.getElementById("estoqueResumo");
    if (resumoEl) {
        resumoEl.innerHTML = `
            <span style="background:rgba(34,197,94,0.15);border:1px solid #22c55e;padding:4px 10px;border-radius:20px;color:#22c55e">✅ ${ok} OK</span>
            <span style="background:rgba(245,158,11,0.15);border:1px solid #f59e0b;padding:4px 10px;border-radius:20px;color:#f59e0b">⚠️ ${baixo.length} Baixo</span>
            <span style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:4px 10px;border-radius:20px;color:#ef4444">❌ ${zero.length} Zerado</span>
            <span style="background:rgba(100,100,100,0.15);border:1px solid #666;padding:4px 10px;border-radius:20px;color:#888">∞ ${semControle.length} Ilimitado</span>
            <span style="background:rgba(232,185,35,0.15);border:1px solid var(--primary);padding:4px 10px;border-radius:20px;color:var(--primary)">🍞 ${paesCount} Pães</span>`;
    }
    
    const lista = document.getElementById("estoqueLista");
    if (!lista) return;
    
    if (!prods.length) {
        lista.innerHTML = '<div style="text-align:center;color:#666;padding:24px;">Nenhum produto encontrado</div>';
        return;
    }
    
    lista.innerHTML = prods.map(p => {
        const idx = produtosBase.indexOf(p);
        const isPao = ePaes(p);
        const sem = !temControleEstoque(p);
        const min = p.estoqueMin ?? 5;
        const cls = sem ? "#888" : p.estoque <= 0 ? "#ef4444" : p.estoque <= min ? "#f59e0b" : "#22c55e";
        const label = isPao ? "∞ Sem controle" : sem ? "—" : p.unidade === "kg" ? `${p.estoque.toFixed(3)} kg` : `${p.estoque} un`;
        const acoes = isPao
            ? `<div style="font-size:0.78rem;color:var(--primary);font-weight:700;padding:7px 12px;background:rgba(232,185,35,0.1);border-radius:8px;">🍞 Sem controle</div>`
            : `<div style="display:flex;gap:6px;align-items:center;">
                <input type="number" id="estInput_${idx}" placeholder="${sem ? "Qtd" : label.replace(" un","").replace(" kg","")}"
                  style="width:80px;padding:7px 8px;background:rgba(0,0,0,0.5);border:1px solid #3f2a1e;border-radius:8px;color:white;text-align:center;outline:none;"
                  onkeydown="if(event.key==='Enter') ajustarEstoque(${idx},false)">
                <button onclick="ajustarEstoque(${idx},false)" style="padding:7px 10px;background:#22c55e;border:none;border-radius:8px;color:white;font-weight:700;cursor:pointer;font-size:0.8rem;">✅ Set</button>
                <button onclick="ajustarEstoque(${idx},true)" style="padding:7px 10px;background:#3b82f6;border:none;border-radius:8px;color:white;font-weight:700;cursor:pointer;font-size:0.8rem;">➕ Add</button>
              </div>`;
        return `<div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:10px 14px;margin-bottom:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;${isPao ? 'border-left:3px solid var(--primary);' : ''}">
            <div style="flex:1;min-width:150px;">
                <div style="font-weight:700;font-size:0.9rem;">${p.nome} ${isPao ? '<span style="font-size:0.7rem;color:var(--primary);">🍞</span>' : ''}</div>
                <div style="font-size:0.75rem;color:#888;">${p.categoria} • ${fmtMoeda(p.preco)}/${p.unidade}</div>
            </div>
            <div style="text-align:center;min-width:90px;">
                <div style="font-size:1.1rem;font-weight:800;color:${cls};">${label}</div>
                ${!isPao && !sem ? `<div style="font-size:0.7rem;color:#666;">mín: ${min}</div>` : ''}
            </div>
            ${acoes}
        </div>`;
    }).join("");
}

function ajustarEstoque(idx, adicionar) {
    const prod = produtosBase[idx];
    if (!prod) return;
    if (ePaes(prod)) { showIndicator("🍞 Pães não possuem controle de estoque!", "error"); return; }
    const inp = document.getElementById(`estInput_${idx}`);
    if (!inp) return;
    const val = parseFloat(inp.value);
    if (isNaN(val) || val < 0) return showIndicator("⚠️ Valor inválido!", "error");
    prod.estoque = adicionar ? (prod.estoque ?? 0) + val : val;
    prod.estoque = prod.unidade === "kg" ? Math.round(prod.estoque * 1000) / 1000 : Math.round(prod.estoque);
    inp.value = "";
    salvarProdutos();
    gerarAtalhos();
    renderizarEstoque();
    showIndicator(`✅ Estoque atualizado: ${prod.nome}`, "success");
}

function exportarEstoque() {
    let csv = "PRODUTO;CATEGORIA;UNIDADE;PRECO;ESTOQUE;ESTOQUE_MIN\n";
    produtosBase.forEach(p => {
        csv += `${p.nome};${p.categoria};${p.unidade};${p.preco.toFixed(2).replace(".",",")};${ePaes(p) ? "PAES-SEM-CONTROLE" : p.estoque ?? "ILIMITADO"};${p.estoqueMin ?? 5}\n`;
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `estoque_${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.csv`;
    a.click();
    showIndicator("📊 Estoque exportado!", "success");
}

async function imprimirCupom(dados) {
    let qrHtml = "";
    if (dados.pagamento === "PIX") {
        const payload = gerarPayloadPix(dados.total);
        const url = await gerarQrDataUrl(payload);
        if (url) {
            qrHtml = `<div style="text-align:center;margin:8px 0 4px;">
                <div style="font-size:13px;font-weight:bold;margin-bottom:4px;">📲 PAGUE VIA PIX</div>
                <img src="${url}" style="width:160px;height:160px;display:block;margin:0 auto;" />
                <div style="font-size:14px;margin-top:4px;">Aponte a câmera para pagar</div>
            </div>`;
        }
    }
    let html = `<div style="font-family:monospace;"><style>*{font-weight:bold!important;}</style>
        <div style="text-align:center;font-size:23px;margin-bottom:4px;">PADARIA TRINDADE</div>
        <div style="text-align:center;font-size:14px;margin-bottom:8px;">Padaria & Confeitaria</div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="font-size:14px;">VENDA Nº ${dados.id}</div>
        <div style="font-size:14px;">${dados.data}</div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>`;
    dados.itens.forEach(item => {
        html += `<div style="display:flex;justify-content:space-between;font-size:15px;margin:2px 0;">
            <span>${fmtQtd(item)} ${item.nome}</span><span>${fmtMoeda(calcularValorItem(item))}</span></div>`;
    });
    html += `<div style="border-top:1px dashed #000;margin:5px 0;"></div>
        <div style="text-align:right;font-weight:bold;font-size:15px;">TOTAL: ${fmtMoeda(dados.total)}</div>
        <div style="border-top:1px dashed #000;margin:5px 0;"></div>
        <div style="font-size:15px;">PAGAMENTO: ${dados.pagamento}</div>`;
    if (dados.pagamento === "Dinheiro" && dados.troco > 0) {
        html += `<div style="font-size:15px;">Recebido: ${fmtMoeda(dados.recebido)}</div>
            <div style="font-size:15px;">Troco: ${fmtMoeda(dados.troco)}</div>`;
    }
    if (qrHtml) html += `<div style="border-top:1px dashed #000;margin:5px 0;"></div>${qrHtml}`;
    html += `<div style="border-top:1px dashed #000;margin:5px 0;"></div>
        <div style="text-align:center;font-size:13px;margin-top:6px;">OBRIGADO PELA PREFERÊNCIA!</div>
        <div style="text-align:center;font-size:13px;margin-top:6px;">@padaria.cofeitaria.trindade</div></div>`;
    
    const cupomEl = document.getElementById("cupom-print");
    if (cupomEl) cupomEl.innerHTML = html;
    if (CONFIG.impressaoAuto) {
        setTimeout(() => { 
            window.print(); 
            setTimeout(() => { if (cupomEl) cupomEl.innerHTML = ""; }, 1500); 
        }, 300);
    }
}

async function imprimirCupomMulti(dados) {
    let pixBlocks = "";
    for (const p of dados.pagamentoDetalhes) {
        if (p.metodo === "PIX") {
            const payload = gerarPayloadPix(p.valor);
            const url = await gerarQrDataUrl(payload);
            if (url) {
                pixBlocks += `<div style="text-align:center;margin:8px 0 4px;">
                    <div style="font-size:13px;font-weight:bold;margin-bottom:4px;">📲 PIX — ${fmtMoeda(p.valor)}</div>
                    <img src="${url}" style="width:140px;height:140px;display:block;margin:0 auto;" /></div>`;
            }
        }
    }
    let html = `<div style="font-family:monospace;"><style>*{font-weight:bold!important;}</style>
        <div style="text-align:center;font-size:23px;margin-bottom:4px;">PADARIA TRINDADE</div>
        <div style="text-align:center;font-size:14px;margin-bottom:8px;">Padaria & Confeitaria</div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="font-size:14px;">VENDA Nº ${dados.id}</div>
        <div style="font-size:14px;">${dados.data}</div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>`;
    dados.itens.forEach(item => {
        html += `<div style="display:flex;justify-content:space-between;font-size:15px;margin:2px 0;">
            <span>${fmtQtd(item)} ${item.nome}</span><span>${fmtMoeda(calcularValorItem(item))}</span></div>`;
    });
    html += `<div style="border-top:1px dashed #000;margin:5px 0;"></div>
        <div style="text-align:right;font-weight:bold;font-size:15px;">TOTAL: ${fmtMoeda(dados.total)}</div>
        <div style="border-top:1px dashed #000;margin:5px 0;"></div>
        <div style="font-size:14px;font-weight:bold;margin-bottom:4px;">PAGAMENTO MÚLTIPLO:</div>`;
    const icons = { PIX: "[PIX]", Dinheiro: "[DIN]", Cartão: "[DEB]", Crédito: "[CRE]" };
    dados.pagamentoDetalhes.forEach(p => {
        html += `<div style="display:flex;justify-content:space-between;font-size:14px;">
            <span>${icons[p.metodo] || "[???]"} ${p.metodo}</span><span>${fmtMoeda(p.valor)}</span></div>`;
        if (p.troco > 0) html += `<div style="font-size:13px;text-align:right;">Troco: ${fmtMoeda(p.troco)}</div>`;
    });
    if (pixBlocks) html += `<div style="border-top:1px dashed #000;margin:5px 0;"></div>${pixBlocks}`;
    html += `<div style="border-top:1px dashed #000;margin:5px 0;"></div>
        <div style="text-align:center;font-size:13px;margin-top:6px;">OBRIGADO PELA PREFERÊNCIA!</div>
        <div style="text-align:center;font-size:13px;margin-top:6px;">@padaria.cofeitaria.trindade</div></div>`;
    
    const cupomEl = document.getElementById("cupom-print");
    if (cupomEl) cupomEl.innerHTML = html;
    if (CONFIG.impressaoAuto) {
        setTimeout(() => { 
            window.print(); 
            setTimeout(() => { if (cupomEl) cupomEl.innerHTML = ""; }, 1500); 
        }, 300);
    }
}

function imprimirFechamento(d) {
    const html = `<div style="font-family:monospace;"><style>*{font-weight:bold!important;}</style>
        <div style="text-align:center;font-size:20px;">PADARIA TRINDADE</div>
        <div style="text-align:center;font-size:12px;margin-bottom:6px;">FECHAMENTO DE CAIXA</div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="font-size:11px;">${d.data}</div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>TOTAL</span><span>${fmtMoeda(d.tv)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>PIX</span><span>${fmtMoeda(d.vPix)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>DINHEIRO</span><span>${fmtMoeda(d.vDin)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>DÉBITO</span><span>${fmtMoeda(d.vDeb)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>CRÉDITO</span><span>${fmtMoeda(d.vCred)}</span></div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>SUPRIMENTOS</span><span>${fmtMoeda(d.tp)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:11px;"><span>SANGRIAS</span><span>${fmtMoeda(d.ts)}</span></div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;"><span>SALDO FINAL</span><span>${fmtMoeda(d.saldo)}</span></div>
        <div style="border-top:2px dashed #000;margin:6px 0;"></div>
        <div style="text-align:center;font-size:10px;">CAIXA ENCERRADO</div></div>`;
    
    const cupomEl = document.getElementById("cupom-print");
    if (cupomEl) cupomEl.innerHTML = html;
    if (CONFIG.impressaoAuto) {
        setTimeout(() => { 
            window.print(); 
            setTimeout(() => { if (cupomEl) cupomEl.innerHTML = ""; }, 1500); 
        }, 300);
    }
}

function imprimirUltimaNota() {
    if (!ultimaVendaDados) return showIndicator("⚠️ Nenhuma venda recente!", "info");
    if (ultimaVendaDados.pagamento === "Múltiplo") imprimirCupomMulti(ultimaVendaDados);
    else imprimirCupom(ultimaVendaDados);
    showIndicator("🖨️ Reimprimindo...", "info");
}

async function finalizarVenda() {
    if (!carrinho.length) return showIndicator("⚠️ Carrinho vazio!", "error");
    const pag = document.getElementById("pagamento")?.value;
    const total = getTotal();
    
    if (pag === "Dinheiro") {
        const rec = parseNumero(document.getElementById("valorRecebido")?.value);
        if (rec < total) return showIndicator("⚠️ Valor recebido insuficiente!", "error");
    }
    
    let troco = 0, recebido = total;
    if (pag === "Dinheiro") {
        recebido = parseNumero(document.getElementById("valorRecebido")?.value);
        troco = recebido - total;
    }
    
    const dados = {
        id: vendaID, 
        data: new Date().toLocaleString("pt-BR"),
        pagamento: pag, 
        total, 
        recebido, 
        troco,
        itens: carrinho.map(i => ({ ...i }))
    };
    
    // CORRIGIDO: itensList agora inclui totalBruto
    movimentacoes.push({
        tipo: "Venda", 
        id: vendaID, 
        valor: total, 
        pagamento: pag,
        itens: carrinho.length,
        itensList: carrinho.map(i => ({ 
            nome: i.nome, 
            val: i.val, 
            isKg: i.isKg, 
            precoUnit: i.precoUnit,
            totalBruto: i.totalBruto  // ✅ CORRIGIDO: adicionado
        })),
        data: dados.data
    });
    
    caixaAtual += total;
    vendaID++;
    salvarTudo();
    ultimaVendaDados = dados;
    darBaixaEstoque(dados.itens);
    await imprimirCupom(dados);
    if (pag === "Dinheiro" && CONFIG.gavetaAuto) abrirGaveta();
    cancelarVenda();
    
    const vendaIdEl = document.getElementById("vendaID");
    if (vendaIdEl) vendaIdEl.innerText = vendaID;
    
    showIndicator(`✅ Venda Nº ${dados.id} — ${fmtMoeda(total)}`, "success");
    tocarBip();
    logDebug(`✅ Venda ${dados.id}: ${fmtMoeda(total)} (${pag})`);
}

function abrirMultiPagamento() {
    if (!carrinho.length) return showIndicator("⚠️ Carrinho vazio!", "error");
    mpParcelas = [];
    mpTotalVenda = getTotal();
    
    const totalEl = document.getElementById("mpTotalVal");
    if (totalEl) totalEl.innerText = mpTotalVenda.toFixed(2);
    
    const metodoEl = document.getElementById("mpMetodo");
    if (metodoEl) metodoEl.value = "PIX";
    
    const qrEl = document.getElementById("mpPixQr");
    if (qrEl) { qrEl.classList.remove("show"); qrEl.innerHTML = ""; }
    
    const copiaEl = document.getElementById("mpPixCopiaCola");
    if (copiaEl) copiaEl.style.display = "none";
    
    const trocoPrev = document.getElementById("mpTrocoPreview");
    if (trocoPrev) trocoPrev.style.display = "none";
    
    const valorInp = document.getElementById("mpValorInput");
    if (valorInp) valorInp.value = mpTotalVenda.toFixed(2).replace(".", ",");
    
    mpRenderizar();
    abrirModal("modalMultiPag");
    setTimeout(() => { if (valorInp) valorInp.focus(); }, 200);
}

function mpRestante() {
    return Math.max(0, Math.round((mpTotalVenda - mpParcelas.reduce((a, p) => a + p.valor, 0)) * 100) / 100);
}

function mpRenderizar() {
    const rest = mpRestante();
    const pago = mpParcelas.reduce((a, p) => a + p.valor, 0);
    const pct = mpTotalVenda > 0 ? Math.min(100, (pago / mpTotalVenda) * 100) : 0;
    
    const pagoEl = document.getElementById("mpPagoVal");
    const progressBar = document.getElementById("mpProgressBar");
    const restEl = document.getElementById("mpRestanteVal");
    const boxEl = document.getElementById("mpRestanteBox");
    
    if (pagoEl) pagoEl.innerText = pago.toFixed(2);
    if (progressBar) progressBar.style.width = pct + "%";
    
    if (restEl && boxEl) {
        if (rest <= 0) {
            restEl.textContent = "✅ PAGO INTEGRALMENTE";
            restEl.className = "multipag-restante-val zerado";
            boxEl.className = "multipag-restante-box zerado";
        } else {
            restEl.textContent = fmtMoeda(rest);
            restEl.className = "multipag-restante-val tem-saldo";
            boxEl.className = "multipag-restante-box tem-saldo";
        }
    }
    
    const inp = document.getElementById("mpValorInput");
    if (inp) inp.value = rest > 0 ? rest.toFixed(2).replace(".", ",") : "";
    
    const lista = document.getElementById("mpLista");
    if (!lista) return;
    
    if (!mpParcelas.length) {
        lista.innerHTML = '<div style="text-align:center;color:#555;padding:14px;font-size:0.85rem;">Nenhuma forma adicionada ainda</div>';
    } else {
        const icones = { PIX: "📲", Dinheiro: "💵", Cartão: "💳", Crédito: "💳" };
        const classes = { PIX: "pix-parcela", Dinheiro: "dinheiro-parcela", Cartão: "cartao-parcela", Crédito: "credito-parcela" };
        lista.innerHTML = mpParcelas.map((p, i) => {
            const trocoHtml = p.troco > 0 ? `<div class="multipag-parcela-troco">🔄 Troco: ${fmtMoeda(p.troco)}</div>` : "";
            const taxaHtml = p.metodo === "Crédito" && p.taxa > 0 ? `<div style="font-size:0.72rem;color:#f59e0b;">Taxa: +${fmtMoeda(p.taxa)}</div>` : "";
            return `<div class="multipag-parcela ${classes[p.metodo] || ""}">
                <div class="multipag-parcela-info">
                    <div class="multipag-parcela-metodo">${icones[p.metodo] || "💰"} ${p.metodo}</div>
                    ${taxaHtml}${trocoHtml}
                </div>
                <div class="multipag-parcela-val">${fmtMoeda(p.valor)}</div>
                <button class="btn-rm-parcela" onclick="mpRemoverParcela(${i})">✕</button>
            </div>`;
        }).join("");
    }
    
    const btn = document.getElementById("mpBtnFin");
    if (btn) {
        btn.disabled = rest > 0;
        btn.textContent = rest <= 0 && mpParcelas.length
            ? `✅ FINALIZAR — ${mpParcelas.length} forma(s) de pagamento`
            : "✅ FINALIZAR VENDA COM PAGAMENTO MÚLTIPLO";
    }
    mpAtualizarTroco();
}

function mpMetodoMudou() {
    const metodo = document.getElementById("mpMetodo")?.value;
    const trocoPrev = document.getElementById("mpTrocoPreview");
    
    if (trocoPrev) trocoPrev.style.display = metodo === "Dinheiro" ? "block" : "none";
    
    if (metodo !== "PIX") {
        const qrEl = document.getElementById("mpPixQr");
        if (qrEl) { qrEl.classList.remove("show"); qrEl.innerHTML = ""; }
        const copiaEl = document.getElementById("mpPixCopiaCola");
        if (copiaEl) copiaEl.style.display = "none";
    }
    mpAtualizarTroco();
}

function mpAtualizarTroco() {
    const metodo = document.getElementById("mpMetodo")?.value;
    const val = parseNumero(document.getElementById("mpValorInput")?.value);
    const rest = mpRestante();
    const trocoVal = document.getElementById("mpTrocoVal");
    const trocoPrev = document.getElementById("mpTrocoPreview");
    
    if (metodo === "Dinheiro" && val > 0 && trocoVal) {
        trocoVal.textContent = fmtMoeda(Math.max(0, val - rest));
        if (trocoPrev) trocoPrev.style.display = "block";
    } else {
        if (trocoPrev) trocoPrev.style.display = "none";
    }
}

async function mpAdicionarParcela() {
    const metodo = document.getElementById("mpMetodo")?.value;
    let valor = parseNumero(document.getElementById("mpValorInput")?.value);
    const rest = mpRestante();
    
    if (valor <= 0) return showIndicator("⚠️ Digite um valor!", "error");
    if (rest <= 0) return showIndicator("✅ Já está totalmente pago!", "info");
    
    let taxa = 0;
    if (metodo === "Crédito") taxa = valor * (CONFIG.taxaCredito / 100);
    
    let troco = 0;
    if (metodo === "Dinheiro") {
        if (valor >= rest) { troco = Math.round((valor - rest) * 100) / 100; valor = rest; }
        valor = Math.round(valor * 20) / 20;
    } else {
        if (valor > rest + 0.005) {
            if (!confirm(`Valor ${fmtMoeda(valor)} excede o restante ${fmtMoeda(rest)}.\nDeseja cobrar apenas ${fmtMoeda(rest)}?`)) return;
            valor = rest;
        }
        valor = Math.min(valor, rest);
    }
    
    mpParcelas.push({ metodo, valor, troco, taxa });
    
    if (metodo === "PIX") {
        const payload = gerarPayloadPix(valor);
        const qrDiv = document.getElementById("mpPixQr");
        const copiaEl = document.getElementById("mpPixCopiaCola");
        const copiaInp = document.getElementById("mpPixCopiaColaInput");
        
        if (qrDiv) {
            qrDiv.innerHTML = "";
            qrDiv.classList.add("show");
            if (typeof QRCode !== 'undefined') {
                new QRCode(qrDiv, { text: payload, width: 180, height: 180 });
            }
        }
        if (copiaInp) copiaInp.value = payload;
        if (copiaEl) copiaEl.style.display = "block";
        showIndicator(`📲 QR Code PIX — ${fmtMoeda(valor)}`, "info");
    } else {
        const qrDiv = document.getElementById("mpPixQr");
        const copiaEl = document.getElementById("mpPixCopiaCola");
        if (qrDiv) { qrDiv.classList.remove("show"); qrDiv.innerHTML = ""; }
        if (copiaEl) copiaEl.style.display = "none";
    }
    
    tocarBip();
    showIndicator(`✅ ${metodo} — ${fmtMoeda(valor)} adicionado`, "success");
    mpRenderizar();
}

function mpRemoverParcela(i) {
    mpParcelas.splice(i, 1);
    if (!mpParcelas.some(p => p.metodo === "PIX")) {
        const qrDiv = document.getElementById("mpPixQr");
        const copiaEl = document.getElementById("mpPixCopiaCola");
        if (qrDiv) { qrDiv.classList.remove("show"); qrDiv.innerHTML = ""; }
        if (copiaEl) copiaEl.style.display = "none";
    }
    mpRenderizar();
    showIndicator("🗑️ Parcela removida", "info");
}

function mpLimparParcelas() {
    mpParcelas = [];
    const qrDiv = document.getElementById("mpPixQr");
    const copiaEl = document.getElementById("mpPixCopiaCola");
    if (qrDiv) { qrDiv.classList.remove("show"); qrDiv.innerHTML = ""; }
    if (copiaEl) copiaEl.style.display = "none";
    mpRenderizar();
}

function mpCancelar() { mpParcelas = []; fecharModal("modalMultiPag"); }

async function copiarPixMulti() {
    const el = document.getElementById("mpPixCopiaColaInput");
    if (!el) return;
    try { await navigator.clipboard.writeText(el.value); } catch (_) { el.select(); document.execCommand("copy"); }
    showIndicator("📋 PIX copiado!", "success");
}

async function mpFinalizarVenda() {
    if (mpRestante() > 0 || !mpParcelas.length)
        return showIndicator("⚠️ Pagamento incompleto!", "error");
    
    const total = mpTotalVenda;
    const totalTroco = mpParcelas.reduce((a, p) => a + p.troco, 0);
    const totalRecebido = mpParcelas.reduce((a, p) => a + p.valor, 0) + totalTroco;
    const pagResumido = mpParcelas.map(p => `${p.metodo}(${fmtMoeda(p.valor)})`).join(" + ");
    
    const dados = {
        id: vendaID, 
        data: new Date().toLocaleString("pt-BR"),
        pagamento: "Múltiplo", 
        pagamentoDetalhes: mpParcelas.map(p => ({ ...p })),
        total, 
        recebido: totalRecebido, 
        troco: totalTroco,
        itens: carrinho.map(i => ({ ...i }))
    };
    
    // CORRIGIDO: itensList agora inclui totalBruto
    movimentacoes.push({
        tipo: "Venda", 
        id: vendaID, 
        valor: total,
        pagamento: "Múltiplo: " + pagResumido,
        itens: carrinho.length,
        itensList: carrinho.map(i => ({ 
            nome: i.nome, 
            val: i.val, 
            isKg: i.isKg, 
            precoUnit: i.precoUnit,
            totalBruto: i.totalBruto  // ✅ CORRIGIDO: adicionado
        })),
        data: dados.data
    });
    
    caixaAtual += total; 
    vendaID++; 
    salvarTudo();
    ultimaVendaDados = dados;
    darBaixaEstoque(dados.itens);
    fecharModal("modalMultiPag");
    await imprimirCupomMulti(dados);
    if (mpParcelas.some(p => p.metodo === "Dinheiro") && CONFIG.gavetaAuto) abrirGaveta();
    cancelarVenda();
    
    const vendaIdEl = document.getElementById("vendaID");
    if (vendaIdEl) vendaIdEl.innerText = vendaID;
    
    showIndicator(`✅ Venda Nº ${dados.id} — ${fmtMoeda(total)} (Múltiplo)`, "success");
    tocarBip();
    logDebug(`✅ Venda ${dados.id}: ${fmtMoeda(total)} (${mpParcelas.length} formas)`);
    mpParcelas = [];
}

function fecharCaixaTurno() {
    let tv = 0, ts = 0, tp = 0, vPix = 0, vDin = 0, vDeb = 0, vCred = 0;
    const saidasPorItem = {};
    
    movimentacoes.forEach(m => {
        if (m.tipo === "Venda") {
            tv += m.valor;
            const pag = m.pagamento || "";
            if (pag.startsWith("PIX")) vPix += m.valor;
            else if (pag.startsWith("Dinheiro")) vDin += m.valor;
            else if (pag.startsWith("Cartão") || pag.includes("DEB")) vDeb += m.valor;
            else if (pag.startsWith("Crédito") || pag.includes("CRE")) vCred += m.valor;
            
            // CORRIGIDO: calcula valor corretamente usando totalBruto
            if (Array.isArray(m.itensList)) {
                m.itensList.forEach(item => {
                    if (!saidasPorItem[item.nome]) {
                        saidasPorItem[item.nome] = { 
                            qtd: 0, 
                            total: 0, 
                            unidade: item.isKg ? "kg" : "un" 
                        };
                    }
                    saidasPorItem[item.nome].qtd = Math.round((saidasPorItem[item.nome].qtd + item.val) * 1000) / 1000;
                    // ✅ CORRIGIDO: usa calcularValorItem que agora lida com dados parciais
                    saidasPorItem[item.nome].total += calcularValorItem(item);
                });
            }
        } else if (m.tipo === "Sangria") {
            ts += Math.abs(m.valor);
        } else if (m.tipo === "Suprimento") {
            tp += m.valor;
        }
    });
    
    let csv = "TIPO;ID;VALOR;PAGAMENTO/MOTIVO;DATA\n";
    movimentacoes.forEach(m => {
        csv += `${m.tipo};${m.id || ""};${Math.abs(m.valor).toFixed(2).replace(".",",")};${m.pagamento || m.motivo || ""};${m.data}\n`;
    });
    csv += `\n===RESUMO===\nTOTAL;;${tv.toFixed(2).replace(".",",")};;\nPIX;;${vPix.toFixed(2).replace(".",",")};;\nDINHEIRO;;${vDin.toFixed(2).replace(".",",")};;\nDEBITO;;${vDeb.toFixed(2).replace(".",",")};;\nCREDITO;;${vCred.toFixed(2).replace(".",",")};;\nSUPRIMENTOS;;${tp.toFixed(2).replace(".",",")};;\nSANGRIAS;;${ts.toFixed(2).replace(".",",")};;\nSALDO;;${(tv + tp - ts).toFixed(2).replace(".",",")};;\n`;
    
    const linhasItens = Object.entries(saidasPorItem).sort((a, b) => b[1].total - a[1].total);
    if (linhasItens.length) {
        csv += "\n===SAIDAS POR PRODUTO===\nPRODUTO;UNIDADE;QTD;VALOR\n";
        linhasItens.forEach(([nome, d]) => {
            const q = d.unidade === "kg" ? d.qtd.toFixed(3).replace(".",",") : String(Math.round(d.qtd));
            csv += `${nome};${d.unidade};${q};${d.total.toFixed(2).replace(".",",")}\n`;
        });
    }
    
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `FECHAMENTO_${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.csv`;
    a.click();
    
    const saldo = tv + tp - ts;
    imprimirFechamento({ data: new Date().toLocaleString("pt-BR"), tv, ts, tp, vPix, vDin, vDeb, vCred, saldo });
    
    alert(`🔒 FECHAMENTO DO CAIXA\n━━━━━━━━━━━━━━━━━━━━━━━\n💵 Total Vendas: ${fmtMoeda(tv)}\n  • PIX: ${fmtMoeda(vPix)}\n  • Dinheiro: ${fmtMoeda(vDin)}\n  • Débito: ${fmtMoeda(vDeb)}\n  • Crédito: ${fmtMoeda(vCred)}\n⬆️ Suprimentos: ${fmtMoeda(tp)}\n⬇️ Sangrias: ${fmtMoeda(ts)}\n━━━━━━━━━━━━━━━━━━━━━━━\n💰 SALDO FINAL: ${fmtMoeda(saldo)}`);
    
    if (confirm("🔄 Zerar caixa para próximo turno?")) {
        localStorage.removeItem("movimentacoes");
        localStorage.setItem("caixaAtual", "0");
        location.reload();
    }
}

window.onload = () => {
    limparEstoquePaes();
    gerarAtalhos();
    atualizarUI();
    const vendaIdEl = document.getElementById("vendaID");
    if (vendaIdEl) vendaIdEl.innerText = vendaID;
    focarScanner();
};

window.onbeforeunload = () => {
    if (balancaConectada) {
        try { 
            if (balancaReader) balancaReader.cancel(); 
            if (balancaPort) balancaPort.close(); 
        } catch (_) {}
    }
};