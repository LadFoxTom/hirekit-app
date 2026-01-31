import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function FinnishLetterExamplesPage() {
  const language: Language = 'fi'
  return <ExamplesOverviewPage type="letter" language={language} />
}
