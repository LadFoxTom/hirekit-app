import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function GreekLetterExamplesPage() {
  const language: Language = 'el'
  return <ExamplesOverviewPage type="letter" language={language} />
}
