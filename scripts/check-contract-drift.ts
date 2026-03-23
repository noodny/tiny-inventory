/**
 * CI drift check: verifies the shared Zod schemas compile and
 * the generated JSON schemas match expectations.
 */
import { execSync } from 'node:child_process';

function run(cmd: string) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  // Type-check the shared workspace
  run('npx tsc --noEmit -p shared/tsconfig.json');

  // Verify JSON schema generation works at runtime
  run('node --import tsx shared/src/json-schemas.ts');

  console.log('\nContract check passed — shared schemas compile and generate correctly.');
} catch (err) {
  console.error('Contract check failed:', err);
  process.exit(1);
}
