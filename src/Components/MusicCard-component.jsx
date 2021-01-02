import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

function MusicCard(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card} >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          
          <iframe  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
            id="video"
            width="800px"
            height="400px"
            margin-left="230px"
            src={"https://www.youtube.com/embed/" + props.data.videoId}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="Previous" onClick={() => props.next("prev")}>
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon
              className={classes.playIcon}
              onClick={() => props.play()}
            />
          </IconButton>
          <IconButton aria-label="Next" onClick={() => props.next("next")}>
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
}

MusicCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MusicCard);
