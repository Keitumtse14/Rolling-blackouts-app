import z from "zod";

export const serverSchema = z.object({
  STATUS_API_TOKEN: z.string().min(1), // required string
});

// Compute env and token, export once at bottom
let env = null;
let STATUS_API_TOKEN = undefined;

if (process.env.MOCK_MODE === 'true') {
  console.warn('⚠️ MOCK_MODE is enabled; skipping STATUS_API_TOKEN validation.');
  env = { ...process.env };
  STATUS_API_TOKEN = env.STATUS_API_TOKEN;
} else {
  // Use safeParse so we can print helpful diagnostics at runtime
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const formatErrors = (err) => {
      try {
        return JSON.stringify(err.format(), null, 2);
      } catch (e) {
        return String(err);
      }
    };
    console.error('❌ Environment validation failed. Current relevant env:');
    console.error('  NODE_ENV=', process.env.NODE_ENV || 'undefined');
    console.error('  STATUS_API_TOKEN=', process.env.STATUS_API_TOKEN ? '[REDACTED]' : 'missing/empty');
    console.error('Validation errors:\n', formatErrors(parsed.error));
    throw new Error('Invalid environment variables');
  }

  env = parsed.data;
  STATUS_API_TOKEN = env.STATUS_API_TOKEN;
}

export { env, STATUS_API_TOKEN };
