import type { BaseFilter } from './baseFilter'

export interface MessagesFilter extends BaseFilter {
  messageId: string
}
