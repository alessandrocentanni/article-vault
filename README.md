This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## TODOs

- [x] Setup the project with plasmo
- [x] Add tailwind for styling
- [x] Create a basic mockup of the popup
- [x] Implement html content scraping for the page
- [x] Store data to Oramasearch upon scraping
- [x] Search data from Oramasearch
- [x] Improve both error handling and success conditions
- [x] Allow the possibility to remove a search result from the popup
- [x] Better error handling
- [ ] Improve the readme with more detailed instructions about what's the project about and how to run it
- [ ] Check for the deployment status, possibly polling it every 5 seconds
- [ ] Avoid storing the same data multiple times

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
