// Keep the first product of each primary group, in API order. Use the same
// rule for SSR data and subsequent pages; pagination still counts raw products.
export function filterProductsByGroup(products) {
  const seenGroups = new Set();
  return products.filter((product) => {
    const group = product.groups?.[0];
    const groupId = group?.documentId ?? group?.id;
    if (groupId == null) return true;
    if (seenGroups.has(groupId)) return false;
    seenGroups.add(groupId);
    return true;
  });
}
