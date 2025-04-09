import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Shop2Outlined } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

export default function LabelBottomNavigation() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = React.useState(
    location.pathname === "/shop" ? "shop" : "Home"
  );
  const navigate = useNavigate();
  const isShopPage = location.pathname === "/shop";

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "Home") {
      navigate("/");
    } else if (newValue === "shop") {
      navigate("/shop");
    }
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
            color:
              theme === "dark"
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.6)",
          },
          "& .Mui-selected": {
            color: "#4CAF50",
            "& .MuiBottomNavigationAction-label": {
              color: "#4CAF50",
            },
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
            "& .MuiSvgIcon-root": {
              color: theme === "dark" ? "white" : "inherit",
            },
            "&.Mui-selected .MuiSvgIcon-root": {
              color: "#4CAF50",
            },
          }}
        />
        <BottomNavigationAction
          label="shop"
          value="shop"
          icon={<Shop2Outlined />}
          sx={{
            "& .MuiSvgIcon-root": {
              color: theme === "dark" ? "white" : "inherit",
            },
            "&.Mui-selected .MuiSvgIcon-root": {
              color: "#4CAF50",
            },
          }}
        />
      </BottomNavigation>
    </div>
  );
}
