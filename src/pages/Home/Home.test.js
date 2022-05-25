import {shallow} from "enzyme";
import {Home} from "@mui/icons-material";
let wrapperShallow;

describe("Header Test", () => {
    it("Renderiza Home", () => {
        wrapperShallow = shallow(
            <Home/>
        );
    });
    // it("Renderiza Logo", () => {
    //     wrapperShallow.containsMatchingElement(<Logo />);
    // });
    // it("Renderiza Busqueda", () => {
    //     wrapperShallow.containsMatchingElement(<Busqueda />);
    // })
    // it("Renderiza Header Menu", () => {
    //     wrapperShallow.containsMatchingElement(<HeaderMenu />);
    // })
});