const _downloadBlob = (blob, fileName) => {
    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    const blobUrl = window.URL.createObjectURL(blob);
    anchor.href = blobUrl;
    anchor.download = fileName;
    anchor.click();
    window.URL.revokeObjectURL(blobUrl);
    anchor.remove();
};

const dowwloadJSON = (json, fileName) => {
    const blob = new Blob([JSON.stringify(json)], {
        type: "application/json",
    });
    _downloadBlob(blob, fileName);
};

export { dowwloadJSON };
