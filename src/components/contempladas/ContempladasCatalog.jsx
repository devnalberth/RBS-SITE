import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownUp,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileText,
  LoaderCircle,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { WHATSAPP_ID } from '@/lib/contato';

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const number = new Intl.NumberFormat('pt-BR');

const TYPE_LABELS = {
  imovel: 'Imóvel',
  veiculo: 'Veículo',
  servico: 'Serviço',
  outro: 'Outro',
};

const STATUS_LABELS = {
  disponivel: 'Disponível',
  reservada: 'Reservada',
  vendida: 'Vendida',
};

function plain(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function toNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value !== 'string') return Number(value) || 0;
  const clean = value.replace(/[^\d,.-]/g, '');
  const normalized = clean.includes(',')
    ? clean.replace(/\./g, '').replace(',', '.')
    : clean;
  return Number(normalized) || 0;
}

function first(raw, keys) {
  for (const key of keys) {
    if (raw?.[key] !== undefined && raw?.[key] !== null && raw?.[key] !== '') {
      return raw[key];
    }
  }
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

function normalizePhases(raw, fallbackCount, fallbackAmount) {
  let source = first(raw, ['fases', 'parcelasFases', 'parcelas_fases']);
  if (typeof source === 'string') {
    try {
      source = JSON.parse(source);
    } catch {
      source = [];
    }
  }

  const phases = Array.isArray(source)
    ? source
        .map((phase) => ({
          quantidade: Math.max(
            0,
            Math.round(toNumber(first(phase, ['quantidade', 'parcelas', 'count', 'qtd'])))
          ),
          valorMensal: Math.max(
            0,
            toNumber(first(phase, ['valorMensal', 'valorParcela', 'valor', 'amount']))
          ),
        }))
        .filter((phase) => phase.quantidade > 0 && phase.valorMensal > 0)
    : [];

  if (phases.length) return phases;
  if (fallbackCount > 0 && fallbackAmount > 0) {
    return [{ quantidade: fallbackCount, valorMensal: fallbackAmount }];
  }
  return [];
}

function normalizeCarta(raw, index) {
  const valor = toNumber(first(raw, ['valor', 'valorCredito', 'credito']));
  const entrada = toNumber(first(raw, ['entrada', 'valorEntrada']));
  const prazo = Math.max(0, Math.round(toNumber(first(raw, ['prazo', 'parcelas']))));
  const valorParcela = toNumber(first(raw, ['valorParcela', 'parcela']));
  const grupo = first(raw, ['grupoNumero', 'grupo']);
  const cota = first(raw, ['cotaNumero', 'cota']);
  const numeroCarta = first(raw, ['numero', 'numeroCarta']);
  const numeroCompleto = numeroCarta || [grupo && `G${grupo}`, cota && `C${cota}`].filter(Boolean).join(' · ');
  const fases = normalizePhases(raw, prazo, valorParcela);
  const saldoApi = first(raw, ['saldoDevedor', 'saldo', 'saldo_devedor']);
  const saldoDevedor = saldoApi !== undefined
    ? toNumber(saldoApi)
    : fases.reduce((sum, phase) => sum + phase.quantidade * phase.valorMensal, 0);
  const percentApi = first(raw, ['entradaPercent', 'percentualEntrada', 'entrada_percent']);

  return {
    id: String(raw?.id || numeroCarta || `${grupo || 'g'}-${cota || index}`),
    numero: String(numeroCompleto || `Carta ${index + 1}`),
    administradora: String(raw?.administradora || 'Administradora').trim(),
    tipo: normalizeType(raw?.tipo),
    status: normalizeStatus(raw?.status),
    valor,
    entrada,
    entradaPercent: percentApi !== undefined
      ? toNumber(percentApi)
      : valor > 0
        ? (entrada / valor) * 100
        : 0,
    saldoDevedor,
    prazo: prazo || fases.reduce((sum, phase) => sum + phase.quantidade, 0),
    parcelas: Math.max(0, Math.round(toNumber(raw?.parcelas))) || prazo,
    valorParcela: valorParcela || fases[0]?.valorMensal || 0,
    fases,
    taxa: toNumber(first(raw, ['taxa', 'taxaTransferencia', 'taxa_transferencia'])),
  };
}

function phasesLabel(carta) {
  if (carta.fases.length) {
    return carta.fases
      .map((phase) => `${number.format(phase.quantidade)}x ${money.format(phase.valorMensal)}`)
      .join(' + ');
  }
  if (carta.parcelas && carta.valorParcela) {
    return `${number.format(carta.parcelas)}x ${money.format(carta.valorParcela)}`;
  }
  return 'Consulte condições';
}

function toCents(value) {
  return Math.round((Number(value) || 0) * 100);
}

function combinedPhaseRanges(cartas) {
  const timelines = cartas.map((carta) => {
    const timeline = [];
    carta.fases.forEach((phase) => {
      for (let i = 0; i < phase.quantidade; i += 1) {
        timeline.push(toCents(phase.valorMensal));
      }
    });
    return timeline;
  });
  const maxLength = Math.max(0, ...timelines.map((timeline) => timeline.length));
  const ranges = [];

  for (let month = 0; month < maxLength; month += 1) {
    const amount = timelines.reduce((sum, timeline) => sum + (timeline[month] || 0), 0);
    if (!amount) continue;
    const previous = ranges[ranges.length - 1];
    if (previous && previous.amount === amount && previous.end === month) {
      previous.end = month + 1;
    } else {
      ranges.push({ start: month + 1, end: month + 1, amount });
    }
  }
  return ranges;
}

function rangeLabel(range) {
  const months = range.start === range.end
    ? `Parcela ${range.start}`
    : `Parcelas ${range.start} a ${range.end}`;
  return `${months} de ${money.format(range.amount / 100)}`;
}

function getTotals(cartas) {
  return cartas.reduce(
    (totals, carta) => ({
      credit: totals.credit + toCents(carta.valor),
      entry: totals.entry + toCents(carta.entrada),
      balance: totals.balance + toCents(carta.saldoDevedor),
      fee: totals.fee + toCents(carta.taxa),
      term: Math.max(totals.term, carta.prazo),
    }),
    { credit: 0, entry: 0, balance: 0, fee: 0, term: 0 }
  );
}

function whatsappUrl(cartas) {
  const totals = getTotals(cartas);
  const composition = cartas.length > 1;
  const lines = composition
    ? [
        `Olá, tenho interesse em uma composição de ${cartas.length} cartas contempladas da RBS.`,
        '',
        'RESUMO DA COMPOSIÇÃO',
        `Crédito: ${money.format(totals.credit / 100)}`,
        `Entrada: ${money.format(totals.entry / 100)}`,
        `Saldo devedor: ${money.format(totals.balance / 100)}`,
        ...(totals.fee ? [`Taxa de transferência: ${money.format(totals.fee / 100)}`] : []),
        '',
        'Parcelas:',
        ...combinedPhaseRanges(cartas).map(rangeLabel),
        '',
        'Cartas:',
        ...cartas.map(
          (carta, index) =>
            `${index + 1}. ${carta.numero} · ${TYPE_LABELS[carta.tipo] || carta.tipo} · Crédito ${money.format(carta.valor)} · Entrada ${money.format(carta.entrada)}`
        ),
      ]
    : [
        'Olá, tenho interesse nesta carta contemplada da RBS.',
        '',
        `Carta: ${cartas[0].numero}`,
        `Produto: ${TYPE_LABELS[cartas[0].tipo] || cartas[0].tipo}`,
        `Crédito: ${money.format(cartas[0].valor)}`,
        `Entrada: ${money.format(cartas[0].entrada)}`,
        `Prazo: ${cartas[0].prazo} meses`,
        `Parcelas: ${phasesLabel(cartas[0])}`,
      ];
  return `https://wa.me/${WHATSAPP_ID}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
}

function exportExcel(cartas) {
  const headings = ['Carta', 'Administradora', 'Produto', 'Status', 'Crédito', 'Entrada', '% Entrada', 'Saldo devedor', 'Prazo', 'Parcelas / fases'];
  const rows = cartas.map((carta) => [
    carta.numero,
    carta.administradora,
    TYPE_LABELS[carta.tipo] || carta.tipo,
    STATUS_LABELS[carta.status] || carta.status,
    carta.valor.toFixed(2),
    carta.entrada.toFixed(2),
    carta.entradaPercent.toFixed(2),
    carta.saldoDevedor.toFixed(2),
    carta.prazo,
    phasesLabel(carta),
  ]);
  const table = `<table><thead><tr>${headings.map((item) => `<th>${item}</th>`).join('')}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((item) => `<td>${escapeHtml(item)}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;
  const blob = new Blob([`\ufeff${table}`], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cartas-contempladas-rbs-${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportPdf(cartas) {
  const popup = window.open('', '_blank', 'width=1180,height=800');
  if (!popup) return;
  const rows = cartas.map((carta) => `
    <tr>
      <td>${escapeHtml(carta.numero)}</td>
      <td>${escapeHtml(carta.administradora)}</td>
      <td>${escapeHtml(TYPE_LABELS[carta.tipo] || carta.tipo)}</td>
      <td>${money.format(carta.valor)}</td>
      <td>${money.format(carta.entrada)}</td>
      <td>${carta.prazo} meses</td>
      <td>${escapeHtml(phasesLabel(carta))}</td>
    </tr>`).join('');
  popup.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Cartas contempladas RBS</title><style>
    @page{size:A4 landscape;margin:12mm}body{font-family:Arial,sans-serif;color:#121214;margin:0}.head{border-bottom:4px solid #d1a84b;margin-bottom:20px;padding-bottom:14px;display:flex;justify-content:space-between;align-items:end}.eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8b6b22;font-weight:700}h1{font-family:Georgia,serif;font-size:25px;margin:4px 0}.meta{font-size:10px;color:#666;text-align:right}table{width:100%;border-collapse:collapse;font-size:10px}th{background:#0a0a0a;color:#fff;text-align:left;padding:9px 7px}td{padding:8px 7px;border-bottom:1px solid #ddd}tr:nth-child(even) td{background:#f4f2ed}.foot{margin-top:16px;font-size:10px;color:#777}</style></head><body onload="window.print()">
    <div class="head"><div><div class="eyebrow">RBS Consultoria Inteligente</div><h1>Cartas contempladas</h1></div><div class="meta">Gerado em ${new Date().toLocaleDateString('pt-BR')}<br>${cartas.length} carta(s)</div></div>
    <table><thead><tr><th>Carta</th><th>Administradora</th><th>Produto</th><th>Crédito</th><th>Entrada</th><th>Prazo</th><th>Parcelas / fases</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="foot">Valores e disponibilidade sujeitos à confirmação.</p></body></html>`);
  popup.document.close();
}

function AdminLogo({ name }) {
  const key = plain(name).replace(/[^a-z0-9]/g, '');
  if (key.includes('embracon')) {
    return <img src="/icons/embracon.svg" alt={name} className="rbs-admin-logo" />;
  }
  if (key.includes('volks')) {
    return <img src="/icons/volkswagen.svg" alt={name} className="rbs-admin-logo" />;
  }
  return <span className="rbs-admin-name">{name}</span>;
}

function Modal({ children, label, onClose, wide = false }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="rbs-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={`rbs-modal ${wide ? 'rbs-modal--wide' : ''}`} role="dialog" aria-modal="true" aria-label={label}>
        <button ref={closeRef} type="button" className="rbs-modal-close" onClick={onClose} aria-label="Fechar">
          <X aria-hidden="true" />
        </button>
        {children}
      </section>
    </div>
  );
}

function Metrics({ totals }) {
  const items = [
    ['Crédito total', money.format(totals.credit / 100)],
    ['Entrada total', money.format(totals.entry / 100)],
    ['Saldo devedor', money.format(totals.balance / 100)],
    ...(totals.fee ? [['Taxa de transferência', money.format(totals.fee / 100)]] : []),
    ['Prazo máximo', `${totals.term} meses`],
  ];
  return (
    <div className="rbs-selection-metrics">
      {items.map(([label, value]) => (
        <div className="rbs-selection-metric" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function ContempladasCatalog() {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [type, setType] = useState('todos');
  const [statuses, setStatuses] = useState(() => new Set(['disponivel', 'reservada']));
  const [term, setTerm] = useState('todos');
  const [entry, setEntry] = useState('todos');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('valor-desc');
  const [selected, setSelected] = useState(() => new Set());
  const [detail, setDetail] = useState(null);
  const [proposalOpen, setProposalOpen] = useState(false);

  async function loadCartas() {
    setLoading(true);
    setError(false);
    try {
      const apiPath = process.env.NODE_ENV === 'development' ? '/api/cartas-dev' : '/api/cartas.php';
      const response = await fetch(`${apiPath}?per_page=1000&limit=1000&_=${Date.now()}`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      const body = await response.text();
      if (!response.ok || body.trim().startsWith('<')) throw new Error('invalid response');
      const json = JSON.parse(body);
      const data = Array.isArray(json) ? json : json?.data || json?.cartas || [];
      setCartas(data.map(normalizeCarta));
    } catch (loadError) {
      console.error('Falha ao carregar cartas contempladas:', loadError);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCartas();
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = plain(query);
    const result = cartas.filter((carta) => {
      const matchesType = type === 'todos' || carta.tipo === type;
      const matchesStatus = statuses.has(carta.status);
      const matchesTerm = term === 'todos'
        || (term === 'ate-60' && carta.prazo <= 60)
        || (term === '61-120' && carta.prazo >= 61 && carta.prazo <= 120)
        || (term === 'mais-120' && carta.prazo > 120);
      const matchesEntry = entry === 'todos'
        || (entry === 'ate-30' && carta.entradaPercent <= 30)
        || (entry === '31-50' && carta.entradaPercent > 30 && carta.entradaPercent <= 50)
        || (entry === 'mais-50' && carta.entradaPercent > 50);
      const haystack = plain(`${carta.numero} ${carta.administradora} ${TYPE_LABELS[carta.tipo] || carta.tipo}`);
      return matchesType && matchesStatus && matchesTerm && matchesEntry && (!normalizedQuery || haystack.includes(normalizedQuery));
    });

    const [key, direction] = sort.split('-');
    return [...result].sort((left, right) => {
      const a = left[key];
      const b = right[key];
      const comparison = typeof a === 'string'
        ? a.localeCompare(b, 'pt-BR')
        : (a || 0) - (b || 0);
      return direction === 'asc' ? comparison : -comparison;
    });
  }, [cartas, entry, query, sort, statuses, term, type]);

  const selectedCartas = useMemo(
    () => cartas.filter((carta) => selected.has(carta.id) && carta.status === 'disponivel'),
    [cartas, selected]
  );
  const totals = useMemo(() => getTotals(selectedCartas), [selectedCartas]);
  const phaseRanges = useMemo(() => combinedPhaseRanges(selectedCartas), [selectedCartas]);

  function toggleStatus(status) {
    setStatuses((current) => {
      const next = new Set(current);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }

  function toggleSelected(carta) {
    if (carta.status !== 'disponivel') return;
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(carta.id)) next.delete(carta.id);
      else next.add(carta.id);
      return next;
    });
  }

  function changeSort(key) {
    setSort((current) => {
      const [currentKey, currentDirection] = current.split('-');
      if (currentKey !== key) return `${key}-asc`;
      return `${key}-${currentDirection === 'asc' ? 'desc' : 'asc'}`;
    });
  }

  function resetFilters() {
    setType('todos');
    setStatuses(new Set(['disponivel', 'reservada']));
    setTerm('todos');
    setEntry('todos');
    setQuery('');
    setSort('valor-desc');
  }

  return (
    <div className="rbs-catalog-page">
      <header className="rbs-catalog-hero">
        <div className="rbs-catalog-hero__line" aria-hidden="true" />
        <div className="rbs-catalog-container rbs-catalog-hero__content">
          <div>
            <span className="rbs-catalog-kicker">Crédito para realizar agora</span>
            <h1>Cartas <em>contempladas</em></h1>
          </div>
          <p>
            Compare as oportunidades disponíveis e selecione uma ou mais cartas para montar uma proposta sob medida.
          </p>
        </div>
      </header>

      <section id="catalogo-contempladas" className="rbs-catalog-section" aria-labelledby="catalog-title">
        <div className="rbs-catalog-container">
          <div className="rbs-catalog-heading">
            <div>
              <span className="rbs-catalog-kicker rbs-catalog-kicker--dark">Tabela de cotas disponíveis</span>
              <h2 id="catalog-title">Catálogo de cartas</h2>
              <p>Selecione uma ou mais cartas para montar uma proposta.</p>
            </div>
            <div className="rbs-type-filters" role="group" aria-label="Filtrar por produto">
              {[
                ['todos', 'Todos'],
                ['imovel', 'Imóvel'],
                ['veiculo', 'Veículo'],
              ].map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={type === value ? 'is-active' : ''}
                  aria-pressed={type === value}
                  onClick={() => setType(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rbs-filter-panel">
            <label className="rbs-search-field">
              <span className="sr-only">Buscar carta</span>
              <Search aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por carta ou administradora" />
            </label>
            <label className="rbs-select-field">
              <span>Prazo</span>
              <select value={term} onChange={(event) => setTerm(event.target.value)}>
                <option value="todos">Todos</option>
                <option value="ate-60">Até 60 meses</option>
                <option value="61-120">61 a 120 meses</option>
                <option value="mais-120">Mais de 120 meses</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </label>
            <label className="rbs-select-field">
              <span>Entrada</span>
              <select value={entry} onChange={(event) => setEntry(event.target.value)}>
                <option value="todos">Todas</option>
                <option value="ate-30">Até 30%</option>
                <option value="31-50">31% a 50%</option>
                <option value="mais-50">Mais de 50%</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </label>
            <label className="rbs-select-field rbs-select-field--sort">
              <span>Ordenar</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="valor-desc">Maior crédito</option>
                <option value="valor-asc">Menor crédito</option>
                <option value="entrada-asc">Menor entrada</option>
                <option value="prazo-asc">Menor prazo</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </label>
            <button type="button" className="rbs-reset-button" onClick={resetFilters}>
              <RotateCcw aria-hidden="true" />
              Limpar
            </button>
          </div>

          <div className="rbs-catalog-toolbar">
            <div className="rbs-status-filters">
              <span>Exibir</span>
              {[
                ['disponivel', 'Disponíveis'],
                ['reservada', 'Reservadas'],
              ].map(([value, label]) => (
                <label key={value} className={`rbs-status-chip rbs-status-chip--${value} ${statuses.has(value) ? 'is-on' : ''}`}>
                  <input type="checkbox" checked={statuses.has(value)} onChange={() => toggleStatus(value)} />
                  <span className="rbs-status-check"><Check aria-hidden="true" /></span>
                  {label}
                </label>
              ))}
            </div>
            <div className="rbs-export-actions">
              <button type="button" disabled={!filtered.length} onClick={() => exportExcel(filtered)}>
                <Download aria-hidden="true" /> Excel
              </button>
              <button type="button" disabled={!filtered.length} onClick={() => exportPdf(filtered)}>
                <FileText aria-hidden="true" /> PDF
              </button>
            </div>
          </div>

          {selectedCartas.length > 0 && (
            <aside className="rbs-selection" aria-label="Resumo das cartas selecionadas">
              <div className="rbs-selection-topline">
                <div>
                  <span>{selectedCartas.length === 1 ? '1 carta selecionada' : `${selectedCartas.length} cartas selecionadas`}</span>
                  <strong>Resumo da composição</strong>
                </div>
                <button type="button" onClick={() => setSelected(new Set())}>Limpar seleção</button>
              </div>
              <Metrics totals={totals} />
              {!!phaseRanges.length && (
                <div className="rbs-selection-phases">
                  <span>Composição das parcelas</span>
                  <div>{phaseRanges.map((range) => <small key={`${range.start}-${range.end}`}>{rangeLabel(range)}</small>)}</div>
                </div>
              )}
              <div className="rbs-selection-actions">
                <button type="button" className="rbs-secondary-button" onClick={() => setProposalOpen(true)}>
                  <Eye aria-hidden="true" /> Ver proposta
                </button>
                <a className="rbs-gold-button" href={whatsappUrl(selectedCartas)} target="_blank" rel="noopener noreferrer">
                  Negociar {selectedCartas.length > 1 ? 'composição' : 'carta'}
                </a>
              </div>
            </aside>
          )}

          <div className="rbs-results-line" aria-live="polite">
            <span>{loading ? 'Consultando oportunidades…' : `${filtered.length} ${filtered.length === 1 ? 'carta encontrada' : 'cartas encontradas'}`}</span>
            <small>Disponibilidade atualizada pela InvestMaster</small>
          </div>

          {loading ? (
            <div className="rbs-catalog-state" role="status">
              <LoaderCircle className="rbs-spinner" aria-hidden="true" />
              <strong>Carregando cartas</strong>
              <span>Estamos consultando as oportunidades disponíveis.</span>
            </div>
          ) : error ? (
            <div className="rbs-catalog-state rbs-catalog-state--error" role="alert">
              <strong>Não foi possível carregar as cartas agora.</strong>
              <span>Tente novamente em alguns instantes.</span>
              <button type="button" className="rbs-gold-button" onClick={loadCartas}>Tentar novamente</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rbs-catalog-state">
              <strong>Nenhuma carta encontrada.</strong>
              <span>Ajuste os filtros para visualizar outras opções.</span>
              <button type="button" className="rbs-secondary-button rbs-secondary-button--light" onClick={resetFilters}>Limpar filtros</button>
            </div>
          ) : (
            <div className="rbs-table-wrap">
              <table className="rbs-cards-table">
                <caption className="sr-only">Lista de cartas contempladas com seleção, valores, prazo, detalhes e negociação.</caption>
                <thead>
                  <tr>
                    <th className="rbs-check-column" scope="col"><span className="sr-only">Selecionar</span></th>
                    {[
                      ['administradora', 'Administradora'],
                      ['tipo', 'Produto'],
                      ['status', 'Status'],
                      ['valor', 'Valor do crédito'],
                      ['entrada', 'Entrada'],
                      ['prazo', 'Prazo'],
                      ['valorParcela', 'Parcelas / fases'],
                    ].map(([key, label]) => (
                      <th key={key} scope="col">
                        <button type="button" className="rbs-sort-button" onClick={() => changeSort(key)}>
                          {label}<ArrowDownUp aria-hidden="true" className={sort.startsWith(`${key}-`) ? 'is-active' : ''} />
                        </button>
                      </th>
                    ))}
                    <th scope="col">Detalhes</th>
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((carta) => {
                    const isSelected = selected.has(carta.id);
                    const isReserved = carta.status === 'reservada';
                    return (
                      <tr key={carta.id} className={isSelected ? 'is-selected' : ''}>
                        <td data-label="Selecionar" className="rbs-check-column">
                          <label className={`rbs-row-check ${isReserved ? 'is-disabled' : ''}`}>
                            <input type="checkbox" checked={isSelected} disabled={isReserved} onChange={() => toggleSelected(carta)} aria-label={`Selecionar ${carta.numero}`} />
                            <span><Check aria-hidden="true" /></span>
                          </label>
                        </td>
                        <td data-label="Administradora"><AdminLogo name={carta.administradora} /></td>
                        <td data-label="Produto"><span className={`rbs-pill rbs-pill--${carta.tipo}`}>{TYPE_LABELS[carta.tipo] || carta.tipo}</span></td>
                        <td data-label="Status"><span className={`rbs-pill rbs-pill--${carta.status}`}>{STATUS_LABELS[carta.status] || carta.status}</span></td>
                        <td data-label="Valor do crédito" className="rbs-money-cell"><strong>{money.format(carta.valor)}</strong></td>
                        <td data-label="Entrada" className="rbs-money-cell"><strong>{money.format(carta.entrada)}</strong><small>{carta.entradaPercent.toFixed(2)}%</small></td>
                        <td data-label="Prazo"><strong>{carta.prazo}</strong><small> meses</small></td>
                        <td data-label="Parcelas / fases" className="rbs-phases-cell">{phasesLabel(carta)}</td>
                        <td data-label="Detalhes">
                          <button type="button" className="rbs-eye-button" onClick={() => setDetail(carta)} aria-label={`Ver detalhes de ${carta.numero}`}><Eye aria-hidden="true" /></button>
                        </td>
                        <td data-label="Ação">
                          {isReserved ? (
                            <span className="rbs-reserved-action">Reservada</span>
                          ) : (
                            <a className="rbs-row-action" href={whatsappUrl([carta])} target="_blank" rel="noopener noreferrer">Negociar</a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="rbs-catalog-cta">
        <div className="rbs-catalog-container">
          <span className="rbs-catalog-kicker">Atendimento consultivo</span>
          <h2>Encontrou a oportunidade ideal?</h2>
          <p>Nossa equipe acompanha a análise e a negociação da sua carta contemplada.</p>
          <a className="rbs-gold-button" href={`https://wa.me/${WHATSAPP_ID}`} target="_blank" rel="noopener noreferrer">Falar com um especialista</a>
        </div>
      </section>

      {detail && (
        <Modal label="Detalhes da carta" onClose={() => setDetail(null)}>
          <span className="rbs-modal-kicker">Carta contemplada</span>
          <div className="rbs-modal-heading">
            <div>
              <span className={`rbs-pill rbs-pill--${detail.tipo}`}>{TYPE_LABELS[detail.tipo] || detail.tipo}</span>
              <h2>{detail.numero}</h2>
            </div>
            <span className={`rbs-pill rbs-pill--${detail.status}`}>{STATUS_LABELS[detail.status]}</span>
          </div>
          <div className="rbs-modal-credit">
            <span>Crédito disponível</span>
            <strong>{money.format(detail.valor)}</strong>
            <small>{phasesLabel(detail)} / mês</small>
          </div>
          <div className="rbs-modal-data">
            {[
              ['Administradora', detail.administradora],
              ['Entrada', money.format(detail.entrada)],
              ['% de entrada', `${detail.entradaPercent.toFixed(2)}%`],
              ['Saldo devedor', money.format(detail.saldoDevedor)],
              ...(detail.taxa ? [['Taxa de transferência', money.format(detail.taxa)]] : []),
              ['Prazo', `${detail.prazo} meses`],
            ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          {detail.status === 'disponivel' && (
            <a className="rbs-gold-button rbs-modal-action" href={whatsappUrl([detail])} target="_blank" rel="noopener noreferrer">Negociar esta carta</a>
          )}
        </Modal>
      )}

      {proposalOpen && selectedCartas.length > 0 && (
        <Modal label="Resumo da proposta" onClose={() => setProposalOpen(false)} wide>
          <span className="rbs-modal-kicker">Composição de cotas</span>
          <div className="rbs-proposal-title">
            <div><h2>Resumo da proposta</h2><span>{selectedCartas.length} {selectedCartas.length === 1 ? 'cota selecionada' : 'cotas selecionadas'}</span></div>
            <strong>{money.format(totals.credit / 100)}</strong>
          </div>
          <Metrics totals={totals} />
          <div className="rbs-proposal-columns">
            <div>
              <h3>Composição das parcelas</h3>
              <ul>{phaseRanges.map((range) => <li key={`${range.start}-${range.end}`}>{rangeLabel(range)}</li>)}</ul>
            </div>
            <div>
              <h3>Detalhes por carta</h3>
              <ul>{selectedCartas.map((carta) => <li key={carta.id}><strong>{carta.numero}</strong><span>{TYPE_LABELS[carta.tipo]} · {money.format(carta.valor)} · {phasesLabel(carta)}</span></li>)}</ul>
            </div>
          </div>
          <a className="rbs-gold-button rbs-modal-action" href={whatsappUrl(selectedCartas)} target="_blank" rel="noopener noreferrer">Negociar {selectedCartas.length > 1 ? 'composição' : 'carta'}</a>
        </Modal>
      )}
    </div>
  );
}
