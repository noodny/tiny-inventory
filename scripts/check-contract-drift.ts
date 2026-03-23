/**
 * CI drift check: verifies generated contract artifacts are up-to-date.
 *
 * Runs prisma generate + frontend schema generation, then checks
 * if any generated files differ from what's committed.
 */
import { execSync } from 'node:child_process';

function run(cmd: string) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  // Regenerate all artifacts
  run('npm run generate:contracts');

  // Check for uncommitted changes in generated directories
  const diff = execSync(
    'git diff --name-only -- backend/src/generated/ frontend/src/generated/',
    { encoding: 'utf-8' },
  ).trim();

  // Check for untracked files in generated directories
  const untracked = execSync(
    'git ls-files --others --exclude-standard -- backend/src/generated/ frontend/src/generated/',
    { encoding: 'utf-8' },
  ).trim();

  const staleFiles = [diff, untracked].filter(Boolean).join('\n');

  if (staleFiles) {
    console.error('\nContract drift detected! The following generated files are stale:\n');
    console.error(staleFiles);
    console.error('\nRun "npm run generate:contracts" and commit the updated files.\n');
    process.exit(1);
  }

  console.log('\nNo contract drift detected — generated files are up-to-date.');
} catch (err) {
  console.error('Drift check failed:', err);
  process.exit(1);
}
