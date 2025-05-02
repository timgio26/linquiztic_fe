import { Outlet } from "react-router";

export function Layout(){
    return(
        <div className="flex flex-col h-dvh">
            <nav className="bg-gray-300">Linquiztic</nav>
            <main className="flex-1 overflow-y-scroll px-3">
                <Outlet/>
            </main>
            <footer className="bg-gray-300">
                this is nav bot
            </footer>
        </div>
    )
}