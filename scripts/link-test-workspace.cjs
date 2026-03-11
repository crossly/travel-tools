const fs = require('fs');
const path = require('path');

const root = process.cwd();
const testNodeModules = path.join(root, '.test-dist', 'node_modules', '@travel-tools');

const links = {
  shared: {
    'site.js': "module.exports = require('../../../packages/shared/src/site.js');\n",
    'storage.js': "module.exports = require('../../../packages/shared/src/storage.js');\n",
    'currencies.js': "module.exports = require('../../../packages/shared/src/currencies.js');\n",
    'fx.js': "module.exports = require('../../../packages/shared/src/fx.js');\n",
    'version.js': "module.exports = require('../../../packages/shared/src/version.js');\n",
  },
  i18n: {
    'index.js': "module.exports = require('../../../packages/i18n/src/index.js');\n",
  },
  ui: {
    'index.js': "module.exports = require('../../../packages/ui/src/index.js');\n",
  },
};

for (const [pkg, files] of Object.entries(links)) {
  const dir = path.join(testNodeModules, pkg);
  fs.mkdirSync(dir, { recursive: true });
  for (const [filename, contents] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, filename), contents);
  }
}
