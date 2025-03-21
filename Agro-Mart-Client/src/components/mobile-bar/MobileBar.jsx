import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  HomeMaxRounded,
  Shop,
  Shop2,
  Shop2Outlined,
} from "@mui/icons-material";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "Home") {
      navigate("/");
    } else if (newValue === "shop") {
      console.log(newValue);
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
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" value="Home" icon={<Home />} />

        <BottomNavigationAction
          label="shop"
          value="shop"
          icon={<Shop2Outlined />}
        />
      </BottomNavigation>
    </div>
  );
}
