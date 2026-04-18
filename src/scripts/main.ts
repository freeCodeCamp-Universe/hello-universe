import "../styles/base.css";
import { renderPage, type RuntimeFact } from "../components/render";
import { configPage } from "../pages/config";
import { homePage } from "../pages/home";
import { templatePage } from "../pages/template";
import { site } from "../data/site";

const pages = {
  home: homePage,
  config: configPage,
  template: templatePage,
} as const;

const root = document.getElementById("app");
const activePage = document.body.dataset.page as keyof typeof pages | undefined;

if (root && activePage && activePage in pages) {
  const runtimeFacts: RuntimeFact[] = [
    { label: "Route", value: window.location.pathname || "/" },
    { label: "Preview domain", value: site.previewDomain },
    { label: "Viewed at", value: new Date().toISOString() },
    { label: "Language", value: navigator.language },
    { label: "User agent", value: navigator.userAgent },
  ];

  renderPage(root, pages[activePage], activePage, runtimeFacts);
}
