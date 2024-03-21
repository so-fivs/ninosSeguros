import {Link} from "react-router-dom";
import React from "react";

interface DefaultTemplate{
    children?: React.ReactNode;
}
export default function Default({children}:DefaultTemplate) {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Registro</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>{children}</main>
        </>
    );
}