// ProjectItem.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: theme.spacing(2),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
  media: {
    height: 200,
  },
}));

const ProjectItem = ({ title, description, imageUrl }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={imageUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectItem;
