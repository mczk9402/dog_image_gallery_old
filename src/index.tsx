import { render } from "react-dom";
import { Hoge } from "./app";
import "./styles/style.scss";

render(<Hoge foo={"asd"} />, document.querySelector("#root"));
