import React from 'react';
import AdminOrdersPageTemplate from "../../components/templates/admin/AdminOrdersPageTemplate";
import AdminSidebar from "../../components/organisms/admin/AdminSidebar/AdminSidebar";
import OrderPanel from "../../components/organisms/admin/Orders/OrderPanel";
const OrdersPage = () => {
    return (
        <AdminOrdersPageTemplate
            sidebar={<AdminSidebar/>}
            mainContent={<OrderPanel />}
        />
    );
};

export default OrdersPage;
