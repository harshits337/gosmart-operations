import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { categoryStateActions, productStateActions } from "../../store";
import { getAllCategories } from "../category/category.http";
import { Dropdown } from "primereact/dropdown";
import { getProductsForCategories } from "./products.http";
import { ProductForm } from "./ProductForm";

export const Products = () => {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productState.products);
    let categories = useSelector((state) => state.productState.categories);
	let showProductform = useSelector(state=>state.productState.showProductform);

    useEffect(() => {
        (async () => {
            let response = await getAllCategories();
            if (response.status === 200) {
                dispatch(productStateActions.setCategories(response.data));
            }
        })();
    }, []);

	const fetchProducts = async(id)=>{
		let response = await getProductsForCategories(id);
		if(response.status === 200){
			dispatch(productStateActions.setProducts(response.data));
		}


	}
    return (
        <Fragment>
		<h2>Products</h2>
            <div className="flex">
                <Dropdown
                    optionLabel="name"
                    optionValue="id"
                    value={useSelector(
                        (state) => state.productState.selectedCategory
                    )}
                    options={categories}
                    onChange={ async (e) =>{
						dispatch(
                            productStateActions.setSelectedCategory(e.value)
                        )
						await fetchProducts(e.value)
					}
                        
                    }
                    placeholder="Select a Category"
					style={{width : "30%",height:"10%",margin:"1rem"}}
                />
				<p className="" style={{marginLeft : "35rem"}}>
                    <Button
                        className="p-button-primary"
                        label="Add Product"
                        onClick={() => {
                            dispatch(
                                productStateActions.setShowProductForm(true)
                            );
                        }}
                    ></Button>
                </p>
				
            </div>
			<Dialog
                header="Add Product"
                visible={showProductform}
                style={{ width: "20%" }}
                modal
                onHide={() => {
                    dispatch(productStateActions.setShowProductForm(false));
                }}
            >
                <ProductForm></ProductForm>
            </Dialog>

        </Fragment>
    );
};
