import type { D1Database } from '@cloudflare/workers-types';

export interface DBClient {
  query(sql: string, params?: any[]): Promise<any[]>;
  queryOne(sql: string, params?: any[]): Promise<any>;
  execute(sql: string, params?: any[]): Promise<{ success: boolean }>;
}

function getLocalClient(): DBClient {
  const Database = require('better-sqlite3');
  const db = new Database('./dev.db');
  
  return {
    async query(sql: string, params: any[] = []) {
      const stmt = db.prepare(sql);
      return stmt.all(...params);
    },
    async queryOne(sql: string, params: any[] = []) {
      const stmt = db.prepare(sql);
      return stmt.get(...params) || null;
    },
    async execute(sql: string, params: any[] = []) {
      const stmt = db.prepare(sql);
      const result = stmt.run(...params);
      return { success: result.changes > 0 };
    }
  };
}

function getD1Client(env: { DB: D1Database }): DBClient {
  return {
    async query(sql: string, params: any[] = []) {
      const result = await env.DB.prepare(sql).bind(...params).all();
      return result.results;
    },
    async queryOne(sql: string, params: any[] = []) {
      const result = await env.DB.prepare(sql).bind(...params).first();
      return result;
    },
    async execute(sql: string, params: any[] = []) {
      const result = await env.DB.prepare(sql).bind(...params).run();
      return { success: result.success };
    }
  };
}

let localClientInstance: DBClient | null = null;

export async function getDB(env?: { DB: D1Database }): Promise<DBClient> {
  if (env && env.DB) {
    return getD1Client(env);
  }
  
  if (!localClientInstance) {
    localClientInstance = getLocalClient();
  }
  return localClientInstance;
}