import HomeScreen from "@/modules/home/screens/HomeScreen/HomeScreen";
import { Category } from "@prisma/client";

export default async function Home() {
  const categories = Object.values(Category);

  return <HomeScreen categories={categories} />;
}
