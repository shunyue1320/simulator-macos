import React, { useRef, useEffect } from "react";
import { MenuItem, MenuItemGroup } from "./base";

export default function AppleMenu({ setStateMac, toggleMenu }) {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current.contains(e.target)) return;
      toggleMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, toggleMenu]);

  return (
    <div
      className="fixed top-6 left-4 w-56 bg-gray-200 bg-opacity-90 blur rounded-b-lg shadow-2xl"
      ref={ref}
      style={{ zIndex: 100000 }}
    >
      <MenuItemGroup>
        <MenuItem>About This Mac</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>System Preferences...</MenuItem>
        <MenuItem>App Store...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Recent Items</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Force Quit...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem onClick={() => setStateMac("sleep")}>Sleep</MenuItem>
        <MenuItem onClick={() => setStateMac("restart")}>Restart...</MenuItem>
        <MenuItem onClick={() => setStateMac("shutDown")}>
          Shut Down...
        </MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={() => setStateMac("login")}>Lock Screen</MenuItem>
        <MenuItem onClick={() => setStateMac("login")}>
          Log Out Shun Yue
        </MenuItem>
      </MenuItemGroup>
    </div>
  );
}
