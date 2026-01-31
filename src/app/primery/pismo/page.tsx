import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function BulgarianLetterExamplesPage() {
  const language: Language = 'bg'
  return <ExamplesOverviewPage type="letter" language={language} />
}
