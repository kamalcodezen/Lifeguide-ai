import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().url("MONGODB_URI must be a valid URL string."),
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required."),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL string."),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required."),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // eslint-disable-next-line no-console
  console.error(
    "❌ [Environment Validation Error] Invalid backend configuration:\n",
    JSON.stringify(parsedEnv.error.format(), null, 2)
  );
  process.exit(1);
}

export const env = parsedEnv.data;
export type Env = z.infer<typeof envSchema>;
