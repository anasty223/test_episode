"use client";

import store, { persistor } from "@/store";

import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const DefaultProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default DefaultProvider;

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
