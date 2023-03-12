This project is built using **React 18**, **Vite 4**, **TypeScript**, and **SASS modules**.

### Getting Started

- `npm install` (or `pnpm install` or `yarn install`)
- To run the project locally, use `npm run dev`

---

**Pexels Key**: To obtain the card photos from Pexels, a Pexels API key is required. Please, follow these steps:

- Create an account on www.pexels.com
- Request an API Key
- Create an env.local file with `VITE_PEXEL_API_KEY = "your_key"`

### Folder structure

- **Components**: normal components that can be used on pages.
- **Foundations**: reusable components such as buttons or text that can be used throughout the application.
- **Hooks**: custom hooks used to fetch data or handle logic that can be reused throughout the components.
- **Utils**: functions that can be used whenever they are needed.

### Features

- Simple login without a password.
- Retrieves cards from the Pexels API to show random images.
- Implements card memory game logic.
- Tracks time.
- Saves the user, game, and score to local storage so that the game can be resumed after the page is closed.
- Creates a ranking for every game for every user.
- Makes use of the Context API so that different data between board, cards, and score does not need to be handled.

### Demo Picture

![image](https://user-images.githubusercontent.com/59425374/224563887-63818ccd-af1f-4abb-a112-dc041e7de6c4.png)
