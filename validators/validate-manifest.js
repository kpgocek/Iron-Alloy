const fs = require('fs');
const path = require('path');
const semver = require('semver');

const manifestPath = path.resolve(__dirname, '../manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const required = ['name','version','minAppVersion','description','author'];

for (const field of required) {
  if (!manifest[field]) {
    console.error(`Missing required field: ${field}`);
    process.exit(1);
  }
}

if (!semver.valid(manifest.version)) {
  console.error("Version must follow semantic versioning (x.y.z)");
  process.exit(1);
}

if (!semver.valid(manifest.minAppVersion)) {
  console.error("minAppVersion must follow semantic versioning");
  process.exit(1);
}

console.log("Manifest validation passed");