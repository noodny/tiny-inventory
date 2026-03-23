/**
 * Generates frontend Zod schemas from the Prisma-generated JSON Schema.
 *
 * Pipeline: Prisma schema -> prisma-json-schema-generator -> JSON Schema -> this script -> Zod schemas
 *
 * This keeps Prisma as the single source of truth while producing
 * frontend-compatible Zod code with no @prisma/client dependency.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const JSON_SCHEMA_PATH = path.resolve(
  __dirname,
  '../backend/src/generated/json-schema/json-schema.json',
);
const OUTPUT_PATH = path.resolve(__dirname, '../frontend/src/generated/zod/index.ts');

// Fields that are auto-generated and should be omitted from Create schemas
const AUTO_FIELDS = new Set(['id', 'createdAt', 'updatedAt']);

interface JsonSchemaProperty {
  type?: string | string[];
  format?: string;
  default?: unknown;
  $ref?: string;
  items?: { $ref?: string };
}

interface JsonSchemaDefinition {
  type: string;
  properties: Record<string, JsonSchemaProperty>;
  required?: string[];
}

function isRelationField(prop: JsonSchemaProperty): boolean {
  return !!(prop.$ref || (prop.type === 'array' && prop.items?.$ref));
}

function mapPropertyToZod(prop: JsonSchemaProperty): string {
  const nullable = Array.isArray(prop.type) && prop.type.includes('null');
  const baseType = Array.isArray(prop.type) ? prop.type.find((t) => t !== 'null')! : prop.type!;

  let zodType: string;
  switch (baseType) {
    case 'integer':
      zodType = 'z.number().int()';
      break;
    case 'number':
      // Prisma Decimal fields are serialized as strings in JSON responses
      zodType = 'z.string()';
      break;
    case 'string':
      zodType =
        prop.format === 'date-time' ? 'z.string().datetime({ offset: true })' : 'z.string()';
      break;
    case 'boolean':
      zodType = 'z.boolean()';
      break;
    default:
      zodType = 'z.unknown()';
  }

  if (nullable) zodType += '.nullable()';
  return zodType;
}

function generateModelSchemas(modelName: string, def: JsonSchemaDefinition): string {
  const requiredFields = new Set(def.required ?? []);

  // Collect data fields (skip relations)
  const dataFields: { name: string; zodType: string; required: boolean; isAuto: boolean }[] = [];
  for (const [propName, prop] of Object.entries(def.properties)) {
    if (isRelationField(prop)) continue;
    dataFields.push({
      name: propName,
      zodType: mapPropertyToZod(prop),
      required: requiredFields.has(propName),
      isAuto: AUTO_FIELDS.has(propName),
    });
  }

  // Base response schema (all fields present as returned by API)
  const baseFields = dataFields.map((f) => `  ${f.name}: ${f.zodType},`).join('\n');
  const base = `export const ${modelName}Schema = z.object({\n${baseFields}\n});\n\nexport type ${modelName} = z.infer<typeof ${modelName}Schema>;`;

  // Create schema (omit auto fields, mark optional fields with defaults)
  const createFields = dataFields
    .filter((f) => !f.isAuto)
    .map((f) => {
      const zodExpr = f.required ? f.zodType : `${f.zodType}.optional()`;
      return `  ${f.name}: ${zodExpr},`;
    })
    .join('\n');
  const create = `export const Create${modelName}Schema = z.object({\n${createFields}\n});\n\nexport type Create${modelName} = z.infer<typeof Create${modelName}Schema>;`;

  // Update schema (all user-editable fields optional)
  const update = `export const Update${modelName}Schema = Create${modelName}Schema.partial();\n\nexport type Update${modelName} = z.infer<typeof Update${modelName}Schema>;`;

  return [base, create, update].join('\n\n');
}

function main() {
  if (!fs.existsSync(JSON_SCHEMA_PATH)) {
    console.error(
      `JSON Schema not found at ${JSON_SCHEMA_PATH}. Run "npm run db:generate -w backend" first.`,
    );
    process.exit(1);
  }

  const jsonSchema = JSON.parse(fs.readFileSync(JSON_SCHEMA_PATH, 'utf-8'));
  const definitions: Record<string, JsonSchemaDefinition> = jsonSchema.definitions;

  if (!definitions || Object.keys(definitions).length === 0) {
    console.error(
      'No model definitions found in JSON Schema. Check prisma-json-schema-generator output.',
    );
    process.exit(1);
  }

  const models = Object.keys(definitions);
  const schemaBlocks = models.map((name) => generateModelSchemas(name, definitions[name]));

  const output = `// AUTO-GENERATED from Prisma JSON Schema — do not edit manually.
// Regenerate with: npm run generate:contracts
import { z } from 'zod';

${schemaBlocks.join('\n\n')}
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output);

  console.log(
    `Generated Zod schemas for: ${models.join(', ')} -> ${path.relative(process.cwd(), OUTPUT_PATH)}`,
  );
}

main();
