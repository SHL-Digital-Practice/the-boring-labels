import CategoriesSelect from "./components/categories-select";
import DictionariesSelect from "./components/dicitionaries-select";
import ParameterSelect from "./components/parameter-select";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-5xl w-full items-center justify-center space-y-6">
        <CategoriesSelect />
        <ParameterSelect />
        <DictionariesSelect />
      </div>
    </main>
  );
}
