import { connect } from "react-redux";
import { AppState, selectCurrentImage, Image } from "./store";

type FrameProps = { image: Image };
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
