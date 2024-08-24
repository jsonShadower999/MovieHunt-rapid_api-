import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MovieIcon from '@mui/icons-material/Movie';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from '@mui/icons-material/Tv';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import StarsIcon from '@mui/icons-material/Stars';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/yearsort_series");
    } else if (value === 3) {
      navigate("/ratesort");
    }
    else if (value===4){
      navigate("/searchmov")
    }
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies by Genres"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies by YearSort"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies by Rate/STAR Rating"
        icon={<StarsIcon  />}
      />
       <BottomNavigationAction
        style={{ color: "white" }}
        label="Search Movie"
        icon=  {<TravelExploreIcon/>}
      />
    </BottomNavigation>
  );
}
