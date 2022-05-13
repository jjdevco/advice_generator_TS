interface AdviceCardProps {
  isLoading: boolean;
  children?: React.ReactNode | Array<React.ReactNode>;
  data: {
    id: string | number;
    advice: string;
  } | null;
}

export function AdviceCard({ isLoading, data, children }: AdviceCardProps) {
  console.log(isLoading, data);
  if (isLoading) return <p className="text-lg">Loading...</p>;

  return (
    <>
      <h1 className="text-center mt-10 text-[0.7rem] tracking-[0.2rem] text-neon-green font-extrabold">
        ADVICE # {data?.id}
      </h1>
      <p className="text-center text-2xl text-light-cyan font-extrabold py-4 px-7">
        "{data?.advice}"
      </p>
    </>
  );
}
