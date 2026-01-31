import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function GermanLetterExamplesPage() {
  const language: Language = 'de'
  return <ExamplesOverviewPage type="letter" language={language} />
}
