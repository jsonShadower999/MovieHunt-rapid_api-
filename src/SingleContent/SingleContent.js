import { Badge } from "@material-ui/core";
import { img_300,unavailable } from "../config/config";
import "./SingleContent.css";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <></>
    //  <ContentModal media_type={media_type} id={id}>
    //   <Badge
    //     badgeContent={vote_average}
    //     color={vote_average > 5 ? "primary" : "secondary"}
    //   />
    //   <img
    //     className="poster"
    //     src={`${poster}`}
    //     // poster={c.node.primaryImage.url}
    //     alt={title}
    //   />
    //   <b className="title">{title}</b>
    //   <span className="subTitle">
    //     {media_type === "tv" ? "TV Series" : "Movie"}
    //     <span className="subTitle">{date}</span>
    //   </span>
    // </ContentModal>
  );
};

export default SingleContent;
{/* <SingleContent
key={c.node.id}
id={c.node.id}
poster={c.node.primaryImage.url}
title={c.node.titleText.text || c.name}
date={c.first_air_date || c.node.releaseDate.year}
media_type={c.node.titleType.id}
vote_average={c.node.ratingsSummary.aggregateRating}
/> */}