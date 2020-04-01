import React from "react";
import i18next from "i18next";
import { Blocks } from "@reactioncommerce/reaction-components";
import { Box, makeStyles, Typography } from "@material-ui/core";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(4)
  }
}));

/**
 * @summary Renders payment settings page
 * @param {Object} props Component props
 * @return {React.Node} React node
 */
export default function PaymentSettingsRegion(props) {
  const [shopId] = useCurrentShopId();
  const classes = useStyles();
  const blockProps = { ...props, shopId };
  return (
    <>
      <Typography variant="h2" className={classes.header}>
        {i18next.t("admin.settings.payment.header")}
      </Typography>
      <Blocks region="PaymentSettings" blockProps={blockProps}>
        {(blocks) =>
          blocks.map((block, index) => (
            <Box paddingBottom={2} key={index}>
              {block}
            </Box>
          ))
        }
      </Blocks>
    </>
  );
}
