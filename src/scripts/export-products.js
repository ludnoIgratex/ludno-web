// src/scripts/export-products.js
import fetch from 'node-fetch';
import * as XLSX from 'xlsx';
import qs from 'qs';

const API_BASE = 'https://admin.ludno.ru';
const SITE_BASE = 'https://ludno.ru';
const PAGE_SIZE = 100;

// --- Транслитерация product.title -> slug ---
function translit(str) {
  if (!str) return '';

  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd',
    е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
    й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
    о: 'o', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch',
    ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '',
    э: 'e', ю: 'yu', я: 'ya'
  };

  let res = '';
  const lower = String(str).toLowerCase();

  for (const ch of lower) {
    if (map[ch]) {
      res += map[ch];
    } else if (/[a-z0-9]/.test(ch)) {
      res += ch;
    } else {
      res += '-';
    }
  }

  // убираем лишние дефисы
  res = res.replace(/-+/g, '-').replace(/^-|-$/g, '');
  // маленький хак для "теннисный" → tennisny (как у тебя)
  res = res.replace(/yi$/,'y');

  return res;
}

// --- ссылка на картинку из product.image или card.productImage[0] ---
function getImageUrl(card) {
  let img = null;

  if (card.product && card.product.image) {
    img = card.product.image;
  }

  if (!img && Array.isArray(card.productImage) && card.productImage.length > 0) {
    img = card.productImage[0];
  }

  if (!img) return '';

  if (Array.isArray(img) && img.length > 0) {
    img = img[0];
  }

  if (!img) return '';

  let url = img.url;

  if (!url && img.formats) {
    url =
      (img.formats.large && img.formats.large.url) ||
      (img.formats.medium && img.formats.medium.url) ||
      (img.formats.thumbnail && img.formats.thumbnail.url);
  }

  if (!url) return '';

  if (!url.startsWith('http')) {
    url = API_BASE + url;
  }

  return url;
}

// --- запрос одной страницы cards с populate, как в React ---
async function fetchCardsPage(page) {
  const queryObj = {
    pagination: {
      page,
      pageSize: PAGE_SIZE,
    },
    populate: {
      product: {
        populate: ['image'],
      },
      productImage: true,
    },
  };

  const query = qs.stringify(queryObj, { encodeValuesOnly: true });
  const url = `${API_BASE}/api/cards?${query}`;

  console.log('Запрашиваю:', url);

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка ${res.status}: ${text}`);
  }

  return res.json();
}

// --- превращаем card в строку таблицы ---
function rowFromCard(card) {
  if (!card || !card.product) return null;

  const title = card.product.title || '';
  const article = card.product.name || ''; // Артикул
  const id = card.id;

  if (!id || !title) return null;

  const slug = translit(title);
  const productUrl = `${SITE_BASE}/card/${id}/${slug}`;
  const imageUrl = getImageUrl(card);

  return {
    title,
    article,
    productUrl,
    imageUrl,
  };
}

async function run() {
  try {
    let page = 1;
    let totalPages = 1;
    const rows = [];

    console.log('Начинаю сбор карточек…');

    while (page <= totalPages) {
      const json = await fetchCardsPage(page);

      const cards = json.data || [];
      if (page === 1 && json.meta && json.meta.pagination) {
        totalPages = json.meta.pagination.pageCount || 1;
        console.log(`Всего страниц с карточками: ${totalPages}`);
      }

      cards.forEach(card => {
        const row = rowFromCard(card);
        if (row) rows.push(row);
      });

      console.log(`Страница ${page} обработана, всего строк: ${rows.length}`);
      page++;
    }

    if (rows.length === 0) {
      console.warn('Не удалось собрать ни одной карточки.');
      return;
    }

    // сортировка по Наименованию (title)
    rows.sort((a, b) =>
      a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' })
    );

    // формируем данные для XLSX
    const data = [
      ['№', 'Ссылка на продукт', 'Ссылка на изображение', 'Наименование', 'Артикул'],
      ...rows.map((row, index) => [
        index + 1,
        row.productUrl,
        row.imageUrl,
        row.title,
        row.article,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    const outPath = 'products.xlsx';
    XLSX.writeFile(wb, outPath);

    console.log('Готово! Файл сохранён:', outPath);
  } catch (e) {
    console.error('Ошибка при генерации таблицы:', e);
  }
}

run();
