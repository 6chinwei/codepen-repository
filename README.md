# codepen-repository

- `./pens`: The source code backup of my CodePen projects.
- `./scripts`: The scripts to download source code from CodePen.

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
