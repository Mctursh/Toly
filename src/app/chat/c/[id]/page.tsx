// "use client"
import ChatPage from '@/components/Chat/Full';

export default async function Home({
  params
}: {
  params: Promise<{ id: string}>
}) {

  const id = (await params).id

  return <ChatPage id={id} />
}