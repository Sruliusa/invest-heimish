// ── CONFIGURATION ────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "15551234567";
const CONTACT_EMAIL   = "office@investheimish.com";

// ── DEAL DATA ────────────────────────────────────────────────────────────────
const deals = [
  {
    id: 1,
    name: "ברוקלין דיעל — פלאטבוש",
    location: "ברוקלין, ניו יארק",
    propertyType: "צוויי-פאמיליע הויז",
    bedrooms: 4,
    bathrooms: 2,
    purchasePrice: 320000,
    renovationCost: 38000,
    cashNeeded: 90000,
    minimumInvestment: 50000,
    postRenovationValue: 475000,
    monthlyIncome: 3400,
    expectedProfit: 82000,
    riskLevel: "נידעריג",
    riskKey: "low",
    renovationTimeline: "4–6 חדשים",
    costBreakdown: "קויפ: $320,000 | רענאוו': $38,000 | קלאָוזינג: $7,500 | רעזערוו: $10,000",
    whatsIncluded: "פולע באגלייטונג ביים קויפן, רענאוואציע-פלאן מיט אונזער קאנטראקטאר, פארוואלטונג אין ערשטן יאר",
    description: "א שיינע צוויי-פאמיליע הויז אין א רואיגע געגנט פון פלאטבוש. נאנט צו שולן, שטיבלעך, און אלע באדערפענישן. די רענאוואציע איז פלאנירט מיט אונזער באוואוסטע קאנטראקטאר.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    name: "קוועענס דיעל — בארוואוד",
    location: "קוועענס, ניו יארק",
    propertyType: "אייין-פאמיליע הויז",
    bedrooms: 3,
    bathrooms: 1,
    purchasePrice: 285000,
    renovationCost: 52000,
    cashNeeded: 110000,
    minimumInvestment: 60000,
    postRenovationValue: 430000,
    monthlyIncome: 2800,
    expectedProfit: 68000,
    riskLevel: "מיטל",
    riskKey: "medium",
    renovationTimeline: "5–7 חדשים",
    costBreakdown: "קויפ: $285,000 | רענאוו': $52,000 | קלאָוזינג: $6,800 | רעזערוו: $12,000",
    whatsIncluded: "פולע באגלייטונג ביים קויפן, רענאוואציע-פלאן, הילף מיט פארדינגען, קאנטראקטן-הילף",
    description: "אן אייין-פאמיליע הויז אין בארוואוד מיט גרויסע פאטענציאל. די געגנט וואקסט שנעל און עס איז א גוטע געלעגנהייט פאר אינוועסטארס.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    name: "לאַקוואַד דיעל — צענטער",
    location: "לאַקוואַד, ניו דזשערזי",
    propertyType: "דריי-פאמיליע הויז",
    bedrooms: 6,
    bathrooms: 3,
    purchasePrice: 410000,
    renovationCost: 60000,
    cashNeeded: 140000,
    minimumInvestment: 80000,
    postRenovationValue: 620000,
    monthlyIncome: 5200,
    expectedProfit: 130000,
    riskLevel: "נידעריג",
    riskKey: "low",
    renovationTimeline: "6–9 חדשים",
    costBreakdown: "קויפ: $410,000 | רענאוו': $60,000 | קלאָוזינג: $9,000 | רעזערוו: $15,000",
    whatsIncluded: "פולע באגלייטונג ביים קויפן, 3 דירות-רענאוואציע, פארוואלטונג, הילף מיט טענאנטס",
    description: "א דריי-פאמיליע הויז אין צענטער פון לאקוואד. דריי באזונדערע דירות מיט באזונדערע אריינגאנגען. שטארקע מאנאטליכע איינקונפט.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    name: "מאנסי דיעל — סאוט",
    location: "מאנסי, ניו יארק",
    propertyType: "צוויי-פאמיליע הויז",
    bedrooms: 5,
    bathrooms: 2,
    purchasePrice: 265000,
    renovationCost: 45000,
    cashNeeded: 85000,
    minimumInvestment: 45000,
    postRenovationValue: 395000,
    monthlyIncome: 3100,
    expectedProfit: 62000,
    riskLevel: "נידעריג",
    riskKey: "low",
    renovationTimeline: "3–5 חדשים",
    costBreakdown: "קויפ: $265,000 | רענאוו': $45,000 | קלאָוזינג: $6,200 | רעזערוו: $8,000",
    whatsIncluded: "פולע באגלייטונג ביים קויפן, רענאוואציע-פלאן, הילף מיט פארדינגען",
    description: "א צוויי-פאמיליע הויז אין סאוט מאנסי. שוין טיילווייז רענאווירט. א גרינגע דיעל מיט נידעריגע ריזיקא.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
  }
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(n) {
  return "$" + n.toLocaleString("en-US");
}

function whatsappLink(dealName) {
  var msg = encodeURIComponent("שלום, איך בין אינטערעסירט אין דעם דיעל: " + dealName);
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;
}

function getDealById(id) {
  return deals.find(function(d) { return d.id === parseInt(id); });
}
