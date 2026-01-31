import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function FrenchLetterExamplesPage() {
  const language: Language = 'fr'
  return <ExamplesOverviewPage type="letter" language={language} />
}
