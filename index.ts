import InecScriptDownloader from "./script";

const downloader = new InecScriptDownloader();

const state = 'Ekiti';

downloader.downloadPollingUnits(state).then(() => {
    console.log(`Completed ${state}`);
});


// Awka Ibom
// Bauchi