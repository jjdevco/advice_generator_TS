import { useState, useEffect } from "react";
import { AdviceCard } from "./components/AdvideCard";
import { DividerMobile } from "./icons/DividerMobile";
import { DividerDesktop } from "./icons/DividerDesktop";
import { Dice } from "./icons/Dice";
import { useWindowDimensions } from "./hooks/UseWindowDimensions";

interface Advice {
  id: string | number;
  advice: string;
}

function App() {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [adviceError, setAdviceError] = useState(false);
  const isLoading = advice === null;
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchAdvice = async () => {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        setAdviceError(true);
      }

      const data = await res.json();
      setAdvice(data.slip);
    };

    if (isLoading) fetchAdvice();
  }, [isLoading]);

  const handleClick = () => {
    setAdvice(null);
  };

  return (
    <main className="min-w-[330px] flex bg-dark-blue w-screen h-screen justify-center place-items-center">
      <div className="flex flex-col max-w-full sm:max-w-[500px] h-max rounded-xl transition ease-in-out bg-dark-grayish-blue shadow-xl text-light-cyan relative justify-between">
        <div className="flex flex-col justify-center items-center min-h-[200px]">
          {adviceError && "Something went wrong. Please try again."}
          {!adviceError && <AdviceCard isLoading={isLoading} data={advice} />}
        </div>
        <div className="mb-12 px-4 mx-auto self-end">
          {width > 600 ? <DividerDesktop /> : <DividerMobile />}
        </div>
        <div className="absolute mx-auto bottom-[-1.4rem] w-full flex justify-center">
          <button
            className="transition ease-in-out hover:shadow-neon-green shadow-neon-green bg-neon-green  disabled:hover:shadow-grayish-blue disabled:shadow-grayish-blue disabled:bg-dark-blue rounded-full w-[3rem] h-[3rem] justify-center place-items-center flex shadow-md hover:shadow-lg"
            onClick={handleClick}
            disabled={isLoading}
            aria-label="new advice"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Dice />
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
