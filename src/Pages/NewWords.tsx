import { useAppSelector } from "../app/hook";
export function NewWords() {
  const language = useAppSelector((state) => state.language);

  console.log(language);
  return (
    <div>
      <span>New Words</span>
    </div>
  );
}
