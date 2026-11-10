/**
 * New India Assurance (NIA) - Revised OD Discount Application Logic
 */

(function () {
  'use strict';

  // Application State
  const state = {
    category: 'private_car',
    age: 'up_to_7',
    addon: 'with_addon',
    ncb: 'with_ncb',
    renewal: 'nia_renewal',
    activeView: 'calculator', // 'calculator' | 'matrix'
    matrixFilter: 'all',
    searchQuery: '',
    basicOdPremium: 10000,
    advisorNcbPercent: 20
  };

  // DOM Elements Cache
  const el = {
    // Nav tabs
    tabCalculator: document.getElementById('tab-calculator'),
    tabMatrix: document.getElementById('tab-matrix'),
    viewCalculator: document.getElementById('view-calculator'),
    viewMatrix: document.getElementById('view-matrix'),

    // Category pills container
    categoryPillsContainer: document.getElementById('category-pills'),
    categoryDescription: document.getElementById('category-description'),
    dynamicInputsArea: document.getElementById('dynamic-inputs-area'),

    // Result elements
    resultPercentage: document.getElementById('result-percentage'),
    resultSublabel: document.getElementById('result-sublabel'),
    meterFill: document.getElementById('meter-fill'),
    paramCategory: document.getElementById('param-category'),
    paramAge: document.getElementById('param-age'),
    paramCondition: document.getElementById('param-condition'),
    paramDiscount: document.getElementById('param-discount'),
    underwritingNoteText: document.getElementById('underwriting-note-text'),

    // Buttons
    btnCopyQuote: document.getElementById('btn-copy-quote'),
    btnShareWhatsapp: document.getElementById('btn-share-whatsapp'),
    btnPrintSlip: document.getElementById('btn-print-slip'),
    btnResetInputs: document.getElementById('btn-reset-inputs'),

    // Premium Calculator elements
    premiumCalcContainer: document.getElementById('premium-calc-container'),
    calcAccordionTrigger: document.getElementById('calc-accordion-trigger'),
    inputBasicOd: document.getElementById('input-basic-od'),
    selectNcbPercent: document.getElementById('select-ncb-percent'),
    outBasicOd: document.getElementById('out-basic-od'),
    outDiscountPercent: document.getElementById('out-discount-percent'),
    outDiscountAmount: document.getElementById('out-discount-amount'),
    outOdAfterDiscount: document.getElementById('out-od-after-discount'),
    outNcbAmount: document.getElementById('out-ncb-amount'),
    outGstAmount: document.getElementById('out-gst-amount'),
    outFinalOdPayable: document.getElementById('out-final-od-payable'),

    // Matrix elements
    matrixFilterButtons: document.querySelectorAll('.matrix-filter-btn'),
    matrixSearchInput: document.getElementById('matrix-search-input'),
    matrixTableBody: document.getElementById('matrix-table-body'),
    matrixRowCount: document.getElementById('matrix-row-count'),

    // Toast & Modal
    toastContainer: document.getElementById('toast-container'),
    quoteModal: document.getElementById('quote-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalPrintBtn: document.getElementById('modal-print-btn'),
    modalCategory: document.getElementById('modal-category'),
    modalAge: document.getElementById('modal-age'),
    modalCondition: document.getElementById('modal-condition'),
    modalDiscountVal: document.getElementById('modal-discount-val'),
    modalDate: document.getElementById('modal-date')
  };

  // SVGs for dynamic icons
  const ICONS = {
    car: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pill-icon"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
    'shield-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pill-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    bike: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pill-icon"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pill-icon"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
    container: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pill-icon"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 18v4"/><path d="m4.9 18-.9 4"/><path d="m19.1 18 .9 4"/><circle cx="7" cy="12" r="1.5"/><circle cx="17" cy="12" r="1.5"/><path d="M10 6v12"/><path d="M14 6v12"/></svg>`
  };

  /**
   * Initialize Application
   */
  function init() {
    renderCategoryPills();
    renderDynamicInputs();
    updateCalculation();
    renderMatrixTable();
    setupEventListeners();
  }

  /**
   * Render Top Category Selector Pills
   */
  function renderCategoryPills() {
    el.categoryPillsContainer.innerHTML = '';
    DISCOUNT_DATA.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill-btn ${cat.id === state.category ? 'active' : ''}`;
      btn.dataset.id = cat.id;
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', cat.id === state.category);

      btn.innerHTML = `
        ${ICONS[cat.icon] || ICONS.car}
        <span class="pill-title">${cat.name}</span>
        <span class="pill-desc">${cat.subtitle.split('(')[0].trim()}</span>
      `;

      btn.addEventListener('click', () => {
        if (state.category !== cat.id) {
          state.category = cat.id;
          handleCategoryChange();
        }
      });

      el.categoryPillsContainer.appendChild(btn);
    });
  }

  /**
   * Handle Category Selection Change
   */
  function handleCategoryChange() {
    // Update active pill classes
    const pills = el.categoryPillsContainer.querySelectorAll('.category-pill-btn');
    pills.forEach(pill => {
      const isSelected = pill.dataset.id === state.category;
      pill.classList.toggle('active', isSelected);
      pill.setAttribute('aria-checked', isSelected);
    });

    renderDynamicInputs();
    updateCalculation();
    highlightMatrixRow();
  }

  /**
   * Render dynamic input controls based on current category requirements
   */
  function renderDynamicInputs() {
    const cat = DISCOUNT_DATA.categories.find(c => c.id === state.category);
    if (!cat) return;

    // Update alert description
    el.categoryDescription.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
      </svg>
      <div>
        <strong>${cat.name} (${cat.subtitle})</strong>: ${cat.description}
      </div>
    `;

    el.dynamicInputsArea.innerHTML = '';

    // If Brand New Two Wheeler: Fixed discount notice
    if (cat.inputTypes.includes('fixed')) {
      const banner = document.createElement('div');
      banner.className = 'fixed-discount-banner';
      banner.innerHTML = `
        <span class="fixed-banner-badge">Standard Fixed Schedule</span>
        <div class="fixed-banner-text">
          Brand New Two Wheelers receive a flat, pre-approved Revised OD Discount of <strong>75%</strong> on tariff OD premium. No age or cover variance applies.
        </div>
      `;
      el.dynamicInputsArea.appendChild(banner);
      return;
    }

    // 1. Vehicle Age Input (for Private Car, GCV 7.5T-40T, GCV >40T)
    if (cat.inputTypes.includes('age') && cat.ageBrackets) {
      const ageSection = document.createElement('div');
      ageSection.className = 'input-group-section';

      let optionsHtml = '';
      cat.ageBrackets.forEach(b => {
        const isSelected = state.age === b.id;
        optionsHtml += `
          <div class="option-tile ${isSelected ? 'selected' : ''}" data-age="${b.id}" tabindex="0" role="radio" aria-checked="${isSelected}">
            <div class="custom-radio-mark"></div>
            <div class="tile-content">
              <span class="tile-title">${b.label}</span>
              <span class="tile-sub">${b.description}</span>
            </div>
          </div>
        `;
      });

      ageSection.innerHTML = `
        <div class="section-label">
          <span>Step 2: Select Vehicle Age</span>
          <span style="font-size:0.75rem; color:var(--text-subtle);">From registration date</span>
        </div>
        <div class="option-tiles-grid" id="age-tiles-grid">
          ${optionsHtml}
        </div>
      `;

      el.dynamicInputsArea.appendChild(ageSection);

      // Event listener for age tiles
      const tiles = ageSection.querySelectorAll('.option-tile');
      tiles.forEach(tile => {
        const selectTile = () => {
          tiles.forEach(t => {
            t.classList.remove('selected');
            t.setAttribute('aria-checked', 'false');
          });
          tile.classList.add('selected');
          tile.setAttribute('aria-checked', 'true');
          state.age = tile.dataset.age;
          updateCalculation();
          highlightMatrixRow();
        };

        tile.addEventListener('click', selectTile);
        tile.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectTile();
          }
        });
      });
    }

    // 2. Add-on Cover Toggle (for Private Car & GCV 7.5T-40T)
    if (cat.inputTypes.includes('addon') && cat.addonOptions) {
      const addonSection = document.createElement('div');
      addonSection.className = 'input-group-section';

      addonSection.innerHTML = `
        <div class="section-label">
          <span>Step 3: Add-on Cover Scope</span>
          <span style="font-size:0.75rem; color:var(--text-subtle);">Nil Dep, Engine, RTI, etc.</span>
        </div>
        <div class="segmented-control" id="addon-segmented-control">
          ${cat.addonOptions.map(opt => `
            <button type="button" class="segmented-option ${state.addon === opt.id ? 'selected' : ''}" data-addon="${opt.id}">
              <span class="seg-title">${opt.label}</span>
              <span class="seg-note">${opt.note}</span>
            </button>
          `).join('')}
        </div>
      `;

      el.dynamicInputsArea.appendChild(addonSection);

      const addonButtons = addonSection.querySelectorAll('.segmented-option');
      addonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          addonButtons.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.addon = btn.dataset.addon;
          updateCalculation();
          highlightMatrixRow();
        });
      });
    }

    // 3. NCB Status Selector (for Standalone OD Private Car)
    if (cat.inputTypes.includes('ncb') && cat.ncbOptions) {
      const ncbSection = document.createElement('div');
      ncbSection.className = 'input-group-section';

      ncbSection.innerHTML = `
        <div class="section-label">
          <span>Step 2: No Claim Bonus (NCB) Status</span>
          <span style="font-size:0.75rem; color:var(--text-subtle);">Expiring Policy Record</span>
        </div>
        <div class="segmented-control" id="ncb-segmented-control">
          ${cat.ncbOptions.map(opt => `
            <button type="button" class="segmented-option ${state.ncb === opt.id ? 'selected' : ''}" data-ncb="${opt.id}">
              <span class="seg-title">${opt.label}</span>
              <span class="seg-note">${opt.note}</span>
            </button>
          `).join('')}
        </div>
      `;

      el.dynamicInputsArea.appendChild(ncbSection);

      const ncbButtons = ncbSection.querySelectorAll('.segmented-option');
      ncbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          ncbButtons.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.ncb = btn.dataset.ncb;
          updateCalculation();
          highlightMatrixRow();
        });
      });
    }

    // 4. Renewal Type (for GCV > 40,000 GVW)
    if (cat.inputTypes.includes('renewal_type') && cat.renewalOptions) {
      const renewalSection = document.createElement('div');
      renewalSection.className = 'input-group-section';

      renewalSection.innerHTML = `
        <div class="section-label">
          <span>Step 3: Renewal Category</span>
          <span style="font-size:0.75rem; color:var(--text-subtle);">NIA vs Rollover</span>
        </div>
        <div class="segmented-control" id="renewal-segmented-control">
          ${cat.renewalOptions.map(opt => `
            <button type="button" class="segmented-option ${state.renewal === opt.id ? 'selected' : ''}" data-renewal="${opt.id}">
              <span class="seg-title">${opt.label}</span>
              <span class="seg-note">${opt.note}</span>
            </button>
          `).join('')}
        </div>
      `;

      el.dynamicInputsArea.appendChild(renewalSection);

      const renewalButtons = renewalSection.querySelectorAll('.segmented-option');
      renewalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          renewalButtons.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.renewal = btn.dataset.renewal;
          updateCalculation();
          highlightMatrixRow();
        });
      });
    }
  }

  /**
   * Calculate current revised OD discount percentage
   */
  function getCurrentDiscount() {
    const cat = DISCOUNT_DATA.categories.find(c => c.id === state.category);
    if (!cat) return 0;

    if (cat.id === 'two_wheeler_new') {
      return cat.rates;
    }

    if (cat.id === 'saod_private_car') {
      return cat.rates[state.ncb] || 78;
    }

    if (cat.id === 'private_car' || cat.id === 'gcv_7_5_to_40') {
      const ageRates = cat.rates[state.age];
      if (ageRates) {
        return ageRates[state.addon] || 80;
      }
    }

    if (cat.id === 'gcv_above_40') {
      const ageRates = cat.rates[state.age];
      if (ageRates) {
        return ageRates[state.renewal] || 60;
      }
    }

    return 75;
  }

  /**
   * Update calculation result displays
   */
  function updateCalculation() {
    const discount = getCurrentDiscount();
    const cat = DISCOUNT_DATA.categories.find(c => c.id === state.category);

    // Update Big Result Badge
    el.resultPercentage.textContent = discount;
    el.meterFill.style.width = `${discount}%`;

    // Category Label in Parameters
    el.paramCategory.textContent = `${cat.name}`;

    // Age / Condition Labels
    if (cat.id === 'two_wheeler_new') {
      el.paramAge.textContent = 'Brand New (0 yrs)';
      el.paramCondition.textContent = 'Standard Tariff';
      el.resultSublabel.textContent = 'Flat approved rate for Brand New Two Wheelers';
    } else if (cat.id === 'saod_private_car') {
      el.paramAge.textContent = 'All Ages (Renewal/Rollover)';
      const isNcb = state.ncb === 'with_ncb';
      el.paramCondition.textContent = isNcb ? 'With NCB (Claim-free)' : 'Without NCB (0% NCB)';
      el.resultSublabel.textContent = isNcb ? 'NCB Bonus verified discount' : 'Standard Standalone OD rate';
    } else if (cat.id === 'gcv_above_40') {
      const ageObj = cat.ageBrackets.find(a => a.id === state.age);
      el.paramAge.textContent = ageObj ? ageObj.label : state.age;
      const isNia = state.renewal === 'nia_renewal';
      el.paramCondition.textContent = isNia ? 'NIA Existing Renewal' : 'Other Company Rollover';
      el.resultSublabel.textContent = isNia ? 'Loyalty renewal preferred rate' : 'Standard rollover rate';
    } else {
      // Private Car or GCV 7.5T-40T
      const ageObj = cat.ageBrackets.find(a => a.id === state.age);
      el.paramAge.textContent = ageObj ? ageObj.label : state.age;
      const isAddon = state.addon === 'with_addon';
      el.paramCondition.textContent = isAddon ? 'With Add-on Cover' : 'Without Add-on Cover';
      el.resultSublabel.textContent = isAddon ? 'Comprehensive with Nil Dep/Add-ons' : 'Basic Comprehensive OD Cover';
    }

    el.paramDiscount.textContent = `${discount}%`;
    el.underwritingNoteText.textContent = cat.notes || 'Subject to standard New India Assurance underwriting guidelines.';

    // Update Premium Estimator if open/active
    updatePremiumEstimator(discount);
  }

  /**
   * Calculate and update the interactive OD Premium Estimator
   */
  function updatePremiumEstimator(discountRate) {
    if (!discountRate) discountRate = getCurrentDiscount();

    const basicOd = Math.max(0, parseFloat(el.inputBasicOd.value) || 0);
    const ncbPercent = parseFloat(el.selectNcbPercent.value) || 0;

    // 1. Discount Amount = Basic OD * Discount%
    const discountAmount = Math.round(basicOd * (discountRate / 100));
    
    // 2. OD after revised discount
    const odAfterDiscount = Math.max(0, basicOd - discountAmount);

    // 3. NCB Deduction (calculated on net OD after discount as per tariff)
    const ncbAmount = Math.round(odAfterDiscount * (ncbPercent / 100));
    const netOdBeforeGst = Math.max(0, odAfterDiscount - ncbAmount);

    // 4. GST @ 18%
    const gstAmount = Math.round(netOdBeforeGst * 0.18);

    // 5. Final OD Payable
    const finalOdPayable = netOdBeforeGst + gstAmount;

    // Format to Indian Rupee strings
    const fmt = num => '₹' + num.toLocaleString('en-IN');

    el.outBasicOd.textContent = fmt(basicOd);
    el.outDiscountPercent.textContent = `(${discountRate}%)`;
    el.outDiscountAmount.textContent = `- ${fmt(discountAmount)}`;
    el.outOdAfterDiscount.textContent = fmt(odAfterDiscount);
    el.outNcbAmount.textContent = `- ${fmt(ncbAmount)}`;
    el.outGstAmount.textContent = `+ ${fmt(gstAmount)}`;
    el.outFinalOdPayable.textContent = fmt(finalOdPayable);
  }

  /**
   * Build text summary for clipboard & WhatsApp
   */
  function buildQuoteSummaryText() {
    const discount = getCurrentDiscount();
    const cat = DISCOUNT_DATA.categories.find(c => c.id === state.category);
    const ageText = el.paramAge.textContent;
    const condText = el.paramCondition.textContent;
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return [
      `*New India Assurance (NIA) - Revised OD Discount Quote*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📋 *Category:* ${cat.name} (${cat.subtitle})`,
      `📅 *Vehicle Age:* ${ageText}`,
      `🛡️ *Cover / Criteria:* ${condText}`,
      `🎯 *Revised OD Discount:* *${discount}%*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📅 *Date:* ${today}`,
      `⚠️ *Note:* Revised OD discount approved under current NIA underwriting guidelines.`
    ].join('\n');
  }

  /**
   * Copy quote summary to clipboard
   */
  async function copyQuoteToClipboard() {
    const text = buildQuoteSummaryText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Quote summary copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
      showToast('Unable to copy. Please manually copy the summary.');
    }
  }

  /**
   * Share quote directly via WhatsApp
   */
  function shareViaWhatsApp() {
    const text = buildQuoteSummaryText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  /**
   * Show Toast Notification
   */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon-green" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    el.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }

  /**
   * Render Rate Chart Matrix Table Rows
   */
  function renderMatrixTable() {
    const rows = DISCOUNT_DATA.getMatrixRows();
    el.matrixTableBody.innerHTML = '';

    const filter = state.matrixFilter.toLowerCase();
    const query = state.searchQuery.trim().toLowerCase();

    const filteredRows = rows.filter(r => {
      // Category filter
      if (filter !== 'all') {
        if (r.categoryId !== filter) return false;
      }
      // Text search
      if (query) {
        const textToSearch = `${r.category} ${r.age} ${r.condition} ${r.discount}% ${r.remarks}`.toLowerCase();
        if (!textToSearch.includes(query)) return false;
      }
      return true;
    });

    el.matrixRowCount.textContent = `${filteredRows.length} rate rules`;

    if (filteredRows.length === 0) {
      el.matrixTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-subtle);">
            No matching rate rules found for "${state.searchQuery}". Try clearing filters.
          </td>
        </tr>
      `;
      return;
    }

    filteredRows.forEach(row => {
      const tr = document.createElement('tr');

      // Rate tier styling
      let tierClass = 'rate-tier-standard';
      if (row.discount >= 85) tierClass = 'rate-tier-high';
      else if (row.discount >= 75) tierClass = 'rate-tier-mid';

      // Check if matches active calculator selection
      const isCurrentCalculatorMatch = checkRowMatchesCalculator(row);
      if (isCurrentCalculatorMatch) {
        tr.classList.add('active-calculator-row');
      }

      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: var(--brand-navy);">${row.category}</div>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">${row.remarks}</div>
        </td>
        <td>
          <span style="font-weight: 600;">${row.age}</span>
        </td>
        <td>
          <span style="color: var(--text-muted); font-weight: 500;">${row.condition}</span>
        </td>
        <td>
          <span class="badge-discount-rate ${tierClass}">${row.discount}%</span>
        </td>
        <td style="text-align: right;">
          <button type="button" class="btn-table-use" data-cat="${row.categoryId}" data-age="${row.ageId}" data-cond="${row.conditionId}">
            Select in Finder
          </button>
        </td>
      `;

      // Click row or select button
      const useBtn = tr.querySelector('.btn-table-use');
      useBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        applyMatrixRowToCalculator(row);
      });

      tr.addEventListener('click', () => {
        applyMatrixRowToCalculator(row);
      });

      el.matrixTableBody.appendChild(tr);
    });
  }

  /**
   * Determine if matrix row matches currently selected calculator state
   */
  function checkRowMatchesCalculator(row) {
    if (row.categoryId !== state.category) return false;

    if (state.category === 'two_wheeler_new') return true;

    if (state.category === 'saod_private_car') {
      return row.conditionId === state.ncb;
    }

    if (state.category === 'gcv_above_40') {
      return row.ageId === state.age && row.conditionId === state.renewal;
    }

    // Private car or GCV 7.5T-40T
    return row.ageId === state.age && row.conditionId === state.addon;
  }

  /**
   * Highlight matching row in matrix
   */
  function highlightMatrixRow() {
    const rows = el.matrixTableBody.querySelectorAll('tr');
    const matrixData = DISCOUNT_DATA.getMatrixRows();

    rows.forEach(tr => {
      const useBtn = tr.querySelector('.btn-table-use');
      if (!useBtn) return;

      const catId = useBtn.dataset.cat;
      const ageId = useBtn.dataset.age;
      const condId = useBtn.dataset.cond;

      const match = checkRowMatchesCalculator({
        categoryId: catId,
        ageId: ageId,
        conditionId: condId
      });

      tr.classList.toggle('active-calculator-row', match);
    });
  }

  /**
   * Apply a clicked matrix row to the Quick Calculator and switch view
   */
  function applyMatrixRowToCalculator(row) {
    state.category = row.categoryId;

    if (row.ageId && row.ageId !== 'any' && row.ageId !== 'brand_new') {
      state.age = row.ageId;
    }

    if (row.categoryId === 'saod_private_car') {
      state.ncb = row.conditionId;
    } else if (row.categoryId === 'gcv_above_40') {
      state.renewal = row.conditionId;
    } else if (row.conditionId === 'with_addon' || row.conditionId === 'without_addon') {
      state.addon = row.conditionId;
    }

    // Switch to calculator view
    switchView('calculator');

    // Re-render calculator state
    renderCategoryPills();
    renderDynamicInputs();
    updateCalculation();
    highlightMatrixRow();

    showToast(`Loaded ${row.category} (${row.discount}%) into Calculator`);
  }

  /**
   * View switcher (Calculator vs Rate Chart Matrix)
   */
  function switchView(viewName) {
    state.activeView = viewName;
    if (viewName === 'calculator') {
      el.tabCalculator.classList.add('active');
      el.tabMatrix.classList.remove('active');
      el.viewCalculator.classList.add('active');
      el.viewMatrix.classList.remove('active');
    } else {
      el.tabMatrix.classList.add('active');
      el.tabCalculator.classList.remove('active');
      el.viewMatrix.classList.add('active');
      el.viewCalculator.classList.remove('active');
      renderMatrixTable();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Open Print / Quote Slip Modal
   */
  function openQuoteSlipModal() {
    const cat = DISCOUNT_DATA.categories.find(c => c.id === state.category);
    const discount = getCurrentDiscount();

    el.modalCategory.textContent = `${cat.name} (${cat.subtitle})`;
    el.modalAge.textContent = el.paramAge.textContent;
    el.modalCondition.textContent = el.paramCondition.textContent;
    el.modalDiscountVal.textContent = `${discount}%`;
    el.modalDate.textContent = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    el.quoteModal.classList.add('active');
  }

  /**
   * Close Quote Slip Modal
   */
  function closeQuoteSlipModal() {
    el.quoteModal.classList.remove('active');
  }

  /**
   * Reset inputs to initial defaults
   */
  function resetInputs() {
    state.category = 'private_car';
    state.age = 'up_to_7';
    state.addon = 'with_addon';
    state.ncb = 'with_ncb';
    state.renewal = 'nia_renewal';
    state.basicOdPremium = 10000;
    el.inputBasicOd.value = 10000;
    el.selectNcbPercent.value = 20;

    renderCategoryPills();
    renderDynamicInputs();
    updateCalculation();
    highlightMatrixRow();

    showToast('Inputs reset to default');
  }

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // Navigation tabs
    el.tabCalculator.addEventListener('click', () => switchView('calculator'));
    el.tabMatrix.addEventListener('click', () => switchView('matrix'));

    // Copy & Share buttons
    el.btnCopyQuote.addEventListener('click', copyQuoteToClipboard);
    el.btnShareWhatsapp.addEventListener('click', shareViaWhatsApp);
    el.btnResetInputs.addEventListener('click', resetInputs);

    // Quote Slip Modal
    el.btnPrintSlip.addEventListener('click', openQuoteSlipModal);
    el.modalCloseBtn.addEventListener('click', closeQuoteSlipModal);
    el.modalPrintBtn.addEventListener('click', () => {
      window.print();
    });

    el.quoteModal.addEventListener('click', (e) => {
      if (e.target === el.quoteModal) {
        closeQuoteSlipModal();
      }
    });

    // Premium Estimator Accordion
    el.calcAccordionTrigger.addEventListener('click', () => {
      el.premiumCalcContainer.classList.toggle('open');
      const isOpen = el.premiumCalcContainer.classList.contains('open');
      el.calcAccordionTrigger.setAttribute('aria-expanded', isOpen);
    });

    // Premium input listeners
    el.inputBasicOd.addEventListener('input', () => updatePremiumEstimator());
    el.selectNcbPercent.addEventListener('change', () => updatePremiumEstimator());

    // Matrix search and filters
    el.matrixSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMatrixTable();
    });

    el.matrixFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        el.matrixFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.matrixFilter = btn.dataset.filter;
        renderMatrixTable();
      });
    });

    // Keyboard support: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && el.quoteModal.classList.contains('active')) {
        closeQuoteSlipModal();
      }
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
