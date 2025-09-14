// Helper to access env vars in both client and server
import { env as serverEnv } from './server.mjs';
import { env as clientEnv } from './client.mjs';

export const STATUS_API_TOKEN = serverEnv.STATUS_API_TOKEN || (clientEnv && (clientEnv as any).NEXT_PUBLIC_STATUS_API_TOKEN) || '';
