// import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";

const Card = ({ item }: any) => {
  //   const { theme } = useTheme();

  return (
    <MagicCard
      className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
      gradientColor={"#262626"}
    >
      <p>{item?.name}</p>
      <p>{item?.tags}</p>
      <p>{item?.customDate1?.toLocaleDateString()}</p>
    </MagicCard>
  );
};

export default Card;
