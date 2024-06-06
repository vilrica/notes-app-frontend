
import { Theme, Button } from '@radix-ui/themes';

const Layout = ({ children }) => {
    return (
        <Theme accentColor="indigo">
            <main className='m-10'>
                
                {children}
            </main>
        </Theme>
    );
};

export default Layout;
