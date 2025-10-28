import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const initialCategories = [
    {
      name: "Medicines",
      image: "images/8418259.jpg",
      description: "Over-the-counter and prescription medicines",
      medicines: [
        { id: 1, name: "Paracetamol", price: "₹496.17", description: "Pain reliever and fever reducer", brand: "Generic", strength: "500mg", packSize: "10 tablets", stock: 100 },
        { id: 2, name: "Ibuprofen", price: "₹621.67", description: "Anti-inflammatory pain reliever", brand: "Advil", strength: "200mg", packSize: "20 tablets", stock: 50 },
        { id: 3, name: "Aspirin", price: "₹414.17", description: "Pain reliever and blood thinner", brand: "Bayer", strength: "81mg", packSize: "30 tablets", stock: 75 },
        { id: 4, name: "Amoxicillin", price: "₹1078.17", description: "Antibiotic for bacterial infections", brand: "Generic", strength: "500mg", packSize: "21 capsules", stock: 30 },
        { id: 5, name: "Cetirizine", price: "₹538.67", description: "Antihistamine for allergies", brand: "Zyrtec", strength: "10mg", packSize: "30 tablets", stock: 60 }
      ]
    },
    {
      name: "Health & Nutrition",
      image: "images/vitamin-category.jpeg",
      description: "Vitamins, supplements, and nutritional products",
      medicines: [
        { id: 6, name: "Vitamin C", price: "₹828.17", description: "Immune system support", brand: "Nature Made", strength: "1000mg", packSize: "60 tablets", stock: 40 },
        { id: 7, name: "Multivitamin", price: "₹1078.17", description: "Daily vitamin supplement", brand: "Centrum", strength: "Adult", packSize: "100 tablets", stock: 25 },
        { id: 8, name: "Omega-3", price: "₹1244.17", description: "Heart health supplement", brand: "Fish Oil", strength: "1000mg", packSize: "120 softgels", stock: 35 },
        { id: 9, name: "Calcium + Vitamin D", price: "₹953.67", description: "Bone health support", brand: "Generic", strength: "500mg/400IU", packSize: "90 tablets", stock: 45 },
        { id: 10, name: "Probiotics", price: "₹1409.17", description: "Gut health supplement", brand: "Culturelle", strength: "10 billion CFU", packSize: "30 capsules", stock: 20 }
      ]
    },
    {
      name: "Personal Care",
      image: "/images/pc-category.jpg",
      description: "Skincare, haircare, and hygiene products",
      medicines: [
        { id: 11, name: "Shampoo", price: "₹746.17", description: "Hair cleansing product", brand: "Head & Shoulders", strength: "Anti-dandruff", packSize: "400ml", stock: 80 },
        { id: 12, name: "Moisturizer", price: "₹953.67", description: "Skin hydration cream", brand: "Cetaphil", strength: "Daily", packSize: "453g", stock: 55 },
        { id: 13, name: "Toothpaste", price: "₹331.17", description: "Oral hygiene product", brand: "Colgate", strength: "Total", packSize: "100g", stock: 90 },
        { id: 14, name: "Face Wash", price: "₹663.17", description: "Gentle facial cleanser", brand: "CeraVe", strength: "Hydrating", packSize: "236ml", stock: 65 },
        { id: 15, name: "Sunscreen", price: "₹1160.17", description: "UV protection lotion", brand: "Neutrogena", strength: "SPF 50", packSize: "88ml", stock: 40 }
      ]
    },
    {
      name: "Baby Care",
      image: "/images/babycare-category.jpg",
      description: "Diapers, baby food, and infant care products",
      medicines: [
        { id: 16, name: "Diapers", price: "₹1659.17", description: "Absorbent baby diapers", brand: "Pampers", strength: "Size 4", packSize: "44 count", stock: 70 },
        { id: 17, name: "Baby Lotion", price: "₹580.17", description: "Gentle baby skin care", brand: "Johnson's", strength: "Original", packSize: "200ml", stock: 85 },
        { id: 18, name: "Baby Formula", price: "₹2074.17", description: "Infant nutrition", brand: "Similac", strength: "Stage 1", packSize: "1.45kg", stock: 15 },
        { id: 19, name: "Baby Wipes", price: "₹372.67", description: "Gentle baby cleansing wipes", brand: "Huggies", strength: "Unscented", packSize: "64 count", stock: 95 },
        { id: 20, name: "Baby Shampoo", price: "₹496.17", description: "Tear-free baby shampoo", brand: "Johnson's", strength: "Original", packSize: "200ml", stock: 50 }
      ]
    },
    {
      name: "Diabetes Care",
      image: "/images/medicines-category.jpeg",
      description: "Medicines and supplies for diabetes management",
      medicines: [
        { id: 21, name: "Metformin", price: "₹124.17", description: "Oral diabetes medicine", brand: "Generic", strength: "500mg", packSize: "30 tablets", stock: 100 },
        { id: 22, name: "Insulin Glargine", price: "₹2074.17", description: "Long-acting insulin", brand: "Lantus", strength: "100IU/ml", packSize: "5 pens", stock: 20 },
        { id: 23, name: "Glucose Test Strips", price: "₹1244.17", description: "Blood glucose monitoring strips", brand: "Accu-Chek", strength: "50 count", packSize: "1 box", stock: 50 },
        { id: 24, name: "DPP-4 Inhibitor", price: "₹1659.17", description: "Diabetes medication", brand: "Januvia", strength: "100mg", packSize: "28 tablets", stock: 30 },
        { id: 25, name: "Blood Glucose Meter", price: "₹3318.17", description: "Device for blood sugar monitoring", brand: "OneTouch", strength: "Basic", packSize: "1 unit", stock: 15 }
      ]
    },
    {
      name: "Cardiac Care",
      image: "/images/medicines-category.jpeg",
      description: "Medicines for heart health and cardiac conditions",
      medicines: [
        { id: 26, name: "Aspirin", price: "₹414.17", description: "Blood thinner for heart health", brand: "Bayer", strength: "81mg", packSize: "30 tablets", stock: 75 },
        { id: 27, name: "Atorvastatin", price: "₹746.17", description: "Cholesterol-lowering medication", brand: "Lipitor", strength: "20mg", packSize: "30 tablets", stock: 60 },
        { id: 28, name: "Lisinopril", price: "₹580.17", description: "ACE inhibitor for blood pressure", brand: "Prinivil", strength: "10mg", packSize: "30 tablets", stock: 45 },
        { id: 29, name: "Clopidogrel", price: "₹953.67", description: "Antiplatelet medication", brand: "Plavix", strength: "75mg", packSize: "30 tablets", stock: 40 },
        { id: 30, name: "Beta Blocker", price: "₹663.17", description: "Medication for heart rhythm", brand: "Metoprolol", strength: "25mg", packSize: "30 tablets", stock: 55 }
      ]
    },
    {
      name: "Stomach Care",
      image: "/images/medicines-category.jpeg",
      description: "Medicines for digestive health and stomach issues",
      medicines: [
        { id: 31, name: "Omeprazole", price: "₹496.17", description: "Acid reflux medication", brand: "Prilosec", strength: "20mg", packSize: "30 capsules", stock: 80 },
        { id: 32, name: "Loperamide", price: "₹331.17", description: "Anti-diarrheal medication", brand: "Imodium", strength: "2mg", packSize: "24 tablets", stock: 90 },
        { id: 33, name: "Simethicone", price: "₹248.17", description: "Gas relief medication", brand: "Phazyme", strength: "125mg", packSize: "30 tablets", stock: 70 },
        { id: 34, name: "Ranitidine", price: "₹414.17", description: "H2 blocker for acid reduction", brand: "Zantac", strength: "150mg", packSize: "30 tablets", stock: 65 },
        { id: 35, name: "Probiotic", price: "₹828.17", description: "Gut health supplement", brand: "Align", strength: "1 billion CFU", packSize: "28 capsules", stock: 50 }
      ]
    },
    {
      name: "Pain Relief",
      image: "/images/medicines-category.jpeg",
      description: "Pain relievers and analgesics",
      medicines: [
        { id: 36, name: "Ibuprofen", price: "₹621.67", description: "NSAID for pain and inflammation", brand: "Advil", strength: "200mg", packSize: "20 tablets", stock: 100 },
        { id: 37, name: "Acetaminophen", price: "₹496.17", description: "Pain reliever and fever reducer", brand: "Tylenol", strength: "500mg", packSize: "24 tablets", stock: 85 },
        { id: 38, name: "Naproxen", price: "₹746.17", description: "Long-acting pain reliever", brand: "Aleve", strength: "220mg", packSize: "20 tablets", stock: 60 },
        { id: 39, name: "Tramadol", price: "₹953.67", description: "Opioid pain medication", brand: "Ultram", strength: "50mg", packSize: "30 tablets", stock: 25 },
        { id: 40, name: "Topical Analgesic", price: "₹580.17", description: "Cream for muscle pain", brand: "Aspercreme", strength: "5%", packSize: "113g", stock: 40 }
      ]
    },
    {
      name: "Liver Care",
      image: "/images/medicines-category.jpeg",
      description: "Medicines for liver health and conditions",
      medicines: [
        { id: 41, name: "Ursodeoxycholic Acid", price: "₹1244.17", description: "Medication for liver disorders", brand: "Ursodiol", strength: "300mg", packSize: "30 capsules", stock: 35 },
        { id: 42, name: "Silymarin", price: "₹828.17", description: "Liver protectant supplement", brand: "Milk Thistle", strength: "150mg", packSize: "60 capsules", stock: 50 },
        { id: 43, name: "Hepatoprotector", price: "₹1078.17", description: "Liver support medication", brand: "Liv.52", strength: "Standard", packSize: "100 tablets", stock: 45 },
        { id: 44, name: "Antiviral", price: "₹3318.17", description: "Treatment for hepatitis", brand: "Sofosbuvir", strength: "400mg", packSize: "28 tablets", stock: 10 },
        { id: 45, name: "Liver Detox", price: "₹663.17", description: "Detoxification supplement", brand: "Generic", strength: "500mg", packSize: "60 capsules", stock: 60 }
      ]
    },
    {
      name: "Oral Care",
      image: "/images/medicines-category.jpeg",
      description: "Medicines and products for oral health",
      medicines: [
        { id: 46, name: "Chlorhexidine", price: "₹580.17", description: "Antiseptic mouthwash", brand: "Peridex", strength: "0.12%", packSize: "473ml", stock: 40 },
        { id: 47, name: "Fluoride Toothpaste", price: "₹331.17", description: "Cavity protection toothpaste", brand: "Colgate", strength: "1450ppm", packSize: "100g", stock: 90 },
        { id: 48, name: "Mouth Ulcer Gel", price: "₹248.17", description: "Pain relief for mouth sores", brand: "Orajel", strength: "20%", packSize: "5.3g", stock: 70 },
        { id: 49, name: "Antibiotic Mouth Rinse", price: "₹746.17", description: "Treatment for gum infections", brand: "PerioGard", strength: "0.12%", packSize: "473ml", stock: 30 },
        { id: 50, name: "Dental Floss", price: "₹165.17", description: "Interdental cleaning tool", brand: "Oral-B", strength: "Waxed", packSize: "50m", stock: 100 }
      ]
    },
    {
      name: "Respiratory",
      image: "/images/medicines-category.jpeg",
      description: "Medicines for respiratory health and conditions",
      medicines: [
        { id: 51, name: "Albuterol", price: "₹828.17", description: "Bronchodilator inhaler", brand: "Ventolin", strength: "90mcg", packSize: "200 doses", stock: 25 },
        { id: 52, name: "Montelukast", price: "₹1078.17", description: "Leukotriene receptor antagonist", brand: "Singulair", strength: "10mg", packSize: "30 tablets", stock: 40 },
        { id: 53, name: "Fluticasone", price: "₹1244.17", description: "Corticosteroid inhaler", brand: "Flovent", strength: "110mcg", packSize: "120 doses", stock: 20 },
        { id: 54, name: "Guaifenesin", price: "₹496.17", description: "Expectorant for cough", brand: "Mucinex", strength: "400mg", packSize: "20 tablets", stock: 60 },
        { id: 55, name: "Nasal Spray", price: "₹663.17", description: "Steroid nasal spray", brand: "Flonase", strength: "50mcg", packSize: "120 sprays", stock: 35 }
      ]
    },
    {
      name: "Sexual Health",
      image: "/images/medicines-category.jpeg",
      description: "Medicines and products for sexual health",
      medicines: [
        { id: 56, name: "Sildenafil", price: "₹1659.17", description: "Treatment for erectile dysfunction", brand: "Viagra", strength: "100mg", packSize: "4 tablets", stock: 15 },
        { id: 57, name: "Tadalafil", price: "₹2074.17", description: "Long-acting ED medication", brand: "Cialis", strength: "20mg", packSize: "4 tablets", stock: 10 },
        { id: 58, name: "Contraceptive Pill", price: "₹828.17", description: "Oral contraceptive", brand: "Yasmin", strength: "Standard", packSize: "21 tablets", stock: 30 },
        { id: 59, name: "Lubricant", price: "₹580.17", description: "Personal lubricant", brand: "K-Y", strength: "Water-based", packSize: "118ml", stock: 50 },
        { id: 60, name: "Testosterone Gel", price: "₹3318.17", description: "Hormone replacement therapy", brand: "AndroGel", strength: "1%", packSize: "75g", stock: 8 }
      ]
    },
    {
      name: "Elderly Care",
      image: "/images/medicines-category.jpeg",
      description: "Medicines and products for elderly health",
      medicines: [
        { id: 61, name: "Donepezil", price: "₹1409.17", description: "Treatment for Alzheimer's", brand: "Aricept", strength: "10mg", packSize: "30 tablets", stock: 20 },
        { id: 62, name: "Calcium Supplement", price: "₹953.67", description: "Bone health for seniors", brand: "Caltrate", strength: "600mg", packSize: "100 tablets", stock: 45 },
        { id: 63, name: "Blood Pressure Monitor", price: "₹2480.17", description: "Home BP monitoring device", brand: "Omron", strength: "Automatic", packSize: "1 unit", stock: 25 },
        { id: 64, name: "Joint Supplement", price: "₹1244.17", description: "Glucosamine for joint health", brand: "Osteo Bi-Flex", strength: "1500mg", packSize: "80 tablets", stock: 35 },
        { id: 65, name: "Hearing Aid", price: "₹16590.17", description: "Assistive device for hearing", brand: "Phonak", strength: "Basic", packSize: "1 unit", stock: 5 }
      ]
    },
    {
      name: "Cold & Immunity",
      image: "/images/medicines-category.jpeg",
      description: "Medicines for cold symptoms and immune support",
      medicines: [
        { id: 66, name: "Vitamin C", price: "₹828.17", description: "Immune booster", brand: "Emergen-C", strength: "1000mg", packSize: "30 packets", stock: 60 },
        { id: 67, name: "Zinc Supplement", price: "₹496.17", description: "Immune support mineral", brand: "Nature Made", strength: "50mg", packSize: "60 tablets", stock: 70 },
        { id: 68, name: "DayQuil", price: "₹746.17", description: "Cold and flu relief", brand: "Vicks", strength: "Multi-symptom", packSize: "24 capsules", stock: 40 },
        { id: 69, name: "Echinacea", price: "₹663.17", description: "Herbal immune support", brand: "Nature's Way", strength: "400mg", packSize: "100 capsules", stock: 50 },
        { id: 70, name: "Nasal Decongestant", price: "₹331.17", description: "Relief for nasal congestion", brand: "Sudafed", strength: "30mg", packSize: "24 tablets", stock: 80 }
      ]
    }
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      if (parsedProducts && parsedProducts.length > 0) {
        setCategories(parsedProducts);
      }
    }
    const storedPending = localStorage.getItem('pendingProducts');
    if (storedPending) {
      const parsedPending = JSON.parse(storedPending);
      if (parsedPending && parsedPending.length > 0) {
        setPendingProducts(parsedPending);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('pendingProducts', JSON.stringify(pendingProducts));
  }, [pendingProducts]);

  const addCategory = (category) => {
    setCategories(prevCategories => [...prevCategories, { ...category, medicines: [] }]);
  };

  const addProduct = (categoryName, product) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.name === categoryName
          ? { ...cat, medicines: [...cat.medicines, { ...product, id: Date.now() }] }
          : cat
      )
    );
  };

  const updateProduct = (categoryName, productId, updatedProduct) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.name === categoryName
          ? {
              ...cat,
              medicines: cat.medicines.map(med =>
                med.id === productId ? { ...med, ...updatedProduct } : med
              )
            }
          : cat
      )
    );
  };

  const removeProduct = (categoryName, productId) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.name === categoryName
          ? { ...cat, medicines: cat.medicines.filter(med => med.id !== productId) }
          : cat
      )
    );
  };

  const importStock = (categoryName, productId, quantity) => {
    updateProduct(categoryName, productId, { stock: categories.find(cat => cat.name === categoryName).medicines.find(med => med.id === productId).stock + quantity });
  };

  const exportStock = (categoryName, productId, quantity) => {
    const currentStock = categories.find(cat => cat.name === categoryName).medicines.find(med => med.id === productId).stock;
    if (currentStock >= quantity) {
      updateProduct(categoryName, productId, { stock: currentStock - quantity });
    }
  };

  const getRevenue = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);

    let dailyRevenue = 0;
    let weeklyRevenue = 0;
    let monthlyRevenue = 0;
    let yearlyRevenue = 0;

    orders.forEach(order => {
      const orderDate = new Date(order.date);
      if (orderDate.toDateString() === today) {
        dailyRevenue += order.total;
      }
      if (orderDate >= thisWeek) {
        weeklyRevenue += order.total;
      }
      if (orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear) {
        monthlyRevenue += order.total;
      }
      if (orderDate.getFullYear() === thisYear) {
        yearlyRevenue += order.total;
      }
    });

    return { dailyRevenue, weeklyRevenue, monthlyRevenue, yearlyRevenue };
  };

  const getTopSellingProducts = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const productSales = {};

    orders.forEach(order => {
      (order.items || []).forEach(item => {
        if (item && item.name) {
          const key = `${item.name}-${item.brand}`;
          if (!productSales[key]) {
            productSales[key] = { name: item.name, brand: item.brand, quantity: 0, revenue: 0 };
          }
          productSales[key].quantity += item.quantity;
          productSales[key].revenue += parseFloat(item.price.replace('$', '')) * item.quantity;
        }
      });
    });

    return Object.values(productSales).sort((a, b) => b.quantity - a.quantity).slice(0, 10);
  };

  const getRevenueByCategory = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const categoryRevenue = {};

    orders.forEach(order => {
      (order.items || []).forEach(item => {
        if (item && item.name) {
          // Find category by matching product name
          const category = categories.find(cat =>
            cat.medicines.some(med => med.name === item.name)
          );
          if (category) {
            if (!categoryRevenue[category.name]) {
              categoryRevenue[category.name] = 0;
            }
            categoryRevenue[category.name] += parseFloat(item.price.replace('$', '')) * item.quantity;
          }
        }
      });
    });

    return categoryRevenue;
  };

  const getOrderTrends = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const monthlyOrders = {};

    orders.forEach(order => {
      const orderDate = new Date(order.date);
      const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyOrders[monthKey]) {
        monthlyOrders[monthKey] = 0;
      }
      monthlyOrders[monthKey]++;
    });

    return monthlyOrders;
  };

  const submitProductForApproval = (product) => {
    const pendingProduct = { ...product, id: Date.now(), submittedAt: new Date().toISOString() };
    setPendingProducts(prev => [...prev, pendingProduct]);
  };

  const approveProduct = (pendingId) => {
    const product = pendingProducts.find(p => p.id === pendingId);
    if (product) {
      addProduct(product.category, product);
      setPendingProducts(prev => prev.filter(p => p.id !== pendingId));
    }
  };

  const rejectProduct = (pendingId) => {
    setPendingProducts(prev => prev.filter(p => p.id !== pendingId));
  };

  const value = {
    categories,
    pendingProducts,
    addCategory,
    addProduct,
    updateProduct,
    removeProduct,
    importStock,
    exportStock,
    getRevenue,
    getTopSellingProducts,
    getRevenueByCategory,
    getOrderTrends,
    submitProductForApproval,
    approveProduct,
    rejectProduct
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
