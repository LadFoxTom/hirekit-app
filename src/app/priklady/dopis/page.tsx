import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function CzechLetterExamplesPage() {
  const language: Language = 'cs'
  return <ExamplesOverviewPage type="letter" language={language} />
}
