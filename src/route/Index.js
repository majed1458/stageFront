import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
// import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";

import Sales from "../pages/Sales";
import Crypto from "../pages/Crypto";
import Analytics from "../pages/Analytics";
import Invest from "../pages/Invest";
import UserListRegularPage from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCardPage from "../pages/pre-built/user-manage/UserContactCard";
import UserDetailsPage from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";
import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";

import FileManager from "../pages/app/file-manager/FileManager";

import { FileManagerContextProvider } from "../pages/app/file-manager/FileManagerContext";
import Index from "../pages/landing/LandingPage";



const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      
      <Switch>
          {/* Dashboards */}
          <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
           <Route
          exact
          path={`${process.env.PUBLIC_URL}/files`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shared`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/starred`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/recovery`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/settings`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-details-regular/:id`}
          render={(props) => (
            <UserContextProvider>
              <UserDetailsPage {...props} />
            </UserContextProvider>
          )}
        ></Route>
        
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-regular/`} component={UserProfileLayout}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/user-profile-notification/`}
          component={UserProfileLayout}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-activity/`} component={UserProfileLayout}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-setting/`} component={UserProfileLayout}></Route>
        <Route //Context api added
          exact
          path={`${process.env.PUBLIC_URL}/user-contact-card`}
          render={() => (
            <UserContextProvider>
              <UserContactCardPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`/`} component={Index}></Route>

          {/* <Route path={`${process.env.PUBLIC_URL}/`} element={<Invest />} /> */}
          <Route component={RedirectAs404}></Route>
        </Switch>
      
    </Suspense>
  );
};

export default Pages;
