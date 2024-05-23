#NewsAdvertising

This project is a news advertising application developed with Vite, React and Express.

## Environment Variables

Make sure to set the following environment variables in a `.env` file in the project root:

\```env
### News site (options: reuters, elpais, cnn)
VITE_SITE=site

### Home page URL
WEB_URL=page_url

### Specific page
VITE_PAGE_LOAD=specific_page

### GraphQL API URL
VITE_GRAPHQL_API_URL=api_url
\```

Example:

\```env
VITE_SITE=reuters
WEB_URL=https://www.reuters.com/
VITE_PAGE_LOAD=business/
VITE_GRAPHQL_API_URL=https://....
\```

## Facility

1. Clone this repository.
2. Install dependencies using `npm`:

\```bash
npm install
\```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Run the application in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Build the application for production in the `dist` folder.

### `npm run build:client`

Build the client part for production in the `dist/client` folder.

### `npm run build:server`

Build the server part for production in the `dist/server` folder.

### `npm run preview`

Provides for the application being built in production mode.



## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
