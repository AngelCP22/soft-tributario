const companies = [
  { ruc: '20600000001', name: 'Comercial San Miguel SAC', regimen: 'MYPE Tributario', dueDate: '17/06/2026', status: 'Pendiente', isRetentionAgent: true },
  { ruc: '20555555555', name: 'Servicios Integrales Lima EIRL', regimen: 'RER', dueDate: '18/06/2026', status: 'Observado', isRetentionAgent: false },
  { ruc: '20444444444', name: 'Importaciones Andinas SAC', regimen: 'Régimen General', dueDate: '19/06/2026', status: 'Listo', isRetentionAgent: false }
];

const sales = [
  { date: '02/05/2026', document: 'F001-000123', customer: 'Cliente A', base: 4200, igv: 756, total: 4956 },
  { date: '08/05/2026', document: 'F001-000124', customer: 'Cliente B', base: 2800, igv: 504, total: 3304 },
  { date: '15/05/2026', document: 'B001-000771', customer: 'Consumidor final', base: 650, igv: 117, total: 767 }
];

const purchases = [
  { date: '03/05/2026', provider: 'Proveedor A SAC', providerCondition: 'HABIDO', category: 'general', base: 1500, igv: 270, total: 1770 },
  { date: '06/05/2026', provider: 'Transporte Norte SAC', providerCondition: 'HABIDO', category: 'transporte', base: 1200, igv: 216, total: 1416 },
  { date: '11/05/2026', provider: 'Proveedor Observado EIRL', providerCondition: 'OBSERVADO', category: 'general', base: 900, igv: 162, total: 1062 }
];

const taxRules = [
  { id: 'REG-COMP-001', name: 'Proveedor observado', type: 'PROVIDER_NOT_HABIDO', module: 'Compras', risk: 'Alto', active: true, message: 'Proveedor observado. Revisar antes de usar crédito fiscal.' },
  { id: 'REG-COMP-002', name: 'Posible detracción transporte', type: 'POSSIBLE_DETRACTION', module: 'Compras', risk: 'Medio', active: true, category: 'transporte', minAmount: 700, message: 'Operación de transporte podría estar sujeta a detracción. Solicitar constancia.' },
  { id: 'REG-COMP-003', name: 'Posible retención por agente', type: 'POSSIBLE_RETENTION', module: 'Compras', risk: 'Medio', active: true, minAmount: 700, message: 'La empresa es agente de retención. Validar si corresponde retención.' }
];

const currentCompany = companies[0];
const reviewedPurchases = purchases.map((purchase) => applyTaxRules(purchase, currentCompany, taxRules));
const summary = calculatePeriodSummary(sales, reviewedPurchases);

function renderCompanies() {
  const table = document.querySelector('#companiesTable');
  table.innerHTML = companies.map((company) => {
    const badgeClass = company.status === 'Listo' ? 'ok' : company.status === 'Observado' ? 'danger' : 'warn';
    return '<tr><td>' + company.ruc + '</td><td>' + company.name + '</td><td>' + company.regimen + '</td><td>' + company.dueDate + '</td><td><span class="badge ' + badgeClass + '">' + company.status + '</span></td></tr>';
  }).join('');
}

function renderSales() {
  const table = document.querySelector('#salesTable');
  table.innerHTML = sales.map((sale) => '<tr><td>' + sale.date + '</td><td>' + sale.document + '</td><td>' + sale.customer + '</td><td>' + formatCurrency(sale.base) + '</td><td>' + formatCurrency(sale.igv) + '</td><td>' + formatCurrency(sale.total) + '</td></tr>').join('');
}

function renderPurchases() {
  const table = document.querySelector('#purchasesTable');
  table.innerHTML = reviewedPurchases.map((purchase) => {
    const badgeClass = purchase.reviewStatus === 'OK' ? 'ok' : 'danger';
    return '<tr><td>' + purchase.date + '</td><td>' + purchase.provider + '</td><td>' + formatCurrency(purchase.total) + '</td><td>' + (purchase.allowsTaxCredit ? 'Sí' : 'No') + '</td><td><span class="badge ' + badgeClass + '">' + purchase.reviewStatus + '</span></td></tr>';
  }).join('');
}

function renderRules() {
  const list = document.querySelector('#rulesList');
  list.innerHTML = taxRules.map((rule) => '<div class="rule-card"><strong>' + rule.name + '</strong><span>' + rule.module + ' · Riesgo ' + rule.risk + '</span><span>' + rule.message + '</span></div>').join('');
}

function renderSummary() {
  document.querySelector('#companyCount').textContent = companies.length;
  document.querySelector('#issueCount').textContent = summary.issues;
  document.querySelector('#taxResult').textContent = formatCurrency(summary.result);
  document.querySelector('#periodStatus').textContent = summary.issues > 0 ? 'Observado' : 'Listo';
  document.querySelector('#summarySales').textContent = formatCurrency(summary.salesBase);
  document.querySelector('#summarySalesTax').textContent = formatCurrency(summary.salesTax);
  document.querySelector('#summaryPurchases').textContent = formatCurrency(summary.purchaseBase);
  document.querySelector('#summaryPurchaseTax').textContent = formatCurrency(summary.purchaseTax);
  document.querySelector('#summaryResult').textContent = formatCurrency(summary.result);
}

function bootApp() {
  renderCompanies();
  renderSales();
  renderPurchases();
  renderRules();
  renderSummary();
  document.querySelector('#syncButton').addEventListener('click', () => {
    window.alert('Demo fase 1: luego este botón importará datos desde CSV, Excel o SIRE.');
  });
}

bootApp();
