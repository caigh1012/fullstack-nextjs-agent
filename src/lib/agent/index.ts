import { AgentBuilder, AgentConfigOptions } from './builder';
import { postgresCheckpointer } from './memory';
import { createChatModel, DEFAULT_MODEL_NAME, DEFAULT_MODEL_PROVIDER } from './utils';

let setupPromise: Promise<void> | null = null;

/**
 * 需要等待数据初始化完成
 */
async function setupOnce() {
  if (!setupPromise) {
    setupPromise = postgresCheckpointer.setup().catch((err) => {
      setupPromise = null;
      console.error('Failed to setup postgres checkpointer:', err);
      throw err;
    });
  }
  await setupPromise;
}

async function createAgent(cfg?: AgentConfigOptions) {
  const provider = cfg?.provider || DEFAULT_MODEL_PROVIDER; // 提供商
  const modelName = cfg?.model || DEFAULT_MODEL_NAME; // 模型名称

  const llm = createChatModel({ provider, model: modelName, temperature: 1 });

  const agent = new AgentBuilder({
    llm,
    checkpointer: postgresCheckpointer,
  }).build();

  return agent;
}

// 如果其他地方需要明确的准备，则为公共帮助者。
async function ensureAgent(cfg?: AgentConfigOptions) {
  // 在返回代理实例之前确保检查点已准备好
  await setupOnce();
  return createAgent(cfg);
}

// 使用环境默认值在模块加载时急切地创建默认代理。
export const defaultAgent = await ensureAgent();
