import { fetchPensByUserId, Pen } from 'codepen-fetcher';
import config from './config';
import {
  cleanFolder,
  createTableOfContents,
  createFolder,
  saveReadme,
  saveHtml,
  saveHtmlHead,
  saveCss,
  saveJs
} from './utils';

console.time('Time taken');

// Fetch pens by a user
const userId = config.userId;
const options = config.options;
const pens: Pen[] = await fetchPensByUserId(userId, options).catch((error) => {
  console.error(`Can not fetch pens by user id: ${userId}`, error);

  process.exit(1);
});
const pensFolderUrl = new URL('../pens/', import.meta.url);

await cleanFolder(pensFolderUrl);

const penPromises = pens.map(async (pen) => {
  const penFolderUrl = new URL(`./${pen.id}/`, pensFolderUrl);

  await createFolder(penFolderUrl);

  return Promise.all([
    saveReadme(pen, penFolderUrl),
    saveHtml(pen, penFolderUrl),
    saveHtmlHead(pen, penFolderUrl),
    saveCss(pen, penFolderUrl),
    saveJs(pen, penFolderUrl)
  ]);
});

await createTableOfContents(pens, pensFolderUrl);
await Promise.all(penPromises);

console.log('--');
console.log(`${pens.length} pens have been downloaded successfully.`);
console.timeEnd('Time taken');
