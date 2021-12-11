<p align="center">
  <a href="https://photo-album.guswillemann.vercel.app" target="_blank" rel="noopener">
    <img alt="Photo Album card" src=".github/card-image.png" width="500" />
    <p align="center">https://photo-album.guswillemann.vercel.app</p>
  </a>
</p>

<br />

This project is the Front End Activity from [Leadster](https://leadster.com.br/) hiring process.

---

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Typescript](http://typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

---

## Project Requirements

- The project must be a photo album site;
- Should get the photos from the [Pexels API](https://www.pexels.com/api/documentation/);
- Should have responsive layout;
- Should have pagination;
- Should have a Header and a Footer;
- Should have a github repository;
- Should have a README;

---

## Running the Project Locally
- clone: 
```bash
git clone https://github.com/guswillemann/photo-album
```

- install: 
```bash
yarn install
# or
npm install
```

This project uses a environment variable for the Pexels API authorization key.

To get a key use the link: [https://www.pexels.com/api/new/](https://www.pexels.com/api/new/)

With the key in hand, set it on a `.env.local` file in the project root.

Template file available: `.example.env.local`:
```
EXTERNAL_PHOTOS_API_KEY="--> Your Key <--"
```

- initialize server: 
```bash
yarn dev
# or
npm run dev
```

- running tests: 
```bash
yarn test
# or
npm run test
```