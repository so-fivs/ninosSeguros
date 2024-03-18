import {Link} from "react-router-dom";

interface Defaultchild{
    children: React.ReactNode;
}
export default function Default({children}:Defaultchild) {
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home </Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup </Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
        </>
    );
}