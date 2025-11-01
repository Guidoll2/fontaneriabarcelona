import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  const p = require.resolve('tailwindcss', { paths: ['C:\\Users\\Guido\\Documents\\Web Development\\Projects\\fontanerialowcost\\node_modules'] });
  console.log(p);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
