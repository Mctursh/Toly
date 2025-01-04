import dynamic from 'next/dynamic'

const DynamicContactPage = dynamic(
  () => import('@/components/Contact/Form'),
  { ssr: false }
)

export default function Contact() {
  return <DynamicContactPage />;
}