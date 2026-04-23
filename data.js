// ── CONFIGURATION ────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "15551234567";
const CONTACT_EMAIL   = "office@investheimish.com";

// ── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(n) {
  return n != null ? "$" + Number(n).toLocaleString("en-US") : "—";
}

function whatsappLink(dealName) {
  var msg = encodeURIComponent("Hi, I'm interested in this deal: " + dealName);
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;
}

function mapDeal(row) {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    propertyType: row.property_type,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    purchasePrice: row.purchase_price,
    renovationCost: row.renovation_cost,
    cashNeeded: row.cash_needed,
    minimumInvestment: row.minimum_investment,
    postRenovationValue: row.post_renovation_value,
    monthlyIncome: row.monthly_income,
    expectedProfit: row.expected_profit,
    riskLevel: row.risk_level,
    riskKey: row.risk_key,
    renovationTimeline: row.renovation_timeline,
    costBreakdown: row.cost_breakdown,
    whatsIncluded: row.whats_included,
    description: row.description,
    image: row.image,
    images: row.images ? row.images.split('\n').map(function(u) { return u.trim(); }).filter(Boolean) : [],
    saleStatus: row.sale_status,
    strategy: row.strategy,
    monthlyExpenses: row.monthly_expenses,
    currentRent: row.current_rent,
    resalePrice: row.resale_price,
  };
}

function strategyLabel(key) {
  if (key === 'tenants') return 'Purchase with Tenants';
  if (key === 'light')   return 'Light Construction';
  if (key === 'heavy')   return 'Full Renovation';
  return null;
}

async function loadDeals() {
  var result = await supabase.from('deals').select('*').order('id');
  return result.error ? [] : result.data.map(mapDeal);
}

async function getDealById(id) {
  var result = await supabase.from('deals').select('*').eq('id', id).single();
  return result.data ? mapDeal(result.data) : null;
}
