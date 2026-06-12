import { createClient } from "@/lib/supabase/server";
import AdminCategoriesClient from "@/components/admin/categories/AdminCategoriesClient";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("activity_categories")
    .select(
      `
    id,
    name,
    description,
    icon,
    point_reward,
    carbon_factor,
    daily_limit,
    created_at
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  const formattedCategories =
    categories?.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      point_reward: Number(category.point_reward ?? 0),
      carbon_factor: Number(category.carbon_factor ?? 0),
      daily_limit: Number(category.daily_limit ?? 3),
    })) ?? [];

  return <AdminCategoriesClient categories={formattedCategories} />;
}
