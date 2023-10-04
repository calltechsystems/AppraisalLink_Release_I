import { Provider } from "react-redux";
import { store } from "../app/store";
import {ToastProvider, Toaster} from 'react-hot-toast';
import ScrollToTop from "../components/common/ScrollTop";
import Seo from "../components/common/seo";
import "../index.scss";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Seo
        font={
          "https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        }
      />
      <Provider store={store}>
      <Toaster/>
        <Component {...pageProps} />
       
      </Provider>
      

      <ScrollToTop />
    </>
  );
}

export default MyApp;
