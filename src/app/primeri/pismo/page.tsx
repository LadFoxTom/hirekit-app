import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function SerbianLetterExamplesPage() {
  const language: Language = 'sr'
  return <ExamplesOverviewPage type="letter" language={language} />
}
