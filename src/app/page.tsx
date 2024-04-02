import { descriptor } from "@/data/clocks/jocker/descriptor";
import { TestComponent, TestImage } from "./_components/test";
import Link from "next/link";
import Sidebar from "./_components/sidebar";

const sampleExample = {
  angle: 0,
  case: 1,
};

const fetchImages = (): Promise<TestImage[]> =>
  Promise.all([
    import(`@/data/clocks/jocker/case/2.png`).then((image) => {
      return { url: image.default.src, id: "case" };
    }),
    ...descriptor.parts.map(async (value) => {
      const image = await import(
        `@/data/clocks/jocker/angles/${sampleExample.angle}/${value}.png`
      );

      return { url: image.default.src, id: value };
    }),
  ]);

export default async function Home() {
  const colors = await fetchImages();

  return (
    <div className="w-full flex flex-col overflow-hidden h-full relative">
      <div className="left-0 ml-[90px] z-50 flex-1 h-full flex gap-5 mt-[30px] overflow-auto max-w-[120px] w-auto flex-col justify-center items-center">
        <div className="h-full flex flex-col w-full items-center overflow-hidden justify-center">
          {Array.from(Array(descriptor.case).keys()).map((value, index) => {
            return (
              <div
                key={index}
                className={`max-w-[120px] mr-auto max-h-[120px] w-auto relative h-full shrink aspect-square border ${
                  index === sampleExample.angle
                    ? "border-white"
                    : "border-white/65"
                } my-2`}
              >
                {index === sampleExample.angle ? (
                  <TestComponent images={colors} />
                ) : null}
              </div>
            );
          })}
        </div>
        <Link
          href="#"
          className="bottom-0 pb-[40px] flex flex-col gap-[18px] mt-auto left-0"
        >
          <span className="flex gap-2">Choose model</span>

          <p>JOKER</p>
        </Link>
      </div>
      <div className="w-full  h-fit flex">
        <div className="fixed overflow-auto w-full h-full left-0 top-0">
          <div className=" w-4/5 h-full  relative circle -z-10">
            <TestComponent images={colors} />
          </div>

          <div className=" w-4/5 h-full circle relative -z-10">
            <TestComponent images={colors} />
          </div>
        </div>
      </div>

      <div className="bg-[#2A2B2D] fixed z-50 top-0 right-0 h-full max-w-[400px] w-full shrink-0">
        <Sidebar />
      </div>
    </div>
  );
}
