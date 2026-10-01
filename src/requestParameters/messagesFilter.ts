import type { BaseFilter } from './baseFilter.js'

export interface MessagesFilter extends BaseFilter {
  topicId: string
  messageId: string
}
