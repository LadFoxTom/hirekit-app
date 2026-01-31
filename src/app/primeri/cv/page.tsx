import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function SerbianCVExamplesPage() {
  const language: Language = 'sr'
  return <ExamplesOverviewPage type="cv" language={language} />
}
