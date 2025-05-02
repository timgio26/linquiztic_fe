import { useState } from "react";

export function Homepage() {
  const [language, setlanguage] = useState<string>();
  const [isPlacement,setIsPlacement] = useState<boolean>(false);
  const languages = ["Norwegian", "Dutch", "Spanish"];

  return (
    <>
      <div className={`${language ? "hidden" : ""}`}>
        <h1 className="text-3xl py-5">what do you want to learn today</h1>
        {languages.map((each) => (
          <div
            className={`border px-5 py-2 my-1 ${
              language == each ? "border-amber-500" : ""
            }`}
            onClick={() => setlanguage(each)}
          >
            {each}
          </div>
        ))}
      </div>

      <div className={`${language && !isPlacement ? "" : "hidden"}`}>
      <h1 className="text-3xl py-5">How you want to start</h1>
      <div>
        <div className="border px-5 py-2 my-1" onClick={()=>setIsPlacement(true)}>Placement Test</div>
        <div className="border px-5 py-2 my-1">Flash Card</div>
        <div className="border px-5 py-2 my-1">Sentence Training</div>
        <button className="w-full py-1.5 border" onClick={()=>setlanguage("")}>Back</button>
      </div>
      </div>

      <div className={`${isPlacement ? "" : "hidden"}`}>
      <h1 className="text-3xl py-5">Type anything in xxx</h1>
      <textarea name="" id="" rows={4} className="w-full border p-1" placeholder="its ok if you dont know anything. just hit submit button"/>
      <div className="flex gap-4">
      <button className="w-full py-1.5 border" onClick={()=>setIsPlacement(false)}>Back</button>
      <button className="w-full py-1.5 border">Submit</button>
      </div>
      </div>
    </>
  );
}
