import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function DanishCVExamplesPage() {
  const language: Language = 'da'
  return <ExamplesOverviewPage type="cv" language={language} />
}
