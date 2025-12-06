import CamperDetails from "@/components/CamperDetails/CamperDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CamperPage({ params }: Props) {
  const { id } = await params;          // ⬅️ чекаємо Promise
  return <CamperDetails id={id} />;
}