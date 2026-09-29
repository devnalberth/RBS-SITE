(function () {
  'use strict';

  const API_URL = '/api/cartas.php';
  const WHATSAPP = '5511989864178';
  const root = document.getElementById('cartas-app');
  if (!root) return;

  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const integer = new Intl.NumberFormat('pt-BR');
  const TYPES = { imovel: 'Imóvel', veiculo: 'Veículo', servico: 'Serviço', outro: 'Outro' };
  const STATUSES = { disponivel: 'Disponível', reservada: 'Reservada', vendida: 'Vendida' };

  const state = {
    cartas: [], loading: true, error: false, type: 'todos', statuses: new Set(['disponivel', 'reservada']),
    term: 'todos', entry: 'todos', query: '', sort: 'valor-desc', selected: new Set(), detailId: null, proposal: false,
  };

  const icon = (name) => `<svg class="ico" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const plain = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  function toNumber(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const clean = String(value ?? '').replace(/[^\d,.-]/g, '');
    return Number(clean.includes(',') ? clean.replace(/\./g, '').replace(',', '.') : clean) || 0;
  }

  function first(object, keys) {
    for (const key of keys) if (object?.[key] !== undefined && object?.[key] !== null && object?.[key] !== '') return object[key];
    return undefined;
  }

  function normalizeType(value) {
    const key = plain(value);
    if (key.includes('imov') || key.includes('imob')) return 'imovel';
    if (key.includes('veic') || key.includes('auto')) return 'veiculo';
    if (key.includes('serv')) return 'servico';
    return key || 'outro';
  }

  function normalizeStatus(value) {
    const key = plain(value);
    if (key.includes('reserv')) return 'reservada';
    if (key.includes('vend')) return 'vendida';
    return 'disponivel';
  }

  function normalizePhases(raw, count, amount) {
    let source = first(raw, ['fases', 'parcelasFases', 'parcelas_fases']);
    if (typeof source === 'string') try { source = JSON.parse(source); } catch { source = []; }
    const phases = Array.isArray(source) ? source.map((phase) => ({
      quantidade: Math.max(0, Math.round(toNumber(first(phase, ['quantidade', 'parcelas', 'count', 'qtd'])))),
      valorMensal: Math.max(0, toNumber(first(phase, ['valorMensal', 'valorParcela', 'valor', 'amount']))),
    })).filter((phase) => phase.quantidade && phase.valorMensal) : [];
    return phases.length ? phases : count > 0 && amount > 0 ? [{ quantidade: count, valorMensal: amount }] : [];
  }

  function normalizeCarta(raw, index) {
    const valor = toNumber(first(raw, ['valor', 'valorCredito', 'credito']));
    const entrada = toNumber(first(raw, ['entrada', 'valorEntrada']));
    const prazo = Math.max(0, Math.round(toNumber(first(raw, ['prazo', 'parcelas']))));
    const valorParcela = toNumber(first(raw, ['valorParcela', 'parcela']));
    const fases = normalizePhases(raw, prazo, valorParcela);
    const grupo = first(raw, ['grupoNumero', 'grupo']);
    const cota = first(raw, ['cotaNumero', 'cota']);
    const numero = first(raw, ['numero', 'numeroCarta']) || [grupo && `G${grupo}`, cota && `C${cota}`].filter(Boolean).join(' · ') || `Carta ${index + 1}`;
    const saldoRaw = first(raw, ['saldoDevedor', 'saldo', 'saldo_devedor']);
    const percentRaw = first(raw, ['entradaPercent', 'percentualEntrada', 'entrada_percent']);
    return {
      id: String(raw.id || numero || index), numero: String(numero), administradora: String(raw.administradora || 'Administradora'),
      tipo: normalizeType(raw.tipo), status: normalizeStatus(raw.status), valor, entrada,
      entradaPercent: percentRaw !== undefined ? toNumber(percentRaw) : valor ? (entrada / valor) * 100 : 0,
      saldoDevedor: saldoRaw !== undefined ? toNumber(saldoRaw) : fases.reduce((sum, phase) => sum + phase.quantidade * phase.valorMensal, 0),
      prazo: prazo || fases.reduce((sum, phase) => sum + phase.quantidade, 0),
      valorParcela: valorParcela || fases[0]?.valorMensal || 0, fases,
      taxa: toNumber(first(raw, ['taxa', 'taxaTransferencia', 'taxa_transferencia'])),
    };
  }

  function phasesLabel(carta) {
    return carta.fases.length
      ? carta.fases.map((phase) => `${integer.format(phase.quantidade)}x ${brl.format(phase.valorMensal)}`).join(' + ')
      : carta.valorParcela ? `${carta.prazo}x ${brl.format(carta.valorParcela)}` : 'Consulte condições';
  }

  const cents = (value) => Math.round((Number(value) || 0) * 100);

  function totals(cartas) {
    return cartas.reduce((sum, carta) => ({ credit: sum.credit + cents(carta.valor), entry: sum.entry + cents(carta.entrada), balance: sum.balance + cents(carta.saldoDevedor), fee: sum.fee + cents(carta.taxa), term: Math.max(sum.term, carta.prazo) }), { credit: 0, entry: 0, balance: 0, fee: 0, term: 0 });
  }

  function phaseRanges(cartas) {
    const timelines = cartas.map((carta) => carta.fases.flatMap((phase) => Array(phase.quantidade).fill(cents(phase.valorMensal))));
    const max = Math.max(0, ...timelines.map((timeline) => timeline.length));
    const ranges = [];
    for (let month = 0; month < max; month += 1) {
      const amount = timelines.reduce((sum, timeline) => sum + (timeline[month] || 0), 0);
      if (!amount) continue;
      const previous = ranges[ranges.length - 1];
      if (previous && previous.amount === amount && previous.end === month) previous.end = month + 1;
      else ranges.push({ start: month + 1, end: month + 1, amount });
    }
    return ranges;
  }

  function rangeLabel(range) {
    return `${range.start === range.end ? `Parcela ${range.start}` : `Parcelas ${range.start} a ${range.end}`} de ${brl.format(range.amount / 100)}`;
  }

  function selectedCartas() { return state.cartas.filter((carta) => state.selected.has(carta.id) && carta.status === 'disponivel'); }

  function visibleCartas() {
    const query = plain(state.query);
    const list = state.cartas.filter((carta) => {
      const type = state.type === 'todos' || carta.tipo === state.type;
      const status = state.statuses.has(carta.status);
      const term = state.term === 'todos' || state.term === 'ate-60' && carta.prazo <= 60 || state.term === '61-120' && carta.prazo >= 61 && carta.prazo <= 120 || state.term === 'mais-120' && carta.prazo > 120;
      const entry = state.entry === 'todos' || state.entry === 'ate-30' && carta.entradaPercent <= 30 || state.entry === '31-50' && carta.entradaPercent > 30 && carta.entradaPercent <= 50 || state.entry === 'mais-50' && carta.entradaPercent > 50;
      return type && status && term && entry && (!query || plain(`${carta.numero} ${carta.administradora}`).includes(query));
    });
    const [key, direction] = state.sort.split('-');
    return list.sort((left, right) => {
      const a = left[key]; const b = right[key];
      const comparison = typeof a === 'string' ? a.localeCompare(b, 'pt-BR') : (a || 0) - (b || 0);
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  function whatsapp(cartas) {
    const summary = totals(cartas);
    const lines = cartas.length > 1 ? [
      `Olá, tenho interesse em uma composição de ${cartas.length} cartas contempladas da RBS.`, '', 'RESUMO DA COMPOSIÇÃO',
      `Crédito: ${brl.format(summary.credit / 100)}`, `Entrada: ${brl.format(summary.entry / 100)}`, `Saldo devedor: ${brl.format(summary.balance / 100)}`,
      '', 'Parcelas:', ...phaseRanges(cartas).map(rangeLabel), '', 'Cartas:', ...cartas.map((carta, index) => `${index + 1}. ${carta.numero} · ${TYPES[carta.tipo]} · ${brl.format(carta.valor)}`),
    ] : ['Olá, tenho interesse nesta carta contemplada da RBS.', '', `Carta: ${cartas[0].numero}`, `Produto: ${TYPES[cartas[0].tipo]}`, `Crédito: ${brl.format(cartas[0].valor)}`, `Entrada: ${brl.format(cartas[0].entrada)}`, `Prazo: ${cartas[0].prazo} meses`, `Parcelas: ${phasesLabel(cartas[0])}`];
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function metricsMarkup(summary) {
    const items = [['Crédito total', brl.format(summary.credit / 100)], ['Entrada total', brl.format(summary.entry / 100)], ['Saldo devedor', brl.format(summary.balance / 100)], ...(summary.fee ? [['Taxa de transferência', brl.format(summary.fee / 100)]] : []), ['Prazo máximo', `${summary.term} meses`]];
    return `<div class="rbs-selection-metrics">${items.map(([label, value]) => `<div class="rbs-selection-metric"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
  }

  function selectionMarkup() {
    const cartas = selectedCartas();
    if (!cartas.length) return '';
    const summary = totals(cartas);
    return `<aside class="rbs-selection"><div class="rbs-selection-topline"><div><span>${cartas.length} ${cartas.length === 1 ? 'carta selecionada' : 'cartas selecionadas'}</span><strong>Resumo da composição</strong></div><button type="button" data-action="clear-selection">Limpar seleção</button></div>${metricsMarkup(summary)}<div class="rbs-selection-phases"><span>Composição das parcelas</span><div>${phaseRanges(cartas).map((range) => `<small>${rangeLabel(range)}</small>`).join('')}</div></div><div class="rbs-selection-actions"><button type="button" class="rbs-secondary-button" data-action="proposal">Ver proposta</button><a class="rbs-primary-button" href="${whatsapp(cartas)}" target="_blank" rel="noopener noreferrer">Negociar ${cartas.length > 1 ? 'composição' : 'carta'}</a></div></aside>`;
  }

  function rowMarkup(carta) {
    const selected = state.selected.has(carta.id);
    const reserved = carta.status === 'reservada';
    const logoKey = plain(carta.administradora).replace(/[^a-z0-9]/g, '');
    const logo = logoKey.includes('embracon') ? 'embracon' : logoKey.includes('volks') ? 'volkswagen' : logoKey.includes('bradesco') ? 'bradesco' : '';
    const admin = logo ? `<img src="/assets/icons/${logo}.svg" alt="${esc(carta.administradora)}" class="rbs-admin-logo">` : `<span class="rbs-admin-name">${esc(carta.administradora)}</span>`;
    return `<tr class="${selected ? 'is-selected' : ''}"><td data-label="Selecionar" class="rbs-check-column"><label class="rbs-row-check ${reserved ? 'is-disabled' : ''}"><input type="checkbox" data-select="${esc(carta.id)}" ${selected ? 'checked' : ''} ${reserved ? 'disabled' : ''}><span>${icon('check')}</span></label></td><td data-label="Administradora">${admin}</td><td data-label="Produto"><span class="rbs-pill rbs-pill--${carta.tipo}">${esc(TYPES[carta.tipo] || carta.tipo)}</span></td><td data-label="Status"><span class="rbs-pill rbs-pill--${carta.status}">${esc(STATUSES[carta.status])}</span></td><td data-label="Valor do crédito" class="rbs-money-cell"><strong>${brl.format(carta.valor)}</strong></td><td data-label="Entrada" class="rbs-money-cell"><strong>${brl.format(carta.entrada)}</strong><small>${carta.entradaPercent.toFixed(2)}%</small></td><td data-label="Prazo"><strong>${carta.prazo}</strong><small> meses</small></td><td data-label="Parcelas / fases" class="rbs-phases-cell">${esc(phasesLabel(carta))}</td><td data-label="Detalhes"><button type="button" class="rbs-eye-button" data-detail="${esc(carta.id)}" aria-label="Ver detalhes">${icon('eye')}</button></td><td data-label="Ação">${reserved ? '<span class="rbs-reserved-action">Reservada</span>' : `<a class="rbs-row-action" href="${whatsapp([carta])}" target="_blank" rel="noopener noreferrer">Negociar</a>`}</td></tr>`;
  }

  function tableMarkup(cartas) {
    if (!cartas.length) return `<div class="rbs-catalog-state"><strong>Nenhuma carta encontrada.</strong><span>Ajuste os filtros para visualizar outras opções.</span><button class="rbs-secondary-button rbs-secondary-button--light" data-action="reset">Limpar filtros</button></div>`;
    const cols = [['administradora', 'Administradora'], ['tipo', 'Produto'], ['status', 'Status'], ['valor', 'Valor do crédito'], ['entrada', 'Entrada'], ['prazo', 'Prazo'], ['valorParcela', 'Parcelas / fases']];
    return `<div class="rbs-table-wrap"><table class="rbs-cards-table"><caption class="sr-only">Lista de cartas contempladas</caption><thead><tr><th class="rbs-check-column"></th>${cols.map(([key, label]) => `<th><button type="button" class="rbs-sort-button" data-sort="${key}">${label} ${icon('sort')}</button></th>`).join('')}<th>Detalhes</th><th>Ação</th></tr></thead><tbody>${cartas.map(rowMarkup).join('')}</tbody></table></div>`;
  }

  function modalMarkup() {
    const carta = state.cartas.find((item) => item.id === state.detailId);
    const selected = selectedCartas();
    if (!carta && !(state.proposal && selected.length)) return '';
    if (carta) return `<div class="rbs-modal-backdrop" data-action="close-modal"><section class="rbs-modal" role="dialog" aria-modal="true" aria-label="Detalhes da carta"><button class="rbs-modal-close" data-action="close-modal" aria-label="Fechar">${icon('x')}</button><span class="rbs-modal-kicker">Carta contemplada</span><div class="rbs-modal-heading"><div><span class="rbs-pill rbs-pill--${carta.tipo}">${TYPES[carta.tipo]}</span><h2>${esc(carta.numero)}</h2></div><span class="rbs-pill rbs-pill--${carta.status}">${STATUSES[carta.status]}</span></div><div class="rbs-modal-credit"><span>Crédito disponível</span><strong>${brl.format(carta.valor)}</strong><small>${esc(phasesLabel(carta))} / mês</small></div><div class="rbs-modal-data">${[['Administradora', carta.administradora], ['Entrada', brl.format(carta.entrada)], ['% de entrada', `${carta.entradaPercent.toFixed(2)}%`], ['Saldo devedor', brl.format(carta.saldoDevedor)], ['Prazo', `${carta.prazo} meses`]].map(([label, value]) => `<div><span>${label}</span><strong>${esc(value)}</strong></div>`).join('')}</div>${carta.status === 'disponivel' ? `<a class="rbs-primary-button rbs-modal-action" href="${whatsapp([carta])}" target="_blank" rel="noopener noreferrer">Negociar esta carta</a>` : ''}</section></div>`;
    const summary = totals(selected);
    return `<div class="rbs-modal-backdrop" data-action="close-modal"><section class="rbs-modal rbs-modal--wide" role="dialog" aria-modal="true" aria-label="Resumo da proposta"><button class="rbs-modal-close" data-action="close-modal" aria-label="Fechar">${icon('x')}</button><span class="rbs-modal-kicker">Composição de cotas</span><div class="rbs-proposal-title"><div><h2>Resumo da proposta</h2><span>${selected.length} ${selected.length === 1 ? 'cota selecionada' : 'cotas selecionadas'}</span></div><strong>${brl.format(summary.credit / 100)}</strong></div>${metricsMarkup(summary)}<div class="rbs-proposal-columns"><div><h3>Composição das parcelas</h3><ul>${phaseRanges(selected).map((range) => `<li>${rangeLabel(range)}</li>`).join('')}</ul></div><div><h3>Detalhes por carta</h3><ul>${selected.map((item) => `<li><strong>${esc(item.numero)}</strong><span>${TYPES[item.tipo]} · ${brl.format(item.valor)} · ${esc(phasesLabel(item))}</span></li>`).join('')}</ul></div></div><a class="rbs-primary-button rbs-modal-action" href="${whatsapp(selected)}" target="_blank" rel="noopener noreferrer">Negociar composição</a></section></div>`;
  }

  function render() {
    if (state.loading) { root.innerHTML = '<div class="rbs-catalog-state" role="status"><span class="rbs-spinner"></span><strong>Carregando cartas</strong><span>Estamos consultando as oportunidades disponíveis.</span></div>'; return; }
    if (state.error) { root.innerHTML = '<div class="rbs-catalog-state rbs-catalog-state--error"><strong>Não foi possível carregar as cartas agora.</strong><span>Tente novamente em alguns instantes.</span><button class="rbs-primary-button" data-action="retry">Tentar novamente</button></div>'; return; }
    const visible = visibleCartas();
    root.innerHTML = `<div class="rbs-catalog-heading"><div><span class="rbs-catalog-kicker rbs-catalog-kicker--dark">Tabela de cotas disponíveis</span><h2 id="catalog-title">Catálogo de cartas</h2><p>Selecione uma ou mais cartas para montar uma proposta.</p></div><div class="rbs-type-filters">${[['todos', 'Todos'], ['imovel', 'Imóvel'], ['veiculo', 'Veículo']].map(([value, label]) => `<button type="button" data-type="${value}" class="${state.type === value ? 'is-active' : ''}">${label}</button>`).join('')}</div></div><div class="rbs-filter-panel"><label class="rbs-search-field"><span class="sr-only">Buscar carta</span><span class="rbs-search-icon" aria-hidden="true">${icon('search')}</span><input data-filter="query" value="${esc(state.query)}" placeholder="Busque por carta ou administradora"></label>${selectMarkup('term', 'Prazo', [['todos', 'Todos'], ['ate-60', 'Até 60 meses'], ['61-120', '61 a 120 meses'], ['mais-120', 'Mais de 120 meses']])}${selectMarkup('entry', 'Entrada', [['todos', 'Todas'], ['ate-30', 'Até 30%'], ['31-50', '31% a 50%'], ['mais-50', 'Mais de 50%']])}${selectMarkup('sort', 'Ordenar', [['valor-desc', 'Maior crédito'], ['valor-asc', 'Menor crédito'], ['entrada-asc', 'Menor entrada'], ['prazo-asc', 'Menor prazo']])}<button class="rbs-reset-button" data-action="reset">${icon('refresh')} Limpar</button></div><div class="rbs-catalog-toolbar"><div class="rbs-status-filters"><span>Exibir</span>${[['disponivel', 'Disponíveis'], ['reservada', 'Reservadas']].map(([value, label]) => `<label class="rbs-status-chip rbs-status-chip--${value} ${state.statuses.has(value) ? 'is-on' : ''}"><input type="checkbox" data-status="${value}" ${state.statuses.has(value) ? 'checked' : ''}><span class="rbs-status-check">${icon('check')}</span>${label}</label>`).join('')}</div><div class="rbs-export-actions"><button data-action="excel" ${visible.length ? '' : 'disabled'}>${icon('download')} Excel</button><button data-action="pdf" ${visible.length ? '' : 'disabled'}>${icon('file')} PDF</button></div></div>${selectionMarkup()}<div class="rbs-results-line"><span>${visible.length} ${visible.length === 1 ? 'carta encontrada' : 'cartas encontradas'}</span><small>Disponibilidade atualizada pela InvestMaster</small></div>${tableMarkup(visible)}${modalMarkup()}`;
    document.body.classList.toggle('modal-open', Boolean(state.detailId || state.proposal));
  }

  function selectMarkup(key, label, options) {
    return `<label class="rbs-select-field"><span>${label}</span><select data-filter="${key}">${options.map(([value, text]) => `<option value="${value}" ${state[key] === value ? 'selected' : ''}>${text}</option>`).join('')}</select><b>${icon('down')}</b></label>`;
  }

  function reset() { Object.assign(state, { type: 'todos', statuses: new Set(['disponivel', 'reservada']), term: 'todos', entry: 'todos', query: '', sort: 'valor-desc' }); render(); }

  function exportExcel(cartas) {
    const headers = ['Carta', 'Administradora', 'Produto', 'Status', 'Crédito', 'Entrada', 'Prazo', 'Parcelas'];
    const rows = cartas.map((carta) => [carta.numero, carta.administradora, TYPES[carta.tipo], STATUSES[carta.status], carta.valor.toFixed(2), carta.entrada.toFixed(2), carta.prazo, phasesLabel(carta)]);
    const html = `<table><tr>${headers.map((item) => `<th>${item}</th>`).join('')}</tr>${rows.map((row) => `<tr>${row.map((item) => `<td>${esc(item)}</td>`).join('')}</tr>`).join('')}</table>`;
    const url = URL.createObjectURL(new Blob([`\ufeff${html}`], { type: 'application/vnd.ms-excel;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `cartas-rbs-${new Date().toISOString().slice(0, 10)}.xls`; link.click(); URL.revokeObjectURL(url);
  }

  function exportPdf(cartas) {
    const popup = window.open('', '_blank', 'width=1100,height=800'); if (!popup) return;
    popup.document.write(`<html><head><title>Cartas contempladas RBS</title><style>body{font-family:Arial;padding:20px;color:#123747}h1{border-bottom:4px solid #2c6d82;padding-bottom:12px}table{width:100%;border-collapse:collapse;font-size:11px}th{background:#0d2f3e;color:#fff;padding:8px;text-align:left}td{padding:8px;border-bottom:1px solid #d5e0e5}</style></head><body onload="window.print()"><h1>Cartas contempladas RBS</h1><table><tr><th>Carta</th><th>Administradora</th><th>Produto</th><th>Crédito</th><th>Entrada</th><th>Prazo</th></tr>${cartas.map((carta) => `<tr><td>${esc(carta.numero)}</td><td>${esc(carta.administradora)}</td><td>${TYPES[carta.tipo]}</td><td>${brl.format(carta.valor)}</td><td>${brl.format(carta.entrada)}</td><td>${carta.prazo} meses</td></tr>`).join('')}</table></body></html>`); popup.document.close();
  }

  root.addEventListener('click', (event) => {
    const type = event.target.closest('[data-type]'); if (type) { state.type = type.dataset.type; render(); return; }
    const sort = event.target.closest('[data-sort]'); if (sort) { const key = sort.dataset.sort; const current = state.sort.split('-'); state.sort = `${key}-${current[0] === key && current[1] === 'asc' ? 'desc' : 'asc'}`; render(); return; }
    const detail = event.target.closest('[data-detail]'); if (detail) { state.detailId = detail.dataset.detail; render(); return; }
    const action = event.target.closest('[data-action]'); if (!action) return;
    if (action.dataset.action === 'reset') reset();
    if (action.dataset.action === 'retry') load();
    if (action.dataset.action === 'clear-selection') { state.selected.clear(); render(); }
    if (action.dataset.action === 'proposal') { state.proposal = true; render(); }
    if (action.dataset.action === 'close-modal') { state.detailId = null; state.proposal = false; render(); }
    if (action.dataset.action === 'excel') exportExcel(visibleCartas());
    if (action.dataset.action === 'pdf') exportPdf(visibleCartas());
  });

  root.addEventListener('change', (event) => {
    if (event.target.matches('[data-select]')) { const id = event.target.dataset.select; state.selected.has(id) ? state.selected.delete(id) : state.selected.add(id); render(); }
    if (event.target.matches('[data-status]')) { const status = event.target.dataset.status; state.statuses.has(status) ? state.statuses.delete(status) : state.statuses.add(status); render(); }
    if (event.target.matches('select[data-filter]')) { state[event.target.dataset.filter] = event.target.value; render(); }
  });

  root.addEventListener('input', (event) => {
    if (!event.target.matches('input[data-filter="query"]')) return;
    state.query = event.target.value;
    const selection = event.target.selectionStart;
    render();
    const input = root.querySelector('input[data-filter="query"]'); input?.focus(); input?.setSelectionRange(selection, selection);
  });

  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && (state.detailId || state.proposal)) { state.detailId = null; state.proposal = false; render(); } });

  async function load() {
    state.loading = true; state.error = false; render();
    try {
      const response = await fetch(`${API_URL}?per_page=1000&limit=1000&_=${Date.now()}`, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      const text = await response.text();
      if (!response.ok || text.trim().startsWith('<')) throw new Error('Resposta inválida');
      const json = JSON.parse(text); const data = Array.isArray(json) ? json : json.data || json.cartas || [];
      state.cartas = data.map(normalizeCarta);
    } catch (error) { console.error('Falha ao carregar cartas:', error); state.error = true; }
    finally { state.loading = false; render(); }
  }

  load();
})();
