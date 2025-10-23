import { Button, Menu, Portal } from "@chakra-ui/react";

function Options({ icon, options, setModel }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {icon}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {
                options.map((option, i) => (
                    <Menu.Item key={i} value={option} onClick={()=>setModel(option)}>{option}</Menu.Item>
                ))
            }
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default Options;
