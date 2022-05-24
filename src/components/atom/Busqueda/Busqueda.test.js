import {shallow} from "enzyme";
import Busqueda from "./index";
import {BusquedaContainer, Input} from "./StyledComponents";

let wrapperShallow;
describe("Testing Atom Busqueda", () => {
   it("Renders the component", () => {
       wrapperShallow = shallow(<BusquedaContainer />);
   });
    it("Renders input children", () => {
        wrapperShallow = shallow(<Busqueda />);
        expect(wrapperShallow.containsMatchingElement(<Input />)).toBe(true);
    });
});