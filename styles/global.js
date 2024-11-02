const styleSheet = `
    body {
        align-items: stretch;
        display: flex;
        justify-content: space-between;
        margin: 0;
        width: 100%;
    }
    aside {
        height: 100vh;
        overflow: auto;
        width: 25%;
    }
    main {
        width: 75%;
    }
    @media (max-width: 600px) {
        body {
            flex-direction: column;
        }
        aside: {
            height: auto;
            width: 100%;
        }
    }
`;

let isStyleSheetAdded = false;

const addGlobalStyles = () => {
    const { promise, resolve } = Promise.withResolvers();
    if (!isStyleSheetAdded) {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = styleSheet;
        document.body.appendChild(styleElement);
        isStyleSheetAdded = true;
    }
    resolve();
    return promise;
};

let globalStyleSheets;

const getGlobalStyleSheets = () => {
    if (!globalStyleSheets) {
        globalStyleSheets = Array.from(document.styleSheets).map(styleSheetObject => {
            try {
                const cssStyleSheet = new CSSStyleSheet();
                const style = Array.from(styleSheetObject.cssRules).map(({ cssText }) => cssText).join(" ");
                cssStyleSheet.replaceSync(style);
                return cssStyleSheet;
            } catch (e) {
                return null;
            }
        }).filter(item => !!item);
    }
    return globalStyleSheets;
};

export { addGlobalStyles, getGlobalStyleSheets };
