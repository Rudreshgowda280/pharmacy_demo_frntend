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
    }
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setCategories(JSON.parse(storedProducts));
    }
    const storedPending = localStorage.getItem('pendingProducts');
    if (storedPending) {
      setPendingProducts(JSON.parse(storedPending));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('pendingProducts', JSON.stringify(pendingProducts));
  }, [pendingProducts]);

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

    let dailyRevenue = 0;
    let monthlyRevenue = 0;

    orders.forEach(order => {
      const orderDate = new Date(order.date);
      if (orderDate.toDateString() === today) {
        dailyRevenue += order.total;
      }
      if (orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear) {
        monthlyRevenue += order.total;
      }
    });

    return { dailyRevenue, monthlyRevenue };
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
    addProduct,
    updateProduct,
    removeProduct,
    importStock,
    exportStock,
    getRevenue,
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
