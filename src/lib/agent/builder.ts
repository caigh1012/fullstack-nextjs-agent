import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { BaseCheckpointSaver, END, START, StateGraph } from '@langchain/langgraph';
import { MessagesAnnotation } from '@langchain/langgraph';

export interface AgentConfigOptions {
  model?: string;
  provider?: string; // 'google' | 'openai' etc.
  systemPrompt?: string; // system prompt override
  tools?: unknown[]; // tools from registry or direct tool objects
  approveAllTools?: boolean; // if true, skip tool approval prompts
}

export class AgentBuilder {
  private readonly model: BaseChatModel;
  private checkpointer?: BaseCheckpointSaver;

  constructor({ llm, checkpointer }: { llm: BaseChatModel; checkpointer?: BaseCheckpointSaver }) {
    if (!llm) {
      throw new Error('Language model (llm) is required');
    }
    this.model = llm;
    this.checkpointer = checkpointer;
  }

  private async callModel(state: typeof MessagesAnnotation.State) {
    if (!this.model || !this.model.bindTools) {
      throw new Error('Invalid or missing language model (llm)');
    }

    const messages = [...state.messages];

    const response = await this.model.invoke(messages);
    return { messages: response };
  }

  build() {
    const stateGraph = new StateGraph(MessagesAnnotation);
    stateGraph.addNode('agent', this.callModel.bind(this)).addEdge(START, 'agent').addEdge('agent', END);
    const compiledGraph = stateGraph.compile({ checkpointer: this.checkpointer });
    return compiledGraph;
  }
}
