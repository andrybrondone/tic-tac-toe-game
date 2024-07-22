import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";

export default function Header() {
  return (
    <>
      <div className="mt-5 mb-10 rounded-[100px] w-[400px] max-sm:w-[300px] shadow-xl  border-gray-800 bg-black">
        <Container className="flex items-center justify-center py-3 max-sm:py-2 gap-7 transition">
          <div className="flex items-center gap-2.5 max-sm:gap-1.5">
            <Logo size="very-small" className="max-md:w-[28px]" />
            <Typography
              weight="bold"
              variant="h4"
              component="h2"
              className="text-white"
            >
              Tic Tac Toe
            </Typography>
          </div>
        </Container>
      </div>
    </>
  );
}
