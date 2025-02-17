# Uruchamianie testów lokalnie

Ten projekt zawiera testy automatyczne napisane za pomocą frameworka Playwright. Aby uruchomić testy lokalnie, wykonaj następujące kroki:

## Wymagania

*   Node.js - [Pobierz Node.js](https://nodejs.org/)
*   npm - npm jest instalowany razem z Node.js
*   Playwright - zainstaluj go za pomocą komendy `npm install -D @playwright/test`

## Instalacja

1.  Sklonuj repozytorium: `git clone https://github.com/TwojLogin/todo-app.git`
2.  Przejdź do katalogu projektu: `cd todo-app`

## Uruchamianie testów

1.  Uruchom testy za pomocą komendy: `npx playwright test`
2.  Aby uruchomić testy w trybie debugowania (z podglądem przeglądarki), użyj komendy: `npx playwright test --debug`
3.  Aby uruchomić konkretny test, użyj komendy: `npx playwright test tests/todo.spec.ts`
4.  Aby wygenerować raport HTML z testów, użyj komendy: `npx playwright test --reporter=html`
5.  Otwórz raport HTML w przeglądarce, użyj komendy: `npx playwright show-report`

## Dodatkowe informacje

*   Konfiguracja Playwright znajduje się w pliku `playwright.config.ts`
*   Testy znajdują się w folderze `tests`

## Opis testów

*   `todo.spec.ts` - zawiera testy dla funkcjonalności dodawania, edycji, usuwania i filtrowania zadań oraz interakcji z checkboxem.