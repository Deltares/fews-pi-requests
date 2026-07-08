import type { BaseFilter } from './baseFilter'

export interface MessagesFilter extends BaseFilter {
  topicId: string
  messageId: string
}
