import { CATEGORIES } from "@/constants";
import CategoryCard from "../CategoryCard";


export default function CategorySection() {
    return (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Explore by Category</h2>
        <p className="text-gray-500 max-w-2xl">
          Find jobs that perfectly match your skills and career goals from our diverse range of categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  </section>
);
}