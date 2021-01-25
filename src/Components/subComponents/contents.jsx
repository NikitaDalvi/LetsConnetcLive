import React from "react";

function ContentList(props){
  return(
    <div className="col-lg-4">
        <p className="content-paragraph">{props.para}</p>
    </div>
  );
}

export default ContentList;
