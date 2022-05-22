import {shallow} from "enzyme";
import HeaderMenu from "./index";

const ROLES = {
    guest: 'ROLE_GUEST',
    admin: 'admin',
    empty: ''
}

const mockOnCrear = jest.fn();
const mockOnIniciar = jest.fn();
const mockOnPerfil = jest.fn();

let wrapperShallow;
describe("Header Test", () => {
    it("Renderiza header no user", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.empty}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
    it("Renderiza header admin", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.admin}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
    it("Renderiza header huesped", () => {
        wrapperShallow = shallow(
            <HeaderMenu
                rol={ROLES.guest}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
    });
});