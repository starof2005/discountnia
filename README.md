# New India Assurance (NIA) - Revised OD Discount Advisor Portal

A responsive, modern web application for insurance advisors and agents to instantly look up, calculate, and share the official **Revised OD (Own Damage) Discounts** for **The New India Assurance Co. Ltd. (NIA)**.

---

## 🎨 Visual & UI Highlights
- **Corporate Color Palette:** Clean, bright, light-colored theme with soft off-white/slate backgrounds (`#f8fafc`), crisp white cards (`#ffffff`), subtle borders, gentle elevations, and professional corporate blues and teals (`#0284c7`, `#0f766e`, `#0369a1`).
- **Mobile-First Responsive Layout:** Designed for insurance advisors in the field on mobile phones or on desktop workstations.
- **Two Primary Views:**
  1. **Quick Calculator / Finder:** Step-by-step interactive segmented buttons and dropdown tiles to instantly calculate the approved discount percentage.
  2. **Rate Chart Matrix:** An organized reference table with search, category filtering, and one-click loading into the calculator.

---

## 📊 Underwriting Data Matrix

### 1. Private Car (other than Brand New)
| Vehicle Age Bracket | With Add-on Cover | Without Add-on Cover | Underwriting Notes |
| :--- | :---: | :---: | :--- |
| **Up to 7 years** | **90%** | **85%** | Maximum approved discount tier |
| **> 7 to 10 years** | **87%** | **82%** | Optimal discount for 7-10 yr bracket |
| **> 10 to 15 years** | **80%** | **80%** | Parity: Equal rate with or without add-on |
| **> 15 years** | **78%** | **78%** | Vintage / Senior vehicles |

### 2. Standalone OD (SAOD) - Private Car (Renewal / Rollover)
| NCB Status | Revised OD Discount | Criteria |
| :--- | :---: | :--- |
| **With NCB** | **82%** | Claim-free expiring policy (20% to 50% NCB bonus) |
| **Without NCB** | **78%** | 0% NCB / claim registered in preceding year |

### 3. Commercial Vehicles - GCV (> 7,500 GVW up to 40,000 GVW - Other than Brand New)
| Vehicle Age Bracket | With Add-on Cover | Without Add-on Cover | Underwriting Notes |
| :--- | :---: | :---: | :--- |
| **Up to 7 years** | **85%** | **82%** | Standard commercial package |
| **> 7 to 10 years** | **80%** | **78%** | Medium/Heavy commercial fleet |
| **> 10 to 15 years** | **75%** | **75%** | Flat parity rate |
| **> 15 years** | **70%** | **70%** | Senior commercial fleet |

### 4. Commercial Vehicles - GCV (> 40,000 GVW - Other than Brand New)
| Vehicle Age Bracket | NIA Renewal | Other Company Renewal | Loyalty Differential |
| :--- | :---: | :---: | :--- |
| **Up to 7 years** | **75%** | **65%** | +10% loyalty incentive for NIA customers |
| **> 7 to 10 years** | **70%** | **65%** | +5% loyalty incentive for NIA customers |
| **> 10 to 15 years** | **65%** | **60%** | +5% loyalty incentive for NIA customers |
| **> 15 years** | **60%** | **55%** | +5% loyalty incentive for NIA customers |

### 5. Two Wheeler (Brand New)
- **Fixed Revised OD Discount: 75%** (Flat approved rate on showroom delivery across all motorcycle and scooter models).

---

## 🚀 Key Features

- **Dynamic Category Selector:** Top pill buttons for Private Car, SAOD, Two Wheeler, GCV (7.5T - 40T), and GCV (> 40T).
- **Context-Aware Dynamic Inputs:** Selecting a category shows only the criteria relevant to that vehicle class (e.g., age bracket, add-on toggle, NCB status, or renewal source).
- **Prominent Result Badge:** Highlights the exact revised discount figure (e.g., `85% Revised OD Discount`) with a visual percentage meter bar and underwriting breakdown.
- **Instant Clipboard Copy:** One-click copy with toast notification for clipboard sharing.
- **WhatsApp Share Integration:** Pre-formats quote summary with emojis, category, age, cover, and discount rate for direct sharing with clients via `wa.me`.
- **Printable Quote Slip:** Clean quotation modal ready for printing or saving as PDF for policyholders.
- **Interactive Premium Estimator:** Bonus tool for advisors to enter Basic OD Tariff premium and NCB to compute discounted OD, GST @ 18%, and net payable amount.
- **Zero-Dependency & Offline Ready:** Pure vanilla HTML5, CSS3, and modern JavaScript. All icons are embedded SVGs. Requires no build step or internet connection.

---

## 💻 How to Run

Simply open `index.html` in any web browser (Chrome, Edge, Safari, Firefox) on desktop or mobile:
- **Direct File:** Double-click `index.html` or drag it into your browser.
- **Local Server (Optional):**
  ```bash
  python -m http.server 8000
  # Then open http://localhost:8000 in your browser
  ```

---

## 📁 File Structure
```
Discount/
├── index.html       # Semantic HTML5 single-page application structure
├── css/
│   └── styles.css   # Modern corporate styles, CSS variables, responsive rules
├── js/
│   ├── data.js      # Structured underwriting discount matrix dataset & helper methods
│   └── app.js       # Dynamic UI state, reactive calculation, WhatsApp & clipboard handlers
└── README.md        # Documentation and reference guide
```

