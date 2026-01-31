import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function PolishLetterExamplesPage() {
  const language: Language = 'pl'
  return <ExamplesOverviewPage type="letter" language={language} />
}
