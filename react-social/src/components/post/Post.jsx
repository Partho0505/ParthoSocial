import "./post.css"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useState, useEffect } from "react";
import axios from 'axios';
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function Post({post}) {
    const [like, setlike] = useState(post.likes.length);
    const [isLiked, setisLiked] = useState(false);
    const [user, setUser] = useState({});
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    const {user : currentUser} = useContext(AuthContext);

    useEffect(() => {
      setisLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes]);
    
    useEffect(() => {
        const fetchUser = async() => {
          try{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
          }catch(err){
            console.log("Problem");
          }
        }
        fetchUser();
      },[post.userId])

    const likeHandler = () => {
      try{
        axios.put("/posts/"+post._id + "/like", {userId : currentUser._id})
      }catch(err){

      }
        setlike(isLiked ? like-1 : like+1);
        setisLiked(!isLiked);
    }



  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/1.jpeg"} alt="" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertRoundedIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF + post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler}/>
                    <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>

    </div>
  )
}
