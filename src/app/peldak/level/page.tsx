import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function HungarianLetterExamplesPage() {
  const language: Language = 'hu'
  return <ExamplesOverviewPage type="letter" language={language} />
}
