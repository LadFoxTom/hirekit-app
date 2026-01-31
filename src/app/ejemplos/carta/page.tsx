import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function SpanishLetterExamplesPage() {
  const language: Language = 'es'
  return <ExamplesOverviewPage type="letter" language={language} />
}
