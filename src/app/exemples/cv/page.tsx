import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function FrenchCVExamplesPage() {
  const language: Language = 'fr'
  return <ExamplesOverviewPage type="cv" language={language} />
}
