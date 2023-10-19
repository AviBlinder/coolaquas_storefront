# coolaquas-storyblok-vue3

## Technology Stack:

### Frontend:

- Vue 3 + Composition API
- TailwindCSS/TailwindUI
- Auth custom flows: new views (SingUp/SignIn) + related components

### Backend Content:

- Storyblok (Space: Coolaquas-Store)

### Backend Services:

- AWS Services:
  - Cognito (including customized emails)
  - Lambda (triggered by Cognito events)
  - Amplify + GraphQL + DynamoDB tables (Users and Orders)

### Configuration files:

- Storyblok + Paypal
  .env
- Amplify Setup:
  src/aws-exports.js

````
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
````
