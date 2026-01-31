import ExamplesOverviewPage from '@/components/examples/ExamplesOverviewPage'
import type { Language } from '@/data/professions'

export default function CroatianLetterExamplesPage() {
  const language: Language = 'hr'
  return <ExamplesOverviewPage type="letter" language={language} />
}
