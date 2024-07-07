import { createComponent2 } from "../signal2";

export const HaSwitch = createComponent2<{
  onChecked: (checked: boolean) => void;
}>((props) => {
  return (
    <ha-switch
      //   ref={(x) => {
      //     console.log(x);
      //     (x as any).selected = true;
      //     (x as any).icons = true;
      //   }}
      onChange={(e) => {
        props.onChecked()(e.currentTarget.checked ?? false);
      }}
      checked={true}
      disabled={true}
      ariaLabel={""}
      ariaLabelledBy={""}
      // icons={true}
    />
  );
});
