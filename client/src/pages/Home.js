import React from "react";
import { connect } from "react-redux";

const Home = () => {
  return <div></div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
