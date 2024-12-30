# codepen-repository

A backup of the source code of my CodePen projects.
  
Folder structure:
- [`pens`](./pens): A backup of the source code of each pen. All of them are generated automatically!
- [`scripts`](./scripts): Scripts to download source code from CodePen and generate the `README.md`.
  
This project uses [codepen-fetcher](https://github.com/6chinwei/codepen-fetcher/) to download pens.

### Usage (Manually)
1. Git clone the repository.
2. Check the configuration in `./scripts/config.js`.
3. Run the following command:
   ```bash
   $ npm run download
   ```
   All pens will be downloaded to the `./pens` directory.
4. Commit the file changes to Git.
