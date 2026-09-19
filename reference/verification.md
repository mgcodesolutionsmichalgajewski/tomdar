# Weryfikacja — 19.09.2026

- `npm run build`: zakończone poprawnie.
- `npx tsc --noEmit`: zakończone poprawnie.
- Jedyna zaimplementowana trasa: `/`.
- Układ sprawdzony w przeglądarce przy szerokości 1440, 390 i 320 px; brak poziomego przepełnienia.
- Obrazy widoczne na stronie ładują się poprawnie; nie wykryto uszkodzonych obrazów.
- Wszystkie odnośniki sekcyjne mają istniejące cele.
- Akordeon otwiera wybraną odpowiedź i zamyka poprzednią; prawidłowe `aria-expanded`.
- Menu mobilne otwiera się, zamyka i zawiera etykietę oraz opis dla czytnika ekranu. Poprawiono przywracanie fokusu podczas nawigacji, aby nie przerywało przewijania do sekcji.
- Konsola sprawdzonego podglądu: bez błędów i ostrzeżeń aplikacji.
- Zweryfikowano integralność wszystkich 190 unikalnych plików źródłowych względem SHA-256 w manifeście; brak rozbieżności.
- Archiwum: 59 różnych dokumentów HTML; 7 zewnętrznych katalogów niedostępnych. Szczegóły w `original/ARCHIVE.md`.

Nie przeprowadzono pełnego audytu WCAG ani testów na fizycznych urządzeniach. Strona nie jest opublikowana; lokalny podgląd działa na porcie 5173.
