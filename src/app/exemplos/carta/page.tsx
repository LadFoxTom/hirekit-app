import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function PortugueseLetterExamplesPage() {
  const language: Language = 'pt'
  return <ExamplesOverviewPage type="letter" language={language} />
}
