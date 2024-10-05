import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import loginUser from "./loginUser";
import isUserLoggedIn from "./isUserLoggedIn";
import retrieveUser from "./retrieveUser";
import createPost from "./createPost";
import retrievePosts from "./retrievePosts";
import removePost from "./removePost";
import modifyPost from "./modifyPost";
import createComment from "./createComment";
import retrieveComments from "./retrieveComments";
import removeComment from "./removeComment";
import modifyComment from "./modifyComment";
import toggleLikePost from "./toggleLikePost";
import getLoggedInUserId from "./getLoggedInUserId";
const logic = {
    registerUser,
    logoutUser,
    loginUser,
    isUserLoggedIn,
    retrieveUser,
    createPost,
    retrievePosts,
    removePost,
    modifyPost,
    createComment,
    retrieveComments,
    removeComment,
    modifyComment,
    toggleLikePost,
    getLoggedInUserId

}

export default logic