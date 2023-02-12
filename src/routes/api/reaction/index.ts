import express from "express";
import { Request } from "../../../interfaces/http.interface";
import middlewares from "../../../middlewares";
import service from "../../../services";
import utils from "../../../utils";

const router = express.Router();

router.post(
	"/post/:id",
	middlewares.http.numericParamsValidator,
	(req: Request, res: Response, next) =>
		utils.error.handleHttpError(req, next, async () => {
			const { id } = req.params;
			const isPostLiked = req.session?.user?.likedPosts?.includes(Number(id));
			const reactions = isPostLiked
				? Number(req.body.reaction) - 1
				: Number(req.body.reaction) + 1;
			const post = await service.user.me.reactToPost(req.params.id, {
				reactions,
			});
			if (req.session?.user) {
				req.session.user.likedPosts = req.session.user.likedPosts?.length
        ? isPostLiked
					? req.session.user.likedPosts?.filter((l) => l !== Number(id))
					: [Number(id), ...req.session.user.likedPosts]
          : [];
        if (req.cookies.session_remember) {
          res.cookie("session_user", req.session.user);
        }
			}
			return res.redirect(new URL(req.headers["hx-current-url"]).pathname);
		})
);

export default router;
