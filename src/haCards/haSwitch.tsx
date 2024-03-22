export function HaSwitch(props: { onChecked: (checked: boolean) => void }) {
  return (
    <ha-switch
      //   ref={(x) => {
      //     console.log(x);
      //     (x as any).selected = true;
      //     (x as any).icons = true;
      //   }}
      onChange={(e) => {
        props.onChecked(e.currentTarget.checked ?? false);
      }}
      checked={true}
      disabled={true}
      ariaLabel={""}
      ariaLabelledBy={""}
      // icons={true}
    />
  );
}
