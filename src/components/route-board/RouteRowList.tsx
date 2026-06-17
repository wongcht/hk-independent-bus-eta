import { MouseEvent, useCallback, useContext } from "react";
import { RowComponentProps } from "react-window";
import { vibrate } from "../../utils";
import RouteRow from "./RouteRow";
import { RouteListEntry } from "hk-bus-eta";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useTranslation";

export interface RouteRowListRowProps {
  routeList: [string, RouteListEntry][];
  vibrateDuration: number;
  tab: "recent" | "all" | "bus" | "minibus" | "lightRail" | "mtr";
}

const RouteRowList = ({
  routeList,
  vibrateDuration,
  tab,
  index,
  style,
}: RowComponentProps<RouteRowListRowProps>) => {
  const route = routeList[index];
  const { addSearchHistory, removeSearchHistoryByRouteId } =
    useContext(AppContext);
  const language = useLanguage();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      vibrate(vibrateDuration);
      addSearchHistory(route[0]);
      setTimeout(() => {
        navigate(`/${language}/route/${route[0].toLowerCase()}`);
      }, 0);
    },
    [vibrateDuration, addSearchHistory, route, navigate, language]
  );

  const handleRemove = (e: MouseEvent) => {
    e.preventDefault();
    vibrate(vibrateDuration);
    removeSearchHistoryByRouteId(route[0]);
  };

  return (
    <RouteRow
      onClick={handleClick}
      route={route}
      style={style ?? {}}
      onRemove={tab === "recent" ? handleRemove : undefined}
    />
  );
};

export default RouteRowList;
