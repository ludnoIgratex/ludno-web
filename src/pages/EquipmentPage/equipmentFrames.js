// Hand-drawn contours share the same canvas and keep the product area clear.
export const equipmentFrames = {
  slope: [
    'M 42 56 Q 282 5 550 25 Q 583 27 579 67 L 583 572 Q 584 614 542 615 Q 267 630 50 611 Q 20 611 22 574 L 19 96 Q 16 62 42 56 Z',
    'M 36 65 Q 290 16 550 33 Q 574 33 571 70 L 575 576 Q 573 607 540 608 Q 260 619 48 604 Q 29 602 30 571 L 27 97 Q 25 73 36 65 Z',
  ],
  arch: [
    'M 25 575 L 22 124 C 24 35 147 14 299 18 C 467 12 575 39 578 123 L 581 578 Q 580 617 543 618 L 63 621 Q 22 620 25 575 Z',
    'M 34 573 L 30 129 C 32 43 150 25 301 27 C 460 18 568 49 570 127 L 573 576 Q 568 610 539 609 L 66 612 Q 31 614 34 573 Z',
  ],
  tilted: [
    'M 59 19 L 548 37 Q 582 39 579 76 L 560 584 Q 558 617 522 619 L 47 599 Q 17 597 21 560 L 32 59 Q 34 18 59 19 Z',
    'M 62 29 L 545 45 Q 573 48 570 80 L 550 582 Q 548 608 521 610 L 52 592 Q 27 589 29 558 L 42 60 Q 42 28 62 29 Z',
  ],
  wave: [
    'M 52 24 C 131 8 173 39 253 23 S 437 36 545 22 Q 582 20 578 67 C 562 192 591 237 577 330 S 589 489 576 576 Q 579 617 544 615 C 438 631 386 600 285 618 S 146 604 57 619 Q 20 619 23 577 C 37 473 10 413 24 321 S 11 157 23 67 Q 21 27 52 24 Z',
    'M 55 33 C 137 19 178 46 255 32 S 441 44 542 31 Q 572 29 570 69 C 554 190 583 240 568 331 S 580 489 568 574 Q 569 608 541 606 C 437 621 384 592 283 609 S 142 595 59 610 Q 31 610 32 575 C 45 472 20 412 33 322 S 20 160 32 69 Q 30 37 55 33 Z',
  ],
  rounded: [
    'M 123 18 C 236 12 389 23 485 18 Q 576 15 579 109 C 586 243 573 390 579 520 Q 582 617 484 620 C 348 627 236 615 119 620 Q 23 620 21 526 C 14 384 25 246 20 119 Q 17 21 123 18 Z',
    'M 124 29 C 239 20 388 32 484 27 Q 566 25 570 111 C 576 245 564 391 570 518 Q 572 608 482 609 C 347 617 236 606 120 611 Q 33 611 31 525 C 25 384 35 245 30 119 Q 26 31 124 29 Z',
  ],
  organic: [
    'M 102 22 C 197 10 364 31 490 19 C 569 9 587 71 578 144 C 564 251 590 356 576 477 C 568 551 581 612 503 618 C 358 630 212 605 105 620 C 23 628 15 560 24 472 C 38 335 12 255 22 129 C 27 64 23 34 102 22 Z',
    'M 105 32 C 198 21 365 41 489 29 C 560 20 576 75 568 143 C 554 252 580 357 566 476 C 558 552 570 602 502 608 C 358 619 211 595 106 610 C 33 619 26 559 34 472 C 48 335 23 255 32 130 C 37 69 33 43 105 32 Z',
  ],
  angular: [
    'M 50 21 L 546 26 L 578 57 L 574 583 L 545 617 L 54 612 L 21 580 L 26 56 Z',
    'M 54 31 L 542 35 L 568 63 L 565 578 L 540 607 L 58 603 L 31 575 L 35 61 Z',
  ],
  roof: [
    'M 28 81 L 283 19 Q 300 15 318 21 L 573 86 L 579 575 Q 581 615 542 618 L 61 616 Q 21 619 23 577 Z',
    'M 37 89 L 286 29 Q 300 25 315 31 L 564 94 L 570 574 Q 571 607 540 609 L 63 607 Q 31 609 32 576 Z',
  ],
};

// Individual corner profiles keep the family coherent without repeating outlines.
// Values: top-left, top-right, bottom-right, bottom-left, lean, top bow, bottom bow.
const frameProfiles = {
  'igrovye-kompleksy': [36, 76, 44, 68, 3, 10, -8],
  'vysotnye-igrovye-kompleksy': [84, 84, 24, 24, 0, -12, 6],
  'ploshchadki-dlya-doshkolnikov': [88, 64, 86, 58, -3, 8, 10],
  'lazatelnye-kompleksy': [28, 64, 28, 72, 7, -8, -6],
  'kanatnye-kompleksy': [60, 26, 68, 30, -6, 12, -12],
  'detskie-karuseli': [92, 88, 96, 84, 0, 6, -8],
  'vorkaut-ploshchadki': [18, 24, 20, 30, 2, -8, 6],
  'parkur-ploshchadki': [22, 78, 22, 78, 7, 12, -10],
  'polosy-prepyatstviy': [54, 30, 76, 22, -7, -12, 12],
  'ulichnye-trenazhery': [72, 34, 28, 62, 4, 8, 10],
  'oborudovanie-dlya-funktsionalnogo-treninga': [34, 70, 62, 24, -4, -10, -6],
  'detskie-sportivnye-kompleksy': [80, 40, 80, 40, 5, 6, -12],
  'malye-arhitekturnye-formy': [30, 90, 46, 22, 0, 12, 8],
  'ulichnaya-mebel': [56, 54, 36, 72, -2, -6, 12],
  'skameyki': [24, 26, 62, 64, 4, 10, -4],
  'navesy-i-pergoly': [96, 92, 22, 36, -3, -14, 6],
  'veloparkovki': [64, 22, 28, 84, 6, 6, -10],
  'urny': [40, 42, 76, 80, -5, -8, 8],
  'ploshchadki-dlya-sobak': [74, 48, 90, 32, 3, 10, -12],
};

function contour([tl, tr, br, bl, lean, topBow, bottomBow], inset) {
  const left = 22 + inset;
  const right = 578 - inset;
  const top = 22 + inset;
  const bottom = 618 - inset;
  return `M ${left + tl} ${top}
    C 210 ${top + topBow} 390 ${top - topBow / 2} ${right - tr} ${top + lean}
    Q ${right} ${top + lean} ${right} ${top + tr}
    C ${right - lean} 210 ${right + lean} 430 ${right} ${bottom - br}
    Q ${right} ${bottom} ${right - br} ${bottom}
    C 390 ${bottom + bottomBow} 210 ${bottom - bottomBow / 2} ${left + bl} ${bottom - lean}
    Q ${left} ${bottom - lean} ${left} ${bottom - bl}
    C ${left + lean} 430 ${left - lean} 210 ${left} ${top + tl}
    Q ${left} ${top} ${left + tl} ${top} Z`;
}

for (const [slug, profile] of Object.entries(frameProfiles)) {
  equipmentFrames[slug] = [contour(profile, 0), contour(profile, 8)];
}
