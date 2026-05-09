function applyTaxRules(purchase, company, rules) {
  const observations = [];
  let allowsTaxCredit = true;

  rules.forEach((rule) => {
    if (!rule.active) return;

    if (rule.type === 'PROVIDER_NOT_HABIDO' && purchase.providerCondition !== 'HABIDO') {
      allowsTaxCredit = false;
      observations.push(rule.message);
    }

    if (rule.type === 'POSSIBLE_DETRACTION' && purchase.total >= rule.minAmount && purchase.category === rule.category) {
      observations.push(rule.message);
    }

    if (rule.type === 'POSSIBLE_RETENTION' && company.isRetentionAgent && purchase.total >= rule.minAmount) {
      observations.push(rule.message);
    }
  });

  return {
    ...purchase,
    allowsTaxCredit,
    observations,
    reviewStatus: observations.length > 0 ? 'OBSERVADO' : 'OK'
  };
}

function calculatePeriodSummary(sales, purchases) {
  const salesBase = sales.reduce((sum, item) => sum + item.base, 0);
  const salesTax = sales.reduce((sum, item) => sum + item.igv, 0);

  const acceptedPurchases = purchases.filter((item) => item.allowsTaxCredit);
  const purchaseBase = acceptedPurchases.reduce((sum, item) => sum + item.base, 0);
  const purchaseTax = acceptedPurchases.reduce((sum, item) => sum + item.igv, 0);

  return {
    salesBase,
    salesTax,
    purchaseBase,
    purchaseTax,
    result: salesTax - purchaseTax,
    issues: purchases.filter((item) => item.reviewStatus === 'OBSERVADO').length
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value);
}
