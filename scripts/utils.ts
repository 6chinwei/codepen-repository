import { Pen } from 'codepen-fetcher';
import fs from 'fs/promises';

export async function cleanFolder(folderUrl: URL): Promise<void> {
  await fs.rm(folderUrl, { recursive: true, force: true });
  await fs.mkdir(folderUrl);

  return console.log(`Clean folder: ${folderUrl.pathname}`);
}

export async function createFolder (folderUrl: URL): Promise<void> {
  await fs.mkdir(folderUrl);

  return console.log(`Create folder: ${folderUrl.pathname}`);
}

export async function saveFile(fileName: string, folderUrl: URL, content: string): Promise<void> {
  const fileUrl = new URL(`./${fileName}`, folderUrl);

  await fs.writeFile(fileUrl, content);

  return console.log(`Save file: ${fileUrl.pathname}`);
}

export function saveReadme (pen: Pen, folderUrl: URL): Promise<void> {
  const content = `# ${pen.title}\n\n${pen.description?.source?.body}`;
  const fileName = 'README.md';

  return saveFile(fileName, folderUrl, content);
}

export function saveHtml (pen: Pen, folderUrl: URL): Promise<void> {
  const content = pen.config?.html;

  if (content) {
    const fileName = 'index.html';

    return saveFile(fileName, folderUrl, content);
  }

  return Promise.resolve();
}

export function saveHtmlHead (pen: Pen, folderUrl: URL): Promise<void> {
  const content = pen.config?.head;

  if (content) {
    const fileName = 'head.html';

    return saveFile(fileName, folderUrl, content);
  }

  return Promise.resolve();
}

export function saveCss (pen: Pen, folderUrl: URL): Promise<void> {
  const content = pen.config?.css;

  if (content) {
    const fileExtension = pen.config?.cssPreProcessor === 'scss' ? 'scss' : 'css';
    const fileName = `style.${fileExtension}`;

    return saveFile(fileName, folderUrl, content);
  }

  return Promise.resolve();
}

export function saveJs (pen: Pen, folderUrl: URL): Promise<void> {
  const content = pen.config?.js;

  if (content) {
    const fileExtension = pen.config?.jsPreProcessor === 'typescript' ? 'ts' : 'js';
    const fileName = `script.${fileExtension}`;

    return saveFile(fileName, folderUrl, content);
  }

  return Promise.resolve();
}
