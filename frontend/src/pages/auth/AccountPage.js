import React from "react";
import AccountPageTemplate from "../../components/templates/app/auth/AccountPageTemplate";
import MainHeader from "../../components/organisms/MainHeader/MainHeader";
import Account from "../../components/organisms/Account/Account";
import Footer from "../../components/molecules/Footer/Footer";

const AccountPage = () => {
    return (
        <AccountPageTemplate
            header={<MainHeader />}
            mainContent={<Account />}
            footer={<Footer />}
        />
    );
};

export default AccountPage;