# VOIS IoT Software Engineering Front End Technical Assessment - Dynamic Form

* This project is a React.js appliaction built as a technical assignment. It creates a dynamic form based on a server mocked response (schema) with validation also dynamically created throught this schema, the application submits this form to a mock api [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and shows a confirmation message on submission. It implements both light and dark themes, the application also persists the state to the local storage using a custom hook, and supports multiple special input types like:
- A Date picker
- Upload file

* In this project I worked hard to design resuable components and to make the code as clear and as readable as possible, I also gave the UX it's fair share of thinking to make sure bulding the multi-step form is as smooth and rich with UI elements that enhances the user expirence. The code is modular and as clean as possible with unit tests for all the input fields and the Factory that renders them.

* You can find a hosted demo [here](https://vois-frontend-technical-assessment-48g73u16i.vercel.app/)

## Tech Stack
- TypeScript.
- React.
- Tailwindcss.
- Jest.
- React Router.
- yarn.

## Delivered by Eslam Wael Reda

### Getting started 

#### 1. Clone this repo 
```bash
gti clone https://github.com/eslamwaeldev/VOIS-frontend-technical-assessment.git
cd VOIS-frontend-technical-assessment
```
#### 2. Install node modules with yarn or npm
- Using yarn
```bash
yarn
```
- Or using NPM
```bash
npm install
```

#### 3. Run the project
- Using yarn
```bash
yarn dev
```
- Or using NPM
```bash
npm run dev
```
Then visit:
* [http://localhost:5173](http://localhost:5173)
