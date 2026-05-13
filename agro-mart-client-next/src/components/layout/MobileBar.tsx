"use client";
import React, { useContext, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter, usePathname } from "next/navigation";
import { Home, Shop2Outlined } from "@mui/icons-material";
import { ThemeContext } from "@/providers/ThemeProvider";

export default function MobileBar() {
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState(pathname === "/shop" ? "shop" : "Home");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === "Home") router.push("/");
    else if (newValue === "shop") router.push("/shop");
  };

  return (
    <div className="block md:hidden">
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
          "& .MuiBottomNavigationAction-root": {
            color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
          },
          "& .Mui-selected": {
            color: "#4CAF50",
            "& .MuiBottomNavigationAction-label": { color: "#4CAF50" },
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value="Home"
          icon={<Home />}
          sx={{
            "& .MuiSvgIcon-root": { color: theme === "dark" ? "white" : "inherit" },
            "&.Mui-selected .MuiSvgIcon-root": { color: "#4CAF50" },
          }}
        />
        <BottomNavigationAction
          label="shop"
          value="shop"
          icon={<Shop2Outlined />}
          sx={{
            "& .MuiSvgIcon-root": { color: theme === "dark" ? "white" : "inherit" },
            "&.Mui-selected .MuiSvgIcon-root": { color: "#4CAF50" },
          }}
        />
      </BottomNavigation>
    </div>
  );
}
