import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { RouteParam } from "./App";
import { AppState, selectCurrentImage, Image, ImageSize, LoadImagesAction } from "./store";

type FrameProps = { 
  image: Image
};

const Frame = (props: FrameProps) => {

  return (
    <img src={ props.image.url } 
    style={ { 
      transform: `rotate(${props.image.rotation}deg)`, 
      borderWidth: '2px', 
      borderStyle: "solid"
    } } 
    alt="logo" />
  );
}

function mapStateToProps(state: AppState): FrameProps {
  return {
    'image': selectCurrentImage(state)
  };
}

export default connect(mapStateToProps)(Frame);

