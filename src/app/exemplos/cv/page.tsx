import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function PortugueseCVExamplesPage() {
  const language: Language = 'pt'
  return <ExamplesOverviewPage type="cv" language={language} />
}
