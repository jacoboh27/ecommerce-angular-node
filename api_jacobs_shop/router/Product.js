import routerx from 'express-promise-router'
import productController from '../controllers/ProductController'
import auth from '../middlewares/auth'
import multiparty from 'connect-multiparty'

var path = multiparty({uploadDir: './uploads/product'})
const router = routerx();

router.post("/register", [auth.verifyAdmin,path], productController.register);
router.post("/register_imagen", [auth.verifyAdmin,path], productController.register_imagen);
router.post("/remove_imagen", [auth.verifyAdmin,path], productController.remove_imagen);
router.put("/update", [auth.verifyAdmin,path], productController.update);
router.get("/list", auth.verifyAdmin, productController.list);
router.get("/list_active", productController.list_active);
router.delete("/delete", auth.verifyAdmin, productController.remove);
router.get("/uploads/product/:img", productController.obtener_imagen);
router.get("/show/:id", productController.show);

export default router;