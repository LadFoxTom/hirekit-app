import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function RomanianLetterExamplesPage() {
  const language: Language = 'ro'
  return <ExamplesOverviewPage type="letter" language={language} />
}
