import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function BulgarianCVExamplesPage() {
  const language: Language = 'bg'
  return <ExamplesOverviewPage type="cv" language={language} />
}
