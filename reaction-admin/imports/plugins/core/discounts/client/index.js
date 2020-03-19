import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { registerOperatorRoute } from "/imports/client/ui";
import DiscountsPage from "./DiscountsPage.js";

registerOperatorRoute({
  isNavigationLink: true,
  priority: 60,
  path: "/discounts",
  mainComponent: DiscountsPage,
  // eslint-disable-next-line react/display-name
  SidebarIconComponent: (props) => <FontAwesomeIcon icon={faPercent} {...props} />,
  sidebarI18nLabel: "admin.shortcut.discountsLabel"
});
