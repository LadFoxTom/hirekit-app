import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function DanishLetterExamplesPage() {
  const language: Language = 'da'
  return <ExamplesOverviewPage type="letter" language={language} />
}
