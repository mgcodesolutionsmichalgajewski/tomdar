# Archiwum istniejącej strony TOM-DAR

Przegląd wykonano 19.09.2026. Odkrywanie: strona główna, robots.txt, sitemap.xml, rekurencyjnie linki HTML, arkusze CSS, wskazania obrazów w stylach i skryptach, galerie w pełnym rozmiarze oraz katalogi PDF. Nie jest to kopia całego serwera: pliki niepodlinkowane publicznie nie są odkrywalne.

## Wynik

- 67 odczytanych adresów HTML, 59 różnych dokumentów. 8 dodatkowych adresów starego szablonu zwraca treść strony głównej.
- 184 poprawne lokalne URL zasobów → 183 unikalne pliki, deduplikacja SHA-256.
- 7 dodatkowych katalogów producentów → łącznie 190 unikalnych plików źródłowych.
- 7 zewnętrznych katalogów niedostępnych (lista poniżej).
- Odpowiedzi HTML udające zdjęcia oraz błędne wskazania szablonu nie są używane jako grafiki; raport zapisuje ich adresy.

## Organizacja

`public/assets/slider/`: sześć oryginalnych zdjęć górnej galerii (`glowna`–`glowna5`). `public/assets/brand/`: logo, favicon i producenci. `products/`: grafiki kategorii. `projects/`: realizacje, pełne rozmiary i miniatury. `photos/`: pozostałe zdjęcia i materiały produktów. `catalog-covers/`: okładki katalogów. `documents/`: katalogi PDF. `icons/` i `fonts/`: oryginalne zasoby pomocnicze. `web/`: zoptymalizowane pochodne WebP do nowej strony głównej.

Zachowano oryginalne pliki bez zmian. Miniatury i pełne obrazy to różne rozdzielczości, nie kopie identycznych bajtów. Pochodne WebP mają uzasadniony cel wydajnościowy; ich źródła zapisano w `web-derivatives.json`.

## Jak znaleźć plik

- `asset-manifest.json`: źródłowy URL, ścieżka lokalna, SHA-256, typ, rozmiar i strony korzystające z zasobu.
- `page-inventory.json`: tekst i lokalny plik każdej podstrony.
- `../../content/asset-library.json` (w katalogu projektu `content/asset-library.json`): mapa strony → zasoby do wykorzystania przy przyszłym routingu.
- `pages/`: HTML referencyjny, nie uruchamiać go jako nowej strony (zawiera stare skrypty zewnętrzne).
- `styles/`: oryginalne arkusze i skrypty jako materiał referencyjny, nie importowane w aplikacji.
- `crawl-report.json` i `external-assets-report.json`: zakres, aliasy i braki.

## Niedostępne katalogi producentów

- https://d3mtmn4lo37cs8.cloudfront.net/files/katalogi/Katalogi/Katalog%20Baranski%20Premium%20wewnetrzne%202023%20-%2001_09_2023%20wer14.pdf — <urlopen error [Errno 8] nodename nor servname provided, or not known>
- https://d3mtmn4lo37cs8.cloudfront.net/files/katalogi/Katalogi/Katalog%20OPTIMO%202023_04_04%20wer2.pdf — <urlopen error [Errno 8] nodename nor servname provided, or not known>
- https://gerda.pl/wp-content/uploads/2021/02/GERDA-Katalog-Drzwi-NTT-TT-02-2021_web.pdf — URL does not return a PDF or image
- https://wiked.pl/wp-content/uploads/2023/03/KATALOG_WIKED_2022.pdf — HTTP Error 404: Not Found
- https://www.futryna.com.pl/public/media/files/katalogi/Katalog_Drzwi_2023_wer__on-line_72dpi.pdf — HTTP Error 404: Not Found
- https://www.futryna.com.pl/wp-content/uploads/2021/02/Stalprodukt_katalog-drzwi-2021_for-web_96-dpi_cmyk.pdf — HTTP Error 404: Not Found
- https://www.pol-skone.pl/katalog_lepsze_wnetrze_2023_I_PL.pdf — HTTP Error 404: Not Found
