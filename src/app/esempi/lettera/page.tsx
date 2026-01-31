import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function ItalianLetterExamplesPage() {
  const language: Language = 'it'
  return <ExamplesOverviewPage type="letter" language={language} />
}
