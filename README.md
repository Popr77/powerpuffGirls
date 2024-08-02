# Powerpuff Girls

## Project Details

This project is a Vue 3 application with Vite that showcases details about the TV show "Powerpuff Girls." The application features two main pages:

1. **TV Show Details Page:** Displays detailed information about the "Powerpuff Girls" TV show.
2. **Episode Details Page:** Shows details of a chosen episode from the show.

### Additional Features

1. **State Management:** The project uses Pinia for state management to handle and maintain the application's state effectively.
2. **Deployed on Netlify:** The application is deployed on Netlify, allowing easy access and sharing: https://clinquant-cassata-67e1da.netlify.app/

### Routes

- **/:** Displays details of the "Powerpuff Girls" TV show by default.
- **/show/:showName:** Displays details of the TV show specified by the name route parameter.
- **/episode/:episodeId:** Displays details of the specified episode from the specified TV show.

### Dependencies

**Vue 3:** The progressive JavaScript framework used for building the user interface.

**Vite:** The build tool used for the project, offering fast and optimized development.

**Pinia:** A state management library for Vue, providing a simple and effective way to manage state.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
