import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import ServicesPage from "../pages/services/services-page";
import PuskePage from "../pages/services/puskesmas/puske-page";
import siklusPage from "../pages/services/siklus/siklus-page";
import DewasaPage from "../pages/services/dewasa/dewasa-page";
import BalitaPage from "../pages/services/balita/balita-page";
import ChatbotPage from "../pages/chatbot/chatbot-page"; // tambahkan import

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/services": new ServicesPage(),
  "/puskesmas": new PuskePage(),
  "/siklus": new siklusPage(),
  "/dewasa": new DewasaPage(),
  "/balita": new BalitaPage(),
  //"/chatbot": new ChatbotPage(), // tambahkan route chatbot
};

export default routes;
