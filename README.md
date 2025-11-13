## ConverterStart

github-pages - https://anastasiyamav.github.io/Converter/

Небольшое Vite + React (TS) приложение со стилизованными UI‑компонентами (`styled-components`), включая `Textarea`, `Select`, `Input`, кнопку и глобальные стили.

### Требования

- Node.js 18+ (Vite 5 рекомендуется на Node 18 и выше)
- npm 9+ (или pnpm/yarn по желанию)

### Установка и запуск

```bash
npm install
npm run dev
```

Откройте приложение по адресу, который выведет Vite (обычно `http://localhost:5173`).

### Скрипты

- `npm run dev` — локальная разработка (Vite dev server)
- `npm run build` — сборка продакшн‑бандла (`tsc -b && vite build`)
- `npm run preview` — предпросмотр собранного билда
- `npm run eslint:lint` — проверка ESLint
- `npm run prettier:lint` — проверка форматирования Prettier
- `npm run prettier:fix` — авто‑форматирование Prettier
- `npm run lint` — ESLint + Prettier check

### Технологии

- React 19, React DOM 19
- TypeScript 5
- Vite 5
- styled-components 5
- nanostores

### Структура проекта (основное)

```text
src/
  components/
    Textarea/
    Select/
    Input/
    Spinner/
    ProgressBar/
  hooks/
  stores/
  utils/
  App.tsx
  main.tsx
```

### Глобальные стили

Глобальные стили можно подключать через `styled-components` (`createGlobalStyle`) или через `index.css`.

Пример `createGlobalStyle`:

```ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }
`;
```

И подключение (например, в `main.tsx`):

```tsx
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<>
			<GlobalStyle />
			<App />
		</>
	</StrictMode>
);
```

### Компоненты

- `Textarea` — поддерживает размеры (`sm|md|lg`), режимы изменения размера (`manual|auto|fixed`), авто‑высоту, лейбл и счётчик символов.
- `Select`, `Input`, `Spinner`, `ProgressBar` — стилизованные компоненты на базе `styled-components`.
- Кнопка (`CustomButton`) — пример в `src/stylesMain.ts`.

### Полезные заметки

- Для корректной работы абсолютного позиционирования задавайте родителю `position: relative` и ограничивайте высоту/ширину контейнеров.
- Для переноса длинного текста внутри блоков используйте: `white-space: normal; word-break: break-word; overflow-wrap: anywhere;`.
- Для вертикального скролла ограничивайте высоту (`height`/`maxHeight`) и добавляйте `overflow-y: auto`.

### Лицензия

Внутренняя учебная заготовка. Используйте свободно внутри команды.
