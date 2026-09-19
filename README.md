# TOM-DAR

Prosta strona główna: React + TypeScript + Vite, zwykły CSS. Jedyna dodatkowa biblioteka aplikacji to `lucide-react` (ikony).

## Uruchomienie

```sh
npm install
npm run dev
```

- `npm run build` — sprawdzenie TypeScript i gotowa strona w `dist/`.
- `npm run preview` — podgląd wersji produkcyjnej.
- `npm run format` — formatowanie Prettierem.
- `npm run format:check` — sprawdzenie formatowania.

## Pliki

- `index.html` — tytuł, opis i punkt wejścia.
- `src/main.tsx` — uruchomienie Reacta.
- `src/App.tsx` — składanie strony głównej.
- `src/components/` — nagłówek, sekcje i informacje rozwijane.
- `src/content/` — treści i mapy grafik.
- `src/styles.css` — wszystkie style i responsywność.
- `public/assets/` — zachowane grafiki, katalogi i lekkie obrazy WebP.
- `reference/original/` — archiwum starej witryny i raport brakujących katalogów.
- `scripts/archive-*.py` — pomocnicze skrypty archiwizacji, niezależne od aplikacji.

Menu używa natywnego elementu `dialog`, a rozwijane odpowiedzi `details`/`summary`. Nie ma Cloudflare, Sites, Next.js, Vinext, baz danych, Tailwinda ani biblioteki komponentów UI. Nie ma jeszcze routingu: kategorie odsyłają do istniejących podstron TOM-DAR.

## GitHub Pages

Strona: https://mgcodesolutionsmichalgajewski.github.io/tomdar/

Push do `main` uruchamia budowanie i publikację przez GitHub Actions.
W Settings → Pages źródło publikacji powinno być ustawione na GitHub Actions.
Vite używa ścieżki `/tomdar/`, także lokalnie.
