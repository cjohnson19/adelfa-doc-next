import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

const GoTop = (props: {
  showGoTop: string | undefined;
  scrollUp: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <>
      <div className={props.showGoTop} onClick={props.scrollUp}>
        <Button size="icon" variant='outline'>
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
export default GoTop;
