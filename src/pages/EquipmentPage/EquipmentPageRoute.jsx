import React, { useEffect, useState } from 'react';
import EquipmentPage from './EquipmentPage';
import { fetchEquipmentProducts } from '../../data/equipmentProducts';
import { selectEquipmentProducts } from '../../data/equipmentPages';

export default function EquipmentPageRoute({ page }) {
  const [state, setState] = useState({ products: [], loading: true, error: false });
  useEffect(() => {
    const controller = new AbortController();
    fetchEquipmentProducts({ signal: controller.signal })
      .then(products => setState({ products, loading: false, error: false }))
      .catch(error => { if (error.name !== 'AbortError') setState({ products: [], loading: false, error: true }); });
    return () => controller.abort();
  }, []);
  return <EquipmentPage page={page} {...state} products={selectEquipmentProducts(state.products, page)} />;
}
