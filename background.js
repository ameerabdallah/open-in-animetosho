// Description: This script is run in the background and is responsible for creating the context menu item and opening the Anime Tosho page
// when the context menu item is clicked.

const nyaaUrlToAnimetoshoUrl = (url) => {
    return `https://animetosho.org/view/.n${url.split('/').pop()}`;
}

const properties = {
    type: "normal",
    title: "Open in AnimeTosho",
    id: "open-in-animetosho",
};

const anyUrlPatterns = ["http://*/*", "https://*/*"];
chrome.contextMenus.create({
    ...properties,
    id: properties.id + "-link",
    contexts: ["link"],
    targetUrlPatterns: anyUrlPatterns,
    documentUrlPatterns: anyUrlPatterns
});

const nyaaUrlPattern = "*://nyaa.si/view/*";
chrome.contextMenus.create({
    ...properties,
    id: properties.id + "-page",
    contexts: ["page"],
    targetUrlPatterns: [nyaaUrlPattern],
    documentUrlPatterns: [nyaaUrlPattern]
});

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === properties.id + "-link" || info.menuItemId === properties.id + "-page") {
        const nyaaUrl = info.linkUrl || info.pageUrl;
        chrome.tabs.create({ url: nyaaUrlToAnimetoshoUrl(nyaaUrl) });
    }
});
