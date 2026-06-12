"use client";

import { useState } from "react";
import { Leaf, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";
import EmptyState from "@/components/ui/EmptyState";

import AdminCategoryCard from "./AdminCategoryCard";
import CategoryFormModal from "./CategoryFormModal";

const supabase = createClient();

type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  point_reward: number;
  carbon_factor: number;
  daily_limit: number;
};

type CategoryFormValues = {
  name: string;
  description: string;
  icon: string;
  point_reward: number;
  carbon_factor: number;
  daily_limit: number;
};

type AdminCategoriesClientProps = {
  categories: Category[];
};

export default function AdminCategoriesClient({
  categories,
}: AdminCategoriesClientProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    if (selectedCategory) {
      const { error } = await supabase
        .from("activity_categories")
        .update({
          name: values.name,
          description: values.description,
          icon: values.icon,
          point_reward: values.point_reward,
          carbon_factor: values.carbon_factor,
          daily_limit: values.daily_limit,
        })
        .eq("id", selectedCategory.id);

      if (error) {
        throw error;
      }

      toast.success("Category updated");
    } else {
      const { error } = await supabase.from("activity_categories").insert({
        name: values.name,
        description: values.description,
        icon: values.icon,
        point_reward: values.point_reward,
        carbon_factor: values.carbon_factor,
        daily_limit: values.daily_limit,
      });

      if (error) {
        throw error;
      }

      toast.success("Category created");
    }

    router.refresh();
  };

  const handleDelete = async (categoryId: string) => {
    const confirmed = window.confirm(
      "Yakin mau hapus kategori ini? Activity lama yang memakai kategori ini bisa kehilangan referensi kategori.",
    );

    if (!confirmed) return;

    try {
      setDeletingId(categoryId);

      const { error } = await supabase
        .from("activity_categories")
        .delete()
        .eq("id", categoryId);

      if (error) {
        throw error;
      }

      toast.success("Category deleted");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Gagal menghapus kategori");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-white">Manage Categories</h1>

          <p className="mt-2 text-gray-400">
            Create and manage eco activity categories, points, and carbon
            factor.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon={Leaf}
          title="No categories yet"
          description="Create the first eco activity category for users."
          action={
            <button
              onClick={handleAdd}
              className="rounded-xl bg-green-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Add Category
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {categories.map((category) => (
            <AdminCategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          ))}
        </div>
      )}

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCategory={selectedCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
