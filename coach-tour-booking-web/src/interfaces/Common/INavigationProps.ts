import IViewState from "../AppState/IViewState";

export interface INavigationProps {
	viewState: IViewState;
}

export interface IRoute {
	pathName: string;
	component?: JSX.Element
}