import { Skeleton } from "@chakra-ui/react";

function ColorSkeleton() {
  return (
    <Skeleton
      variant={"shine"}
      width={"full"}
      height={"5"}
      css={{
        "--start-color": "colors.pink.500",
        "--end-color": "colors.orange.500",
      }}
    />
  );
}

export default ColorSkeleton;
