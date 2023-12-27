import React from 'react';
import AdminSidebar from "../../components/organisms/admin/AdminSidebar/AdminSidebar";
import AdminProductsPageTemplate from "../../components/templates/admin/AdminProductsPageTemplate";
import ImageUploadButton from "../../components/molecules/admin/Upload/Upload";
import ProductPanel from "../../components/organisms/admin/Products/ProductPanel";

const ProductsPage = () => {
    return (
        <AdminProductsPageTemplate
            sidebar={<AdminSidebar/>}
            mainContent={<ProductPanel />}
        />
    );
};

export default ProductsPage;
