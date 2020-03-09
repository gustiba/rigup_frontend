import { combineReducers } from 'redux';
import ChangeStyleReducer from './ChangeStyleReducer';
import UserReducer from './UserReducer';
import BrandReducer from './BrandReducer';
import BrandCatReducer from './BrandCatReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import ProductCatReducer from './ProductCatReducer';
import ProductDetailReducer from './ProductDetailReducer';
import ManageUserReducer from './ManageUserReducer';
import FormProductReducer from './FormProductReducer';
import FormRegisterReducer from './FormRegisterReducer';
import CarouselReducer from './CarouselReducer';

export default combineReducers({
	changeStyle: ChangeStyleReducer,
	user: UserReducer,
	brands: BrandReducer,
	brandCats: BrandCatReducer,
	categories: CategoryReducer,
	products: ProductReducer,
	productCats: ProductCatReducer,
	productDetail: ProductDetailReducer,
	manageUser: ManageUserReducer,
	formProduct: FormProductReducer,
	formRegister: FormRegisterReducer,
	carousel: CarouselReducer
});
