import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function CzechCVExamplesPage() {
  const language: Language = 'cs'
  return <ExamplesOverviewPage type="cv" language={language} />
}
