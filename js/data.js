/**
 * New India Assurance (NIA) Revised OD Discount Data Matrix
 * Accurate underwriting discount schedule
 */

const DISCOUNT_DATA = {
  categories: [
    {
      id: 'private_car',
      name: 'Private Car',
      subtitle: 'Other than Brand New',
      icon: 'car',
      badge: 'Most Popular',
      description: 'Comprehensive policy for pre-owned & rollover private cars based on age and add-on cover.',
      inputTypes: ['age', 'addon'],
      ageBrackets: [
        { id: 'up_to_7', label: 'Up to 7 years', description: '0 to 7 years from registration' },
        { id: '7_to_10', label: '> 7 to 10 years', description: 'Exceeding 7 years up to 10 years' },
        { id: '10_to_15', label: '> 10 to 15 years', description: 'Exceeding 10 years up to 15 years' },
        { id: 'above_15', label: '> 15 years', description: 'Vintage / Older than 15 years' }
      ],
      addonOptions: [
        { id: 'with_addon', label: 'With Add-on Cover', note: 'Includes Nil Dep / Engine Protect / RTI etc.' },
        { id: 'without_addon', label: 'Without Add-on Cover', note: 'Standard Comprehensive OD' }
      ],
      rates: {
        'up_to_7': { with_addon: 90, without_addon: 85 },
        '7_to_10': { with_addon: 87, without_addon: 82 },
        '10_to_15': { with_addon: 80, without_addon: 80 },
        'above_15': { with_addon: 78, without_addon: 78 }
      },
      notes: 'For vehicles older than 10 years, discount remains identical (80% or 78%) with or without add-on cover.'
    },
    {
      id: 'saod_private_car',
      name: 'SAOD Private Car',
      subtitle: 'Renewal / Rollover (Standalone OD)',
      icon: 'shield-check',
      badge: 'Standalone OD',
      description: 'Standalone Own Damage policy where Third Party (TP) is already active elsewhere.',
      inputTypes: ['ncb'],
      ncbOptions: [
        { id: 'with_ncb', label: 'With NCB', note: 'Claim-free expiring policy (20% to 50% NCB bonus)' },
        { id: 'without_ncb', label: 'Without NCB (0% NCB)', note: 'Nil NCB or claim registered in preceding year' }
      ],
      rates: {
        'with_ncb': 82,
        'without_ncb': 78
      },
      notes: 'Applicable for Standalone OD renewals and rollovers with valid active Long-Term TP coverage.'
    },
    {
      id: 'gcv_7_5_to_40',
      name: 'GCV (7.5T – 40T)',
      subtitle: '> 7,500 GVW up to 40,000 GVW (Other than Brand New)',
      icon: 'truck',
      badge: 'Commercial Medium/Heavy',
      description: 'Goods Carrying Vehicles with Gross Vehicle Weight between 7,500 kg and 40,000 kg.',
      inputTypes: ['age', 'addon'],
      ageBrackets: [
        { id: 'up_to_7', label: 'Up to 7 years', description: '0 to 7 years from registration' },
        { id: '7_to_10', label: '> 7 to 10 years', description: 'Exceeding 7 years up to 10 years' },
        { id: '10_to_15', label: '> 10 to 15 years', description: 'Exceeding 10 years up to 15 years' },
        { id: 'above_15', label: '> 15 years', description: 'Exceeding 15 years' }
      ],
      addonOptions: [
        { id: 'with_addon', label: 'With Add-on Cover', note: 'IMT/endorsements & add-on protection' },
        { id: 'without_addon', label: 'Without Add-on Cover', note: 'Standard commercial OD' }
      ],
      rates: {
        'up_to_7': { with_addon: 85, without_addon: 82 },
        '7_to_10': { with_addon: 80, without_addon: 78 },
        '10_to_15': { with_addon: 75, without_addon: 75 },
        'above_15': { with_addon: 70, without_addon: 70 }
      },
      notes: 'For commercial vehicles > 10 years of age, OD discount is flat irrespective of add-on selection.'
    },
    {
      id: 'gcv_above_40',
      name: 'GCV (> 40,000 GVW)',
      subtitle: 'Multi-axle Heavy GCV (Other than Brand New)',
      icon: 'container',
      badge: 'Heavy Commercial',
      description: 'Heavy Goods Carrying Commercial Vehicles with Gross Vehicle Weight exceeding 40,000 kg.',
      inputTypes: ['age', 'renewal_type'],
      ageBrackets: [
        { id: 'up_to_7', label: 'Up to 7 years', description: '0 to 7 years from registration' },
        { id: '7_to_10', label: '> 7 to 10 years', description: 'Exceeding 7 years up to 10 years' },
        { id: '10_to_15', label: '> 10 to 15 years', description: 'Exceeding 10 years up to 15 years' },
        { id: 'above_15', label: '> 15 years', description: 'Exceeding 15 years' }
      ],
      renewalOptions: [
        { id: 'nia_renewal', label: 'NIA Renewal', note: 'Existing New India Assurance policyholder renewal' },
        { id: 'other_renewal', label: 'Other Company Renewal', note: 'Rollover from private/public general insurers' }
      ],
      rates: {
        'up_to_7': { nia_renewal: 75, other_renewal: 65 },
        '7_to_10': { nia_renewal: 70, other_renewal: 65 },
        '10_to_15': { nia_renewal: 65, other_renewal: 60 },
        'above_15': { nia_renewal: 60, other_renewal: 55 }
      },
      notes: 'Existing NIA customers enjoy up to 10% higher discount loyalty incentive compared to external rollovers.'
    },
    {
      id: 'two_wheeler_new',
      name: 'Two Wheeler',
      subtitle: 'Brand New Vehicles',
      icon: 'bike',
      badge: 'Brand New',
      description: 'Fixed revised OD discount applicable for all brand new two wheelers at time of showroom delivery.',
      inputTypes: ['fixed'],
      rates: 75,
      notes: 'Fixed flat 75% revised OD discount on tariff rate. Applicable for all brand new motorcycle & scooter sales.'
    }
  ],

  // Flattened rate rows for the Reference Rate Chart Matrix
  getMatrixRows() {
    return [
      // Private Car
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: 'Up to 7 years',
        ageId: 'up_to_7',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 90,
        remarks: 'Max discount tier for modern cars'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: 'Up to 7 years',
        ageId: 'up_to_7',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 85,
        remarks: 'Standard OD package'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: '> 7 to 10 years',
        ageId: '7_to_10',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 87,
        remarks: 'Optimal rate for 7-10 yr bracket'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: '> 7 to 10 years',
        ageId: '7_to_10',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 82,
        remarks: 'Standard OD package'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: '> 10 to 15 years',
        ageId: '10_to_15',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 80,
        remarks: 'Add-on & Non Add-on parity'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: '> 10 to 15 years',
        ageId: '10_to_15',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 80,
        remarks: 'Add-on & Non Add-on parity'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: '> 15 years',
        ageId: 'above_15',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 78,
        remarks: 'Vintage / Senior vehicles'
      },
      {
        category: 'Private Car (other than Brand New)',
        categoryId: 'private_car',
        age: '> 15 years',
        ageId: 'above_15',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 78,
        remarks: 'Vintage / Senior vehicles'
      },

      // SAOD Private Car
      {
        category: 'Standalone OD (SAOD) - Private Car',
        categoryId: 'saod_private_car',
        age: 'All Applicable Ages',
        ageId: 'any',
        condition: 'With NCB',
        conditionId: 'with_ncb',
        discount: 82,
        remarks: 'Renewal / Rollover with active NCB'
      },
      {
        category: 'Standalone OD (SAOD) - Private Car',
        categoryId: 'saod_private_car',
        age: 'All Applicable Ages',
        ageId: 'any',
        condition: 'Without NCB',
        conditionId: 'without_ncb',
        discount: 78,
        remarks: 'Renewal / Rollover with 0% NCB'
      },

      // GCV 7.5T to 40T
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: 'Up to 7 years',
        ageId: 'up_to_7',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 85,
        remarks: 'Medium/Heavy commercial with Add-on'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: 'Up to 7 years',
        ageId: 'up_to_7',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 82,
        remarks: 'Medium/Heavy commercial standard'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: '> 7 to 10 years',
        ageId: '7_to_10',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 80,
        remarks: 'Medium/Heavy commercial with Add-on'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: '> 7 to 10 years',
        ageId: '7_to_10',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 78,
        remarks: 'Medium/Heavy commercial standard'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: '> 10 to 15 years',
        ageId: '10_to_15',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 75,
        remarks: 'Flat commercial OD discount'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: '> 10 to 15 years',
        ageId: '10_to_15',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 75,
        remarks: 'Flat commercial OD discount'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: '> 15 years',
        ageId: 'above_15',
        condition: 'With Add-on Cover',
        conditionId: 'with_addon',
        discount: 70,
        remarks: 'Senior fleet discount'
      },
      {
        category: 'Commercial Vehicles - GCV (7.5T – 40T)',
        categoryId: 'gcv_7_5_to_40',
        age: '> 15 years',
        ageId: 'above_15',
        condition: 'Without Add-on Cover',
        conditionId: 'without_addon',
        discount: 70,
        remarks: 'Senior fleet discount'
      },

      // GCV > 40,000 GVW
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: 'Up to 7 years',
        ageId: 'up_to_7',
        condition: 'NIA Renewal',
        conditionId: 'nia_renewal',
        discount: 75,
        remarks: 'Loyalty renewal bonus'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: 'Up to 7 years',
        ageId: 'up_to_7',
        condition: 'Other Company Renewal',
        conditionId: 'other_renewal',
        discount: 65,
        remarks: 'External rollover rate'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: '> 7 to 10 years',
        ageId: '7_to_10',
        condition: 'NIA Renewal',
        conditionId: 'nia_renewal',
        discount: 70,
        remarks: 'Loyalty renewal bonus'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: '> 7 to 10 years',
        ageId: '7_to_10',
        condition: 'Other Company Renewal',
        conditionId: 'other_renewal',
        discount: 65,
        remarks: 'External rollover rate'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: '> 10 to 15 years',
        ageId: '10_to_15',
        condition: 'NIA Renewal',
        conditionId: 'nia_renewal',
        discount: 65,
        remarks: 'Loyalty renewal bonus'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: '> 10 to 15 years',
        ageId: '10_to_15',
        condition: 'Other Company Renewal',
        conditionId: 'other_renewal',
        discount: 60,
        remarks: 'External rollover rate'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: '> 15 years',
        ageId: 'above_15',
        condition: 'NIA Renewal',
        conditionId: 'nia_renewal',
        discount: 60,
        remarks: 'Loyalty renewal bonus'
      },
      {
        category: 'Commercial Vehicles - GCV (> 40,000 GVW)',
        categoryId: 'gcv_above_40',
        age: '> 15 years',
        ageId: 'above_15',
        condition: 'Other Company Renewal',
        conditionId: 'other_renewal',
        discount: 55,
        remarks: 'External rollover rate'
      },

      // Two Wheeler (Brand New)
      {
        category: 'Two Wheeler (Brand New)',
        categoryId: 'two_wheeler_new',
        age: 'Brand New (0 Age)',
        ageId: 'brand_new',
        condition: 'Fixed Tariff OD Discount',
        conditionId: 'fixed',
        discount: 75,
        remarks: 'Flat revised discount on showroom sales'
      }
    ];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DISCOUNT_DATA;
}
if (typeof window !== 'undefined') {
  window.DISCOUNT_DATA = DISCOUNT_DATA;
}

