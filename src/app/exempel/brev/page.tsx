import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function SwedishLetterExamplesPage() {
  const language: Language = 'sv'
  return <ExamplesOverviewPage type="letter" language={language} />
}
