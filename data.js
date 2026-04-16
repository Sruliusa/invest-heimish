// ── CONFIGURATION ────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "15551234567";
const CONTACT_EMAIL   = "office@investheimish.com";

// ── DEAL DATA ────────────────────────────────────────────────────────────────
const deals = [
  {
    id: 1,
    name: "Brooklyn Deal — Flatbush",
    location: "Brooklyn, NY",
    propertyType: "Two-Family House",
    bedrooms: 4,
    bathrooms: 2,
    purchasePrice: 320000,
    renovationCost: 38000,
    cashNeeded: 90000,
    minimumInvestment: 50000,
    postRenovationValue: 475000,
    monthlyIncome: 3400,
    expectedProfit: 82000,
    riskLevel: "Low",
    riskKey: "low",
    renovationTimeline: "4–6 months",
    costBreakdown: "Purchase: $320,000 | Renov: $38,000 | Closing: $7,500 | Reserve: $10,000",
    whatsIncluded: "Full guidance during purchase, renovation plan with our contractor, property management for the first year",
    description: "A beautiful two-family house in a quiet Flatbush neighborhood. Close to schools, shuls, and all amenities. The renovation is planned with our trusted contractor.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Queens Deal — Barwood",
    location: "Queens, NY",
    propertyType: "Single-Family House",
    bedrooms: 3,
    bathrooms: 1,
    purchasePrice: 285000,
    renovationCost: 52000,
    cashNeeded: 110000,
    minimumInvestment: 60000,
    postRenovationValue: 430000,
    monthlyIncome: 2800,
    expectedProfit: 68000,
    riskLevel: "Medium",
    riskKey: "medium",
    renovationTimeline: "5–7 months",
    costBreakdown: "Purchase: $285,000 | Renov: $52,000 | Closing: $6,800 | Reserve: $12,000",
    whatsIncluded: "Full guidance during purchase, renovation plan, help with leasing, contract support",
    description: "A single-family house in Barwood with great potential. The neighborhood is growing quickly and it's a solid opportunity for investors.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Lakewood Deal — Center",
    location: "Lakewood, NJ",
    propertyType: "Three-Family House",
    bedrooms: 6,
    bathrooms: 3,
    purchasePrice: 410000,
    renovationCost: 60000,
    cashNeeded: 140000,
    minimumInvestment: 80000,
    postRenovationValue: 620000,
    monthlyIncome: 5200,
    expectedProfit: 130000,
    riskLevel: "Low",
    riskKey: "low",
    renovationTimeline: "6–9 months",
    costBreakdown: "Purchase: $410,000 | Renov: $60,000 | Closing: $9,000 | Reserve: $15,000",
    whatsIncluded: "Full guidance during purchase, 3-unit renovation, property management, tenant support",
    description: "A three-family house in central Lakewood. Three separate units with separate entrances. Strong monthly income.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Monsey Deal — South",
    location: "Monsey, NY",
    propertyType: "Two-Family House",
    bedrooms: 5,
    bathrooms: 2,
    purchasePrice: 265000,
    renovationCost: 45000,
    cashNeeded: 85000,
    minimumInvestment: 45000,
    postRenovationValue: 395000,
    monthlyIncome: 3100,
    expectedProfit: 62000,
    riskLevel: "Low",
    riskKey: "low",
    renovationTimeline: "3–5 months",
    costBreakdown: "Purchase: $265,000 | Renov: $45,000 | Closing: $6,200 | Reserve: $8,000",
    whatsIncluded: "Full guidance during purchase, renovation plan, help with leasing",
    description: "A two-family house in South Monsey. Already partially renovated. An easy deal with low risk.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
  }
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(n) {
  return "$" + n.toLocaleString("en-US");
}

function whatsappLink(dealName) {
  var msg = encodeURIComponent("Hi, I'm interested in this deal: " + dealName);
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;
}

function getDealById(id) {
  return deals.find(function(d) { return d.id === parseInt(id); });
}
