// Shared by static generation and the Vite preview. Read every API page.
export async function fetchEquipmentProducts({ baseUrl = 'https://admin.ludno.ru', fetchOptions, build = '', signal } = {}) {
  const products = [];
  for (let page = 1; ; page += 1) {
    const url = new URL('/api/products', baseUrl);
    const params = { 'populate[category]': 'true', 'populate[solutions]': 'true', 'populate[image]': 'true', 'populate[card][fields][0]': 'id', 'pagination[pageSize]': '100', 'pagination[page]': String(page), 'sort[0]': 'name:asc' };
    if (build) params._build = build;
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    const response = await fetch(url, { ...fetchOptions, signal });
    if (!response.ok) throw new Error(`Equipment request failed: ${response.status}`);
    const json = await response.json();
    products.push(...(json.data || []));
    if (page >= (json.meta?.pagination?.pageCount || 1)) return products;
  }
}
