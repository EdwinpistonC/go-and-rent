import {mount, shallow} from "enzyme";
import HeaderMenu from "./index";
import {Item, MenuContainer} from "./StyledComponents";

const ROLES = {
    guest: 'ROLE_GUEST',
    admin: 'admin',
    empty: ''
}

const mockOnCrear = jest.fn();
const mockOnIniciar = jest.fn();
const mockOnPerfil = jest.fn();

let wrapperShallow;

const getMenuWrapper = (rol) => {
    return mount(
        <HeaderMenu
            rol={rol}
            onIniciar={mockOnIniciar}
            onPerfil={mockOnPerfil}/>
    );
}

//https://javascript.plainenglish.io/test-styled-components-in-react-efficiently-using-displayname-53281a0c1f2d
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
        // eslint-disable-next-line testing-library/no-debugging-utils
        console.log(wrapperShallow.debug());
    });
    it("Renderiza header menu item Cerrar Sesión", () => {
        wrapperShallow = mount(
            <HeaderMenu
                rol={ROLES.guest}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
        let item = wrapperShallow.find(Item).at(1);
        let text = item.text();
        expect(text).toEqual('Cerrar Sesión');
    });
    it("Renderiza header menu item Perfil", () => {
        wrapperShallow = mount(
            <HeaderMenu
                rol={ROLES.admin}
                onIniciar={mockOnIniciar}
                onPerfil={mockOnPerfil}/>
        );
        let item = wrapperShallow.find(Item).at(0);
        let text = item.text();
        expect(text).toEqual('Perfil');
    });
    it("Items solamente de guest", () => {
        wrapperShallow = getMenuWrapper(ROLES.empty);
        let itemIniciarSesion = wrapperShallow.find(Item).at(0);
        let textIniciarSesion = itemIniciarSesion.text();
        let itemHazteUnaCuenta = wrapperShallow.find(Item).at(1);
        let textHazteUnaCuenta = itemHazteUnaCuenta.text();
        expect(textIniciarSesion).toEqual('Iniciar Sesión ')
        expect(textIniciarSesion).not.toEqual('Perfil')
        expect(textHazteUnaCuenta).toEqual('Hazte una cuenta');
        expect(textHazteUnaCuenta).not.toEqual('Cerrar Sesión');
    });
    it("Items de Huesped o Anfitrion", () => {
        wrapperShallow = getMenuWrapper(ROLES.guest);
        let itemIniciarSesion = wrapperShallow.find(Item).at(0);
        let textIniciarSesion = itemIniciarSesion.text();
        let itemHazteUnaCuenta = wrapperShallow.find(Item).at(1);
        let textHazteUnaCuenta = itemHazteUnaCuenta.text();
        expect(textIniciarSesion).not.toEqual('Iniciar Sesión ')
        expect(textIniciarSesion).toEqual('Perfil')
        expect(textHazteUnaCuenta).not.toEqual('Hazte una cuenta');
        expect(textHazteUnaCuenta).toEqual('Cerrar Sesión');
    });

});